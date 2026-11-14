import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { name, phone, subject, message } = data;

    if (!name || !message) {
      return NextResponse.json(
        { error: "Name and message are required." },
        { status: 400 }
      );
    }

    console.log("[KERNEL 1.0 Contact Submission]:", {
      name,
      phone,
      subject,
      message,
      receivedAt: new Date().toISOString()
    });

    return NextResponse.json(
      { success: true, message: "Transmission received" },
      { status: 200 }
    );
  } catch (error) {
    console.error("[KERNEL Contact Error]:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
