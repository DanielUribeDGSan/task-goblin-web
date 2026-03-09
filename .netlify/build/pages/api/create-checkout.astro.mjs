export { renderers } from '../../renderers.mjs';

const prerender = false;
const POST = async ({ request }) => {
  try {
    let body;
    try {
      const rawBody = await request.text();
      console.log("Raw body received:", rawBody);
      body = JSON.parse(rawBody);
    } catch (e) {
      console.error("Parse error:", e);
      return new Response(JSON.stringify({ error: "Invalid JSON body", details: e.message }), { status: 400 });
    }
    const { email, variantId } = body;
    if (!email || !variantId) {
      return new Response(JSON.stringify({ error: "Faltan datos requeridos (email o variantId)" }), { status: 400 });
    }
    const apiKey = undefined                                      || "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI5NGQ1OWNlZi1kYmI4LTRlYTUtYjE3OC1kMjU0MGZjZDY5MTkiLCJqdGkiOiI4MzNlYWY0ZWQ0Y2FiYmRhZDljOGYxYmExYzJiYWQ3OTZiYmNkMmExZWZmN2Q5MzA3YWQ1ODdmOTdhNTNhMGI1YWJjMWI4NzhhMzc0MmQ2MyIsImlhdCI6MTc3MzAyMzU3OC43Mzc2MjEsIm5iZiI6MTc3MzAyMzU3OC43Mzc2MjMsImV4cCI6MTc4ODgyNTYwMC4wMTgzMDksInN1YiI6IjY1NjgzMDEiLCJzY29wZXMiOltdfQ.yKzSRcc46YDZBNUhL3lJVZ_rw3x1C_VT9w9YseseN-w4rfmVUaZmK759ARt8fbUE8T_XM5LeYYtfvNRsf4VG7MTYIqelxOrLacezIANthaN9q9InykjfZ-f7YSdy1LUVxqbGKQjDZjakj9V0UYO5sH27UCsUe1AJD6aPgUm26QTFerfaEBb0AknNfDg3eP_Ct0b0KGvezY_9vWnQCgAlc_Tk4X_zKeDrDo99p8NL6l9Uxq3-_OT4gghc5jX8Jmi32LhN92kTNTe70DNvkeY4QvcgNGroO0YN1uUE_IEtaBveP1I3jSH7dwb-vZx0qrxYX4nBCjdOtPI-4dQW0pqeLENn11gpJvtwn-D1tcWdlyR9uGvnPi9UgTgSz-7A3RZ2hG3xlzGuEsYcZUcM7xFvjs45WFGSeTq2jE7jNAZ4s1vjhCP_76BZN5mgn5RwNgU8qKW19v2gg1Lsb3i9vRt-YDbNcWQQ1ngJXoCsH1I1SJHST2XTZpJn5LgaSlzOKB9sRPZpojMPvzC7V2_b8IoSZng270eVfXbkFQuf2He8Y9MAaVAAsshaMdoCveOaoqU30BNyQh8DjzRzSINAy0Q7XgIHhBAGFezh6dBpLKjiSMc8ajeB1E2s4EImOu_il-CnDB0RcJgOX-k5A2RfhRsCshH0jU1n45AqTbhVs89Pw80";
    if (!apiKey) ;
    const response = await fetch("https://api.lemonsqueezy.com/v1/checkouts", {
      method: "POST",
      headers: {
        "Accept": "application/vnd.api+json",
        "Content-Type": "application/vnd.api+json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        data: {
          type: "checkouts",
          attributes: {
            checkout_data: {
              email,
              custom: {
                user_email: email
              }
            }
          },
          relationships: {
            store: {
              data: {
                type: "stores",
                id: "299572"
                // Actual Store ID (daniel-uribe-apps)
              }
            },
            variant: {
              data: {
                type: "variants",
                id: variantId.toString()
              }
            }
          }
        }
      })
    });
    if (!response.ok) {
      const errData = await response.json();
      console.error("LemonSqueezy Error:", errData);
      return new Response(JSON.stringify({ error: errData.errors?.[0]?.detail || "Error al crear checkout" }), { status: response.status });
    }
    const checkoutData = await response.json();
    return new Response(JSON.stringify({ url: checkoutData.data.attributes.url }), {
      status: 200,
      headers: {
        "Content-Type": "application/json"
      }
    });
  } catch (error) {
    console.error("API Error checkout.ts:", error);
    return new Response(JSON.stringify({ error: error.message || "Error interno del servidor" }), { status: 500 });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    POST,
    prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
