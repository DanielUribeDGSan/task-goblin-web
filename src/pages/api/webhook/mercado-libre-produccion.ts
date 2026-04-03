import type { APIRoute } from 'astro';
import { MercadoPagoConfig, Payment } from 'mercadopago';
import { createClient } from '@supabase/supabase-js';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
    try {
        const body = await request.json();
        console.log("Mercado Pago PRODUCCION Webhook received:", body);

        // Mercado Pago sends different types of notifications.
        const type = body.type || (body.topic === 'payment' ? 'payment' : null);
        const id = body.data?.id || body.id;

        if (type === 'payment' && id) {
            const accessToken = import.meta.env.PUBLIC_ACCESS_TOKEN_PRODUCCION;

            if (!accessToken) {
                console.error("Mercado Pago Access Token missing in PRODUCCION Webhook");
                return new Response("Config Error", { status: 500 });
            }

            const client = new MercadoPagoConfig({ accessToken });
            const payment = new Payment(client);

            try {
                // Fetch the full payment details to verify status and get metadata
                const paymentDetails = await payment.get({ id });

                if (paymentDetails && paymentDetails.status === 'approved') {
                    const userEmail = paymentDetails.metadata?.user_email || paymentDetails.payer?.email;
                    const appName = paymentDetails.metadata?.app_name || paymentDetails.external_reference;

                    if (!userEmail || !appName) {
                        console.warn("Payment approved but metadata/payer email missing:", paymentDetails.metadata, paymentDetails.payer);
                        return new Response("Email or App missing", { status: 200 });
                    }

                    console.log(`Processing approved PRODUCCION payment for ${userEmail} - App: ${appName} - Payment: ${id}`);

                    const autoLicenseKey = "MP-" + crypto.randomUUID().toUpperCase().split("-")[0] + "-" + Math.random().toString(36).substring(2, 11).toUpperCase();

                    const supaUrl = import.meta.env.PUBLIC_SUPABASE_URL || import.meta.env.SUPABASE_URL;
                    const supaKey = import.meta.env.SUPABASE_SERVICE_ROLE_KEY || import.meta.env.PUBLIC_SUPABASE_ANON_KEY;

                    if (supaUrl && supaKey) {
                        const supabase = createClient(supaUrl, supaKey);

                        // Check if license already exists for this payment_id
                        const { data: existingLicense } = await supabase
                            .from('licenses')
                            .select('id')
                            .eq('payment_id', id.toString())
                            .maybeSingle();

                        if (!existingLicense) {
                            const { error: dbError } = await supabase.from('licenses').insert([
                                {
                                    email: userEmail,
                                    license_key: autoLicenseKey,
                                    app: appName,
                                    payment_id: id.toString()
                                }
                            ]);

                            if (dbError) {
                                console.error("Error inserting license to Supabase (check if payment_id column exists):", dbError);
                                return new Response("DB Error", { status: 200 }); // Return 200 to acknowledge MP, but log error
                            }
                            console.log(`Successfully created PRODUCCION license for ${userEmail} in Supabase`);
                        } else {
                            console.log(`License already exists for payment ${id}`);
                        }
                    }
                }
            } catch (getPaymentError: any) {
                console.error("Error fetching payment details (could be a test/dummy ID):", getPaymentError.message || getPaymentError);
                // Return 200 anyway so Mercado Pago doesn't keep retrying if it's just a test probe
                return new Response("Payment not found or Test ID", { status: 200 });
            }
        }

        return new Response("Webhook received", { status: 200 });

    } catch (error: any) {
        console.error("Mercado Pago PRODUCCION Webhook Error:", error);
        return new Response("Internal Server Error", { status: 500 });
    }
}
