import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { context, message } = await req.json();

    // Simple mock keyword responses
    let responseText = "That's an interesting question. In home inspection, we typically look at these elements during the " + context + " phase. Would you like to try a practice exercise on this topic?";

    const msgLower = message.toLowerCase();
    
    if (msgLower.includes("siding") || msgLower.includes("rot") || msgLower.includes("wood")) {
      responseText = "Siding issues, especially wood rot, are very common. Always check for proper clearance (usually 6-8 inches) between the siding and the soil or mulch.";
    } else if (msgLower.includes("franchise") || msgLower.includes("business") || msgLower.includes("cost") || msgLower.includes("money")) {
      responseText = "Starting a WIN Home Inspection franchise is a low-overhead opportunity. You don't need inventory or a retail storefront. Let me know if you want to book a call with our franchise development team!";
    }

    await new Promise(resolve => setTimeout(resolve, 600));

    return NextResponse.json({
      reply: responseText
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to process chat" }, { status: 500 });
  }
}
