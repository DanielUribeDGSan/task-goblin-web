import type { APIRoute } from 'astro';
import { MercadoPagoConfig, Payment } from 'mercadopago';
import { createClient } from '@supabase/supabase-js';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
    try {
        const body = await request.json();
        console.log("Mercado Pago PRUEBAS Webhook received:", body);

        // Mercado Pago sends different types of notifications.
        const type = body.type || (body.topic === 'payment' ? 'payment' : null);
        const id = body.data?.id || body.id;

        if (type === 'payment' && id) {
            const accessToken = import.meta.env.PUBLIC_ACCESS_TOKEN_PRUEBAS;

            if (!accessToken) {
                console.error("Mercado Pago Access Token missing in PRUEBAS Webhook");
                return new Response("Config Error", { status: 500 });
            }

            const client = new MercadoPagoConfig({ accessToken });
            const payment = new Payment(client);

            // Fetch the full payment details to verify status and get metadata
            const paymentDetails = await payment.get({ id });

            if (paymentDetails.status === 'approved') {
                const userEmail = paymentDetails.metadata?.user_email;
                const appName = paymentDetails.metadata?.app_name;

                if (!userEmail || !appName) {
                    console.warn("Payment approved but metadata missing:", paymentDetails.metadata);
                    return new Response("Metadata missing", { status: 200 });
                }

                console.log(`Processing approved PRUEBAS payment for ${userEmail} - App: ${appName}`);

                const autoLicenseKey = "MP-TEST-" + crypto.randomUUID().toUpperCase().split("-")[0] + "-" + Math.random().toString(36).substr(2, 9).toUpperCase();

                const supaUrl = import.meta.env.PUBLIC_SUPABASE_URL || import.meta.env.SUPABASE_URL;
                const supaKey = import.meta.env.SUPABASE_SERVICE_ROLE_KEY || import.meta.env.PUBLIC_SUPABASE_ANON_KEY;

                if (supaUrl && supaKey) {
                    const supabase = createClient(supaUrl, supaKey);

                    // Check if license already exists
                    const { data: existingLicense } = await supabase
                        .from('licenses')
                        .select('id')
                        .eq('email', userEmail)
                        .eq('app', appName)
                        .maybeSingle();

                    if (!existingLicense) {
                        const { error: dbError } = await supabase.from('licenses').insert([
                            {
                                email: userEmail,
                                license_key: autoLicenseKey,
                                app: appName
                            }
                        ]);

                        if (dbError) {
                            console.error("Error inserting license to Supabase:", dbError);
                            return new Response("DB Error", { status: 500 });
                        }
                        console.log(`Successfully created PRUEBAS license for ${userEmail} in Supabase`);
                    } else {
                        console.log(`License already exists for ${userEmail} - ${appName}`);
                    }
                } else {
                    console.error("Supabase credentials missing in PRUEBAS Webhook");
                    return new Response("Supabase Config Error", { status: 500 });
                }
            }
        }

        return new Response("Webhook received", { status: 200 });

    } catch (error: any) {
        console.error("Mercado Pago PRUEBAS Webhook Error:", error);
        return new Response("Internal Server Error", { status: 500 });
    }
}
