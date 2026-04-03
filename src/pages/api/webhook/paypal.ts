import type { APIRoute } from 'astro';
import { createClient } from '@supabase/supabase-js';
import { APP_CONFIG } from '../../../constants/config';

export const prerender = false;

const PAYPAL_API = APP_CONFIG.PAYPAL_IS_PROD 
    ? 'https://api-m.paypal.com' 
    : 'https://api-m.sandbox.paypal.com';

async function getPayPalAccessToken() {
    const clientId = APP_CONFIG.PAYPAL_IS_PROD 
        ? import.meta.env.PAYPAL_KEY_API_PRODUCCION 
        : import.meta.env.PAYPAL_KEY_API_PRUEBAS;
    const clientSecret = APP_CONFIG.PAYPAL_IS_PROD 
        ? import.meta.env.PAYPAL_KEY_PRODUCCION 
        : import.meta.env.PAYPAL_KEY_PRUEBAS;

    const auth = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');
    const response = await fetch(`${PAYPAL_API}/v1/oauth2/token`, {
        method: 'POST',
        headers: {
            'Authorization': `Basic ${auth}`,
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: 'grant_type=client_credentials',
    });

    const data = await response.json();
    return data.access_token;
}

async function activateLicense(userEmail: string, appName: string, transactionId: string) {
    const autoLicenseKey = "PY-" + crypto.randomUUID().toUpperCase().split("-")[0] + "-" + Math.random().toString(36).substring(2, 11).toUpperCase();

    const supaUrl = import.meta.env.PUBLIC_SUPABASE_URL || import.meta.env.SUPABASE_URL;
    const supaKey = import.meta.env.SUPABASE_SERVICE_ROLE_KEY || import.meta.env.PUBLIC_SUPABASE_ANON_KEY;

    if (supaUrl && supaKey) {
        const supabase = createClient(supaUrl, supaKey);

        const { data: existingLicense } = await supabase
            .from('licenses')
            .select('id')
            .eq('payment_id', transactionId.toString())
            .maybeSingle();

        if (!existingLicense) {
            const { error: dbError } = await supabase.from('licenses').insert([
                {
                    email: userEmail,
                    license_key: autoLicenseKey,
                    app: appName,
                    payment_id: transactionId.toString()
                }
            ]);

            if (dbError) {
                console.error("Supabase Insertion Error:", dbError);
                return { success: false, error: "DB Error" };
            }
            console.log(`Successfully activated PAYPAL license for ${userEmail}`);
            return { success: true };
        }
        return { success: true, message: "Already exists" };
    }
    return { success: false, error: "Supabase config missing" };
}

export const GET: APIRoute = async ({ request, url, redirect }) => {
    try {
        const token = url.searchParams.get('token');
        const payerId = url.searchParams.get('PayerID');
        const appNameFromQuery = url.searchParams.get('app');

        if (!token || !payerId) {
            return redirect('/license?status=error&message=Missing PayPal data');
        }

        const accessToken = await getPayPalAccessToken();

        const captureResponse = await fetch(`${PAYPAL_API}/v2/checkout/orders/${token}/capture`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
        });

        const captureData = await captureResponse.json();

        // If it's already captured (maybe by a webhook), we still proceed to show the license
        if (captureData.status === 'COMPLETED' || captureData.status === 'APPROVED' || captureData.name === 'UNPROCESSABLE_ENTITY') {
            const orderDetailsResponse = await fetch(`${PAYPAL_API}/v2/checkout/orders/${token}`, {
                headers: { 'Authorization': `Bearer ${accessToken}` }
            });
            const orderDetails = await orderDetailsResponse.json();
            
            const userEmail = orderDetails.payer?.email_address;
            const appName = orderDetails.purchase_units?.[0]?.reference_id || appNameFromQuery;
            const transactionId = orderDetails.id;

            if (userEmail && appName) {
                await activateLicense(userEmail, appName, transactionId);
                return redirect(`/license?status=approved&id=${transactionId}`);
            }
        }

        if (captureData.status !== 'COMPLETED') {
            console.error("PayPal Capture failed or already processed:", captureData);
        }

        return redirect(`/license?status=approved&id=${token}`);

    } catch (error: any) {
        console.error("PayPal Return Error:", error);
        return redirect('/license?status=error');
    }
}

export const POST: APIRoute = async ({ request }) => {
    try {
        const body = await request.json();
        console.log("PayPal Webhook received:", body.event_type, body.resource?.id);

        const eventType = body.event_type;
        const resource = body.resource;

        if (eventType === 'CHECKOUT.ORDER.COMPLETED' || eventType === 'PAYMENT.CAPTURE.COMPLETED') {
            const accessToken = await getPayPalAccessToken();
            
            // For Checkout Order Completed
            const orderId = eventType === 'CHECKOUT.ORDER.COMPLETED' ? resource.id : resource.supplementary_data?.related_ids?.order_id;
            
            if (!orderId) {
                console.warn("No order ID found in webhook resource");
                return new Response("No order ID", { status: 200 });
            }

            const orderResponse = await fetch(`${PAYPAL_API}/v2/checkout/orders/${orderId}`, {
                headers: { 'Authorization': `Bearer ${accessToken}` }
            });
            const orderData = await orderResponse.json();

            const userEmail = orderData.payer?.email_address;
            const appName = orderData.purchase_units?.[0]?.reference_id;
            const transactionId = orderData.id;

            if (userEmail && appName) {
                await activateLicense(userEmail, appName, transactionId);
            }
        }

        return new Response("Webhook Received", { status: 200 });
    } catch (error: any) {
        console.error("PayPal Webhook POST Error:", error);
        return new Response("Internal Error", { status: 500 });
    }
}
