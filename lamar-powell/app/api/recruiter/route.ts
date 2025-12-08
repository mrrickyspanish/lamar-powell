import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));

    const sport = String(body.sport || "").trim();
    const name = String(body.name || "").trim();
    const email = String(body.email || "").trim();
    const phone = String(body.phone || "").trim() || null;
    const school = String(body.school || "").trim() || null;
    const role = String(body.role || "").trim() || null;
    const message = String(body.message || "").trim() || null;

    if (!sport || !name || !email) {
      return NextResponse.json(
        { ok: false, error: "Name and email are required." },
        { status: 400 }
      );
    }

    // Optional: validate .edu email
    // if (!email.endsWith('.edu')) {
    //   return NextResponse.json(
    //     { ok: false, error: "Please use your university email address." },
    //     { status: 400 }
    //   );
    // }

    // Insert into Supabase
    const supabase = getSupabaseAdmin();
    const { error } = await supabase.from("recruiter_messages").insert([
      {
        sport,
        name,
        email,
        phone,
        school,
        role,
        message,
      },
    ]);

    if (error) {
      console.error("Supabase recruiter_messages insert error:", error);
      return NextResponse.json(
        { ok: false, error: "Database insert failed." },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Recruiter POST fatal error:", err);
    return NextResponse.json(
      { ok: false, error: "Unexpected server error." },
      { status: 500 }
    );
  }
}
