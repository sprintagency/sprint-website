import { NextResponse } from "next/server";
import { Resend } from "resend";

// Sender identity for outbound notifications. Configurable via env; defaults
// to the address requested in the brief. The domain must be verified in Resend.
const FROM = process.env.CONTACT_FROM || "Sprint Website <web@portal.madebysprint.com>";
const TO = process.env.CONTACT_TO || "hello@madebysprint.com";

const validEmail = (e: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
const esc = (s: string) =>
  String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

type Payload = {
  name?: string;
  email?: string;
  company?: string;
  phone?: string;
  topic?: string;
  detail?: string;
  budget?: string;
  timeline?: string;
  message?: string;
  source_url?: string;
  created_at?: string;
};

export async function POST(req: Request) {
  let body: Payload;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const name = (body.name || "").trim();
  const email = (body.email || "").trim();
  if (!name) return NextResponse.json({ error: "Name is required" }, { status: 400 });
  if (!validEmail(email))
    return NextResponse.json({ error: "Valid email is required" }, { status: 400 });

  // TODO (CMS): once Supabase is wired, insert this payload into
  // `contact_submissions` (RLS insert policy) before/after sending the email.

  const rows: [string, string | undefined][] = [
    ["Name", name],
    ["Email", email],
    ["Company", body.company],
    ["Phone", body.phone],
    ["Topic", body.topic],
    ["Detail", body.detail],
    ["Budget", body.budget],
    ["Timeline", body.timeline],
    ["Message", body.message],
    ["Source", body.source_url],
  ];
  const html = `
    <div style="font-family:Arial,Helvetica,sans-serif;font-size:14px;color:#0c1321;">
      <h2 style="margin:0 0 16px;">New website enquiry</h2>
      <table style="border-collapse:collapse;width:100%;max-width:560px;">
        ${rows
          .filter(([, v]) => v && String(v).trim())
          .map(
            ([k, v]) =>
              `<tr><td style="padding:6px 12px 6px 0;color:#737373;vertical-align:top;white-space:nowrap;">${esc(
                k,
              )}</td><td style="padding:6px 0;">${esc(String(v))}</td></tr>`,
          )
          .join("")}
      </table>
    </div>`;

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    // No key configured (e.g. local dev): log and succeed so the UX still works.
    console.warn("[contact] RESEND_API_KEY not set — logging submission only:", {
      name,
      email,
      topic: body.topic,
    });
    return NextResponse.json({ ok: true, delivered: false });
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: FROM,
      to: TO,
      replyTo: email,
      subject: `New enquiry — ${name}${body.topic ? ` (${body.topic})` : ""}`,
      html,
    });
    if (error) {
      console.error("[contact] Resend error:", error);
      return NextResponse.json({ error: "Email send failed" }, { status: 502 });
    }
    return NextResponse.json({ ok: true, delivered: true });
  } catch (err) {
    console.error("[contact] send exception:", err);
    return NextResponse.json({ error: "Email send failed" }, { status: 502 });
  }
}
