import type { APIRoute } from 'astro';
import { MercadoPagoConfig, Preference } from 'mercadopago';
import { APP_CONFIG } from '../../../../constants/config';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    const accessToken = APP_CONFIG.MERCADO_PAGO_IS_PROD
      ? import.meta.env.ACCESS_TOKEN_PRODUCCION
      : import.meta.env.ACCESS_TOKEN_PRUEBAS;
    if (!accessToken) throw new Error('Configuración de Mercado Pago incompleta');

    const origin = new URL(request.url).origin;
    const preference = new Preference(new MercadoPagoConfig({ accessToken }));
    const response = await preference.create({
      body: {
        items: [{
          id: 'donation-task-notch',
          title: 'Donar un café a Task Notch',
          unit_price: 50,
          quantity: 1,
          currency_id: 'MXN',
          category_id: 'software',
          description: 'Apoyo voluntario al desarrollo de Task Notch',
        }],
        statement_descriptor: 'TASKGOBLIN',
        back_urls: {
          success: `${origin}/donate?status=success`,
          failure: `${origin}/donate?status=error`,
          pending: `${origin}/donate?status=pending`,
        },
        auto_return: 'approved',
        external_reference: 'donation-task-notch',
        metadata: { kind: 'donation', app_name: 'task-notch' },
      },
    });
    const url = APP_CONFIG.MERCADO_PAGO_IS_PROD ? response.init_point : response.sandbox_init_point;
    if (!url) throw new Error('No se recibió una URL de Mercado Pago');
    return new Response(JSON.stringify({ url }), { headers: { 'Content-Type': 'application/json' } });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
