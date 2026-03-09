import type { APIRoute } from 'astro';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
    try {
        let body;
        try {
            const rawBody = await request.text();
            console.log("Raw body received:", rawBody);
            body = JSON.parse(rawBody);
        } catch (e: any) {
            console.error("Parse error:", e);
            return new Response(JSON.stringify({ error: "Invalid JSON body", details: e.message }), { status: 400 });
        }

        const { email, variantId } = body;

        if (!email || !variantId) {
            return new Response(JSON.stringify({ error: "Faltan datos requeridos (email o variantId)" }), { status: 400 });
        }

        const apiKey = import.meta.env.LEMON_SQUEEZY_API_KEY || import.meta.env.PUBLIC_LEMON_SQUEEZY_API_KEY;

        if (!apiKey) {
            return new Response(JSON.stringify({ error: "Falta configuración de API Key Lemon Squeezy en Astro" }), { status: 500 });
        }

        const response = await fetch("https://api.lemonsqueezy.com/v1/checkouts", {
            method: "POST",
            headers: {
                "Accept": "application/vnd.api+json",
                "Content-Type": "application/vnd.api+json",
                "Authorization": `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
                data: {
                    type: "checkouts",
                    attributes: {
                        checkout_data: {
                            email: email,
                            custom: {
                                user_email: email
                            }
                        }
                    },
                    relationships: {
                        store: {
                            data: {
                                type: "stores",
                                id: "299572" // Actual Store ID (daniel-uribe-apps)
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

    } catch (error: any) {
        console.error("API Error checkout.ts:", error);
        return new Response(JSON.stringify({ error: error.message || "Error interno del servidor" }), { status: 500 });
    }
}
