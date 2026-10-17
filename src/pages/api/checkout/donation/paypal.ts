import type { APIRoute } from 'astro';
import { APP_CONFIG } from '../../../../constants/config';

export const prerender = false;

const PAYPAL_API = APP_CONFIG.PAYPAL_IS_PROD
  ? 'https://api-m.paypal.com'
  : 'https://api-m.sandbox.paypal.com';

async function accessToken() {
  const clientId = APP_CONFIG.PAYPAL_IS_PROD
    ? import.meta.env.PAYPAL_KEY_API_PRODUCCION
    : import.meta.env.PAYPAL_KEY_API_PRUEBAS;
  const secret = APP_CONFIG.PAYPAL_IS_PROD
    ? import.meta.env.PAYPAL_KEY_PRODUCCION
    : import.meta.env.PAYPAL_KEY_PRUEBAS;
  if (!clientId || !secret) throw new Error('PayPal configuration missing');

  const response = await fetch(`${PAYPAL_API}/v1/oauth2/token`, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${Buffer.from(`${clientId}:${secret}`).toString('base64')}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials',
  });
  const data = await response.json();
  if (!response.ok || !data.access_token) throw new Error('Could not authenticate with PayPal');
  return data.access_token as string;
}

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json().catch(() => ({}));
    const isMexico = Boolean(body.isMexico);
    const minAmount = isMexico ? 30 : 2;
    const defaultAmount = isMexico ? 50 : 3;
    const requestedAmount = Number(body.amount);
    const finalAmount = !isNaN(requestedAmount) && requestedAmount >= minAmount ? requestedAmount : defaultAmount;

    const token = await accessToken();
    const origin = new URL(request.url).origin;
    const currency = isMexico ? 'MXN' : 'USD';
    const value = finalAmount.toFixed(2);

    const response = await fetch(`${PAYPAL_API}/v2/checkout/orders`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        intent: 'CAPTURE',
        purchase_units: [{
          reference_id: 'donation-task-notch',
          amount: { currency_code: currency, value },
          description: 'Coffee donation for Task Notch development',
        }],
        application_context: {
          brand_name: 'Task Goblin Apps',
          landing_page: 'BILLING',
          user_action: 'PAY_NOW',
          return_url: `${origin}/api/checkout/donation/paypal-return`,
          cancel_url: `${origin}/donate?status=cancel`,
        },
      }),
    });
    const order = await response.json();
    if (!response.ok) throw new Error(order.message || 'PayPal rejected the donation');
    const url = order.links?.find((link: { rel: string; href: string }) => link.rel === 'approve')?.href;
    if (!url) throw new Error('No PayPal approval URL received');
    return new Response(JSON.stringify({ url }), { headers: { 'Content-Type': 'application/json' } });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
