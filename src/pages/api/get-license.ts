import type { APIRoute } from 'astro';
import { createClient } from '@supabase/supabase-js';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
    try {
        let body;
        try {
            body = await request.json();
        } catch (e: any) {
            return new Response(JSON.stringify({ error: "Invalid JSON body" }), { status: 400 });
        }

        const { email, paymentId } = body;

        if (!email && !paymentId) {
            return new Response(JSON.stringify({ error: "Email or Payment ID is required" }), { status: 400 });
        }

        const supaUrl = import.meta.env.PUBLIC_SUPABASE_URL || import.meta.env.SUPABASE_URL;
        const supaKey = import.meta.env.SUPABASE_SERVICE_ROLE_KEY || import.meta.env.PUBLIC_SUPABASE_ANON_KEY;

        if (!supaUrl || !supaKey) {
            return new Response(JSON.stringify({ error: "Database configuration missing" }), { status: 500 });
        }

        const supabase = createClient(supaUrl, supaKey);

        let query = supabase
            .from('licenses')
            .select('license_key, created_at, app, payment_id')
            .order('created_at', { ascending: false });

        if (paymentId) {
            query = query.eq('payment_id', paymentId);
        } else {
            query = query.eq('email', email);
        }

        const { data, error } = await query;

        if (error || !data || data.length === 0) {
            return new Response(JSON.stringify({ error: "License not found" }), { status: 404 });
        }

        const keys = data.map(record => ({
            key: record.license_key,
            app: record.app || 'task-goblin'
        }));

        return new Response(JSON.stringify({ licenseKeys: keys }), {
            status: 200,
            headers: {
                "Content-Type": "application/json"
            }
        });

    } catch (error: any) {
        console.error("API Error get-license.ts:", error);
        return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
    }
}
