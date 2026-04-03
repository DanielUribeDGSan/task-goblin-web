import type { APIRoute } from 'astro';
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

    if (!clientId || !clientSecret) {
        throw new Error("PayPal configuration missing");
    }

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

export const POST: APIRoute = async ({ request }) => {
    try {
        const body = await request.json();
        const { appType, isMexico } = body;

        if (!appType) {
            return new Response(JSON.stringify({ error: "Faltan datos requeridos (appType)" }), { status: 400 });
        }

        const product = APP_CONFIG.PRODUCTS[appType as keyof typeof APP_CONFIG.PRODUCTS];
        if (!product) {
            return new Response(JSON.stringify({ error: "Tipo de aplicación no válido" }), { status: 400 });
        }

        // Determine currency and price based on location
        const currency = isMexico ? 'MXN' : 'USD';
        const price = isMexico ? product.price : product.priceUSD;

        const accessToken = await getPayPalAccessToken();

        const orderResponse = await fetch(`${PAYPAL_API}/v2/checkout/orders`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                intent: 'CAPTURE',
                purchase_units: [
                    {
                        reference_id: appType,
                        amount: {
                            currency_code: currency,
                            value: price.toString(),
                        },
                        description: `Lifetime license for ${product.name}`,
                    },
                ],
                application_context: {
                    brand_name: 'Task Goblin Apps',
                    landing_page: 'BILLING',
                    user_action: 'PAY_NOW',
                    return_url: `${request.url.split('/api')[0]}/api/webhook/paypal?status=success&app=${appType}`,
                    cancel_url: `${request.url.split('/api')[0]}/license?status=cancel`,
                },
            }),
        });

        const order = await orderResponse.json();

        if (!orderResponse.ok) {
            console.error("PayPal API Error:", JSON.stringify(order, null, 2));
            throw new Error(order.message || "PayPal rejected the order creation. Check console logs for details.");
        }

        const approvalUrl = order.links?.find((link: any) => link.rel === 'approve')?.href;

        if (!approvalUrl) {
            console.error("PayPal Response links missing:", JSON.stringify(order.links, null, 2));
            throw new Error("No approval URL received from PayPal. Check order status.");
        }

        return new Response(JSON.stringify({ url: approvalUrl }), {
            status: 200,
            headers: { "Content-Type": "application/json" }
        });

    } catch (error: any) {
        console.error("PayPal Checkout API Error:", error);
        return new Response(JSON.stringify({ 
            error: error.message || "Error al crear la orden de PayPal",
            details: error.stack
        }), { status: 500 });
    }
}
