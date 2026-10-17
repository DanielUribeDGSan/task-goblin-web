import type { APIRoute } from 'astro';
import { APP_CONFIG } from '../../../../constants/config';

export const prerender = false;

const PAYPAL_API = APP_CONFIG.PAYPAL_IS_PROD
  ? 'https://api-m.paypal.com'
  : 'https://api-m.sandbox.paypal.com';

export const GET: APIRoute = async ({ request, redirect }) => {
  try {
    const orderId = new URL(request.url).searchParams.get('token');
    if (!orderId) return redirect('/donate?status=error');

    const clientId = APP_CONFIG.PAYPAL_IS_PROD
      ? import.meta.env.PAYPAL_KEY_API_PRODUCCION
      : import.meta.env.PAYPAL_KEY_API_PRUEBAS;
    const secret = APP_CONFIG.PAYPAL_IS_PROD
      ? import.meta.env.PAYPAL_KEY_PRODUCCION
      : import.meta.env.PAYPAL_KEY_PRUEBAS;
    if (!clientId || !secret) return redirect('/donate?status=error');

    const tokenResponse = await fetch(`${PAYPAL_API}/v1/oauth2/token`, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${Buffer.from(`${clientId}:${secret}`).toString('base64')}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: 'grant_type=client_credentials',
    });
    const tokenData = await tokenResponse.json();
    const capture = await fetch(`${PAYPAL_API}/v2/checkout/orders/${encodeURIComponent(orderId)}/capture`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${tokenData.access_token}`, 'Content-Type': 'application/json' },
    });
    return redirect(capture.ok ? '/donate?status=success' : '/donate?status=error');
  } catch {
    return redirect('/donate?status=error');
  }
};
