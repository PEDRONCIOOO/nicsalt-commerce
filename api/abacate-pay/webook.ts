import { NextRequest, NextResponse } from "next/server";

const WEBHOOK_SECRET = process.env.ABACATE_PAY_WEBHOOK_SECRET;

export async function POST(request: NextRequest) {
  try {
    // Verify webhook signature for security (implementation depends on AbacatePay's webhook format)
    const signature = request.headers.get("x-abacate-pay-signature");
    if (!signature || !WEBHOOK_SECRET) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    
    // Get the webhook payload
    const payload = await request.json();
    
    // Process different event types
    const eventType = payload.type;
    
    if (eventType === "payment.succeeded" || eventType === "payment.completed") {
      // Update order status in your database
      // This would connect to your order management system
      const orderId = payload.data.metadata?.order_id;
      
      if (orderId) {
        // Update order status to paid/completed in your database
        // Example: await db.updateOrderStatus(orderId, "paid");
        console.log(`Order ${orderId} has been paid successfully`);
      }
    }
    
    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json({ error: "Webhook handler failed" }, { status: 500 });
  }
}