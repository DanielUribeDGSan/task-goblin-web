import { createClient } from '@supabase/supabase-js';
export { renderers } from '../../renderers.mjs';

const prerender = false;
const POST = async ({ request }) => {
  try {
    let body;
    try {
      body = await request.json();
    } catch (e) {
      return new Response(JSON.stringify({ error: "Invalid JSON body" }), { status: 400 });
    }
    const { email } = body;
    if (!email) {
      return new Response(JSON.stringify({ error: "Email is required" }), { status: 400 });
    }
    const supaUrl = "https://adsjwkdhfjpcrhqsjezz.supabase.co";
    const supaKey = undefined                                          || "sb_publishable_v69cNViHMfA1aDWphcDxPg_3-Ml0IIR";
    if (!supaUrl || !supaKey) ;
    const supabase = createClient(supaUrl, supaKey);
    const { data, error } = await supabase.from("licenses").select("license_key, created_at").eq("email", email).order("created_at", { ascending: false });
    if (error || !data || data.length === 0) {
      return new Response(JSON.stringify({ error: "License not found" }), { status: 404 });
    }
    const keys = data.map((record) => record.license_key);
    return new Response(JSON.stringify({ licenseKeys: keys }), {
      status: 200,
      headers: {
        "Content-Type": "application/json"
      }
    });
  } catch (error) {
    console.error("API Error get-license.ts:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    POST,
    prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
