import { createClient } from '@supabase/supabase-js';
export { renderers } from '../../../renderers.mjs';

const prerender = false;
const POST = async ({ request }) => {
  try {
    const rawBody = await request.text();
    const signature = request.headers.get("x-signature");
    const secret = "sk_666tgsa-5d6f-gb24-5d6f-6533mmggf";
    console.log("Lemon Squeezy Webhook received.");
    if (!secret) ;
    if (!signature) {
      return new Response("Missing signature", { status: 400 });
    }
    const enc = new TextEncoder();
    const key = await crypto.subtle.importKey(
      "raw",
      enc.encode(secret),
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["verify"]
    );
    const signatureBytes = new Uint8Array(
      signature.match(/.{1,2}/g)?.map((byte) => parseInt(byte, 16)) || []
    );
    const isValid = await crypto.subtle.verify("HMAC", key, signatureBytes, enc.encode(rawBody));
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
    if (eventName === "order_created") {
      const attributes = payload.data.attributes;
      const checkoutData = attributes.first_order_item?.checkout_data;
      let userEmail = payload.data.attributes.user_email || payload.data.attributes.user_name || checkoutData?.custom?.user_email;
      if (!userEmail) userEmail = attributes.user_email;
      const autoLicenseKey = attributes.license_key || "LS-" + crypto.randomUUID().toUpperCase().split("-")[0] + "-" + Math.random().toString(36).substr(2, 9).toUpperCase();
      const supaUrl = "https://adsjwkdhfjpcrhqsjezz.supabase.co";
      const supaKey = undefined                                          || "sb_publishable_v69cNViHMfA1aDWphcDxPg_3-Ml0IIR";
      if (supaUrl && supaKey && userEmail) {
        const supabase = createClient(supaUrl, supaKey);
        const { error: dbError } = await supabase.from("licenses").insert([
          {
            email: userEmail,
            license_key: autoLicenseKey
            // puedes agregar más campos si es necesario
          }
        ]);
        if (dbError) {
          console.error("Error inserting license directly to Supabase from Webhook:", dbError);
          return new Response("Error inserting into DB", { status: 500 });
        }
        console.log(`Successfully created license for email in Supabase: ${userEmail}`);
      } else {
        console.log(`Order created for ${userEmail || "unknown"}, but Supabase credentials missing to save license.`);
      }
    }
    return new Response("Webhook processed successfully", { status: 200 });
  } catch (e) {
    console.error("Webhook processing error:", e);
    return new Response("Internal Server Error", { status: 500 });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    POST,
    prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
