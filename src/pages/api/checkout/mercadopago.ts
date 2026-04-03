import type { APIRoute } from 'astro';
import { MercadoPagoConfig, Preference } from 'mercadopago';
import { APP_CONFIG } from '../../../constants/config';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
    try {
        const body = await request.json();
        const { appType } = body;

        if (!appType) {
            return new Response(JSON.stringify({ error: "Faltan datos requeridos (appType)" }), { status: 400 });
        }

        const product = APP_CONFIG.PRODUCTS[appType as keyof typeof APP_CONFIG.PRODUCTS];
        if (!product) {
            return new Response(JSON.stringify({ error: "Tipo de aplicación no válido" }), { status: 400 });
        }

        const accessToken = APP_CONFIG.MERCADO_PAGO_IS_PROD
            ? import.meta.env.ACCESS_TOKEN_PRODUCCION
            : import.meta.env.ACCESS_TOKEN_PRUEBAS;

        if (!accessToken) {
            return new Response(JSON.stringify({ error: "Configuración de Mercado Pago incompleta" }), { status: 500 });
        }

        const client = new MercadoPagoConfig({ accessToken });
        const preference = new Preference(client);

        const response = await preference.create({
            body: {
                items: [
                    {
                        id: appType,
                        title: product.name,
                        unit_price: product.price,
                        quantity: 1,
                        currency_id: 'MXN'
                    }
                ],
                back_urls: {
                    success: `${request.url.split('/api')[0]}/license?status=approved`,
                    failure: `${request.url.split('/api')[0]}/license?status=error`,
                    pending: `${request.url.split('/api')[0]}/license?status=pending`
                },
                auto_return: 'approved',
                external_reference: appType,
                notification_url: APP_CONFIG.MERCADO_PAGO_IS_PROD 
                    ? "https://task-goblin.com/api/webhook/mercado-libre-produccion"
                    : "https://task-goblin.com/api/webhook/mercado-libre-pruebas",
                metadata: {
                    app_name: appType
                }
            }
        });

        return new Response(JSON.stringify({ 
            url: APP_CONFIG.MERCADO_PAGO_IS_PROD ? response.init_point : response.sandbox_init_point 
        }), {
            status: 200,
            headers: {
                "Content-Type": "application/json"
            }
        });

    } catch (error: any) {
        console.error("Mercado Pago Preference Error:", error);
        return new Response(JSON.stringify({ error: error.message || "Error al crear la preferencia de pago" }), { status: 500 });
    }
}
