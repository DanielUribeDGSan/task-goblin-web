import type { APIRoute } from 'astro';
import { createClient } from '@supabase/supabase-js';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
    try {
        const rawBody = await request.text();
        const signature = request.headers.get('x-signature');
        const secret = import.meta.env.LEMON_SQUEEZY_WEBHOOK_SECRET;

        console.log("Lemon Squeezy Webhook received.");

        if (!secret) {
            console.error("LEMON_SQUEEZY_WEBHOOK_SECRET is not configured");
            return new Response("Webhook secret not configured", { status: 500 });
        }

        if (!signature) {
            return new Response("Missing signature", { status: 400 });
        }

        // Utilizar Web Crypto API para verificar la firma HMAC SHA256
        const enc = new TextEncoder();
        const key = await crypto.subtle.importKey(
            'raw',
            enc.encode(secret),
            { name: 'HMAC', hash: 'SHA-256' },
            false,
            ['verify']
        );

        const signatureBytes = new Uint8Array(
            signature.match(/.{1,2}/g)?.map(byte => parseInt(byte, 16)) || []
        );

        const isValid = await crypto.subtle.verify('HMAC', key, signatureBytes, enc.encode(rawBody));

        if (!isValid) {
            console.error("Invalid signature from LemonSqueezy");
            return new Response("Invalid signature", { status: 401 });
        }

        let payload;
        try {
            payload = JSON.parse(rawBody);
        } catch (e) {
            return new Response("Invalid JSON payload", { status: 400 });
        }

        const eventName = payload.meta.event_name;
        console.log(`Received LemonSqueezy webhook event: ${eventName}`);

        // Manejar el evento de pago exitoso (order_created)
        if (eventName === 'order_created') {
            const attributes = payload.data.attributes;
            const checkoutData = attributes.first_order_item?.checkout_data;
            let userEmail = payload.data.attributes.user_email || payload.data.attributes.user_name || checkoutData?.custom?.user_email;

            if (!userEmail) userEmail = attributes.user_email;

            // Generate license or retrieve format
            const autoLicenseKey = attributes.license_key || "LS-" + crypto.randomUUID().toUpperCase().split("-")[0] + "-" + Math.random().toString(36).substr(2, 9).toUpperCase();

            const supaUrl = import.meta.env.PUBLIC_SUPABASE_URL || import.meta.env.SUPABASE_URL;
            const supaKey = import.meta.env.SUPABASE_SERVICE_ROLE_KEY || import.meta.env.PUBLIC_SUPABASE_ANON_KEY;

            if (supaUrl && supaKey && userEmail) {
                const supabase = createClient(supaUrl, supaKey);

                const { error: dbError } = await supabase.from('licenses').insert([
                    {
                        email: userEmail,
                        license_key: autoLicenseKey,
                        // puedes agregar más campos si es necesario
                    }
                ]);

                if (dbError) {
                    console.error("Error inserting license directly to Supabase from Webhook:", dbError);
                    // Retornamos 500 para que LemonSqueezy reintente en caso de error de server temporal
                    return new Response("Error inserting into DB", { status: 500 });
                }
                console.log(`Successfully created license for email in Supabase: ${userEmail}`);
            } else {
                console.log(`Order created for ${userEmail || 'unknown'}, but Supabase credentials missing to save license.`);
            }
        }

        return new Response("Webhook processed successfully", { status: 200 });

    } catch (e: any) {
        console.error("Webhook processing error:", e);
        return new Response("Internal Server Error", { status: 500 });
    }
}
