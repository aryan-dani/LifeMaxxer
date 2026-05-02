export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:8000";

export async function POST(req: Request) {
  try {
    const userData = await req.json();
    console.log("Analyze API: Received User Data", userData);

    // 1. Call FastAPI Backend to generate report via Groq (llama3-8b-8192)
    const backendResponse = await fetch(`${BACKEND_URL}/api/analyze`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!backendResponse.ok) {
      const errorText = await backendResponse.text();
      console.error("Backend error response:", errorText);
      throw new Error(`Backend error: ${backendResponse.statusText}`);
    }

    const { reportData } = await backendResponse.json();

    // 2. Save to Database (if Supabase is connected)
    let reportId = crypto.randomUUID();

    if (supabase) {
      const { data, error } = await supabase
        .from("reports")
        .insert([
          {
            user_data: userData,
            ai_response: reportData,
          },
        ])
        .select("id")
        .single();

      if (error) {
        console.error("Supabase Error:", error);
        // Still continue — we'll use localStorage fallback
      } else if (data) {
        reportId = data.id;
      }
    }

    // 3. Return the report data along with the ID so the frontend can
    //    store it in localStorage as a fallback when Supabase isn't configured
    return NextResponse.json({
      reportId,
      reportData,
      success: true,
    });
  } catch (error: any) {
    console.error("Analyze Route Error:", error);
    return NextResponse.json(
      {
        error:
          error.message ||
          "Failed to analyze. Our servers might be overwhelmed. Try again.",
      },
      { status: 500 },
    );
  }
}
