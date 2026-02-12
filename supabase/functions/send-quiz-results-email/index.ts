import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface QuizEmailRequest {
  email: string;
  goal: string;
  protocolName: string;
  peptides: { name: string; purpose: string }[];
}

const SITE_URL = "https://thepeptideplaybook.lovable.app";

function buildEmailHtml(data: QuizEmailRequest): string {
  const peptideList = data.peptides
    .map((p) => `<li style="margin-bottom:8px;"><strong>${p.name}</strong> — ${p.purpose}</li>`)
    .join("");

  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#f4f4f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <div style="max-width:560px;margin:0 auto;padding:40px 20px;">
    <div style="background:#ffffff;border-radius:12px;padding:40px 32px;box-shadow:0 1px 3px rgba(0,0,0,0.08);">
      <h1 style="font-size:24px;font-weight:700;color:#18181b;margin:0 0 8px;">Your Peptide Blueprint Is Ready</h1>
      <p style="color:#71717a;font-size:15px;line-height:1.6;margin:0 0 24px;">
        Based on your quiz answers, we matched you with the <strong style="color:#18181b;">${data.protocolName}</strong>.
      </p>

      <div style="background:#f4f4f5;border-radius:8px;padding:20px 24px;margin-bottom:24px;">
        <p style="font-size:13px;text-transform:uppercase;letter-spacing:0.5px;color:#71717a;margin:0 0 12px;font-weight:600;">Your Recommended Peptides</p>
        <ul style="margin:0;padding:0 0 0 18px;color:#18181b;font-size:15px;line-height:1.8;">
          ${peptideList}
        </ul>
      </div>

      <p style="color:#71717a;font-size:14px;line-height:1.6;margin:0 0 24px;">
        Your full blueprint includes exact dosing, reconstitution walkthroughs, injection guides, and 24/7 AI coaching.
      </p>

      <a href="${SITE_URL}/quiz/results" style="display:inline-block;background:#18181b;color:#ffffff;text-decoration:none;padding:12px 28px;border-radius:8px;font-size:15px;font-weight:600;margin-bottom:12px;">
        View Your Full Results
      </a>

      <br/>

      <a href="${SITE_URL}/signup" style="display:inline-block;background:transparent;color:#18181b;text-decoration:none;padding:10px 28px;border-radius:8px;font-size:14px;font-weight:500;border:1px solid #e4e4e7;margin-top:8px;">
        Get Your Blueprint — $67
      </a>
    </div>

    <p style="text-align:center;color:#a1a1aa;font-size:12px;margin-top:24px;line-height:1.5;">
      Peptide Playbook · Educational information only · Not medical advice
    </p>
  </div>
</body>
</html>`;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
    if (!RESEND_API_KEY) {
      throw new Error("RESEND_API_KEY is not configured");
    }

    const data: QuizEmailRequest = await req.json();

    if (!data.email || !data.protocolName) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const html = buildEmailHtml(data);

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Peptide Playbook <onboarding@resend.dev>",
        to: [data.email],
        subject: "Your Peptide Blueprint Is Ready",
        html,
      }),
    });

    const result = await res.json();

    if (!res.ok) {
      console.error("Resend API error:", result);
      return new Response(
        JSON.stringify({ error: "Failed to send email", details: result }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ success: true, id: result.id }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error sending quiz results email:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
