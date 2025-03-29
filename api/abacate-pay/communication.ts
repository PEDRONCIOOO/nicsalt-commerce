import { CartItem } from "@/app/components/ui/CartContext";
import { generateOrderId } from "@/lib/utils";

const ABACATE_PAY_API_KEY = process.env.NEXT_PUBLIC_ABACATE_PAY_API_KEY;
const ABACATE_PAY_API_URL = "https://api.abacatepay.com/v1";

interface PaymentResponse {
  id: string;
  status: string;
  qrcode_image_url: string;
  qrcode_text: string;
  payment_url: string;
  expires_at: string;
}

export async function createPixPayment(items: CartItem[], customerEmail: string) {
  try {
    const orderId = generateOrderId();
    
    // Calculate total amount
    const amount = items.reduce(
      (total, item) => total + item.product.price * item.quantity, 
      0
    ).toFixed(2);
    
    // Format items for API
    const lineItems = items.map(item => ({
      name: item.product.name,
      quantity: item.quantity,
      unit_amount: Math.round(item.product.price * 100), // Convert to cents
      sku: item.product.id.toString()
    }));

    const response = await fetch(`${ABACATE_PAY_API_URL}/payments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${ABACATE_PAY_API_KEY}`
      },
      body: JSON.stringify({
        payment_method: 'pix',
        amount: Math.round(parseFloat(amount) * 100), // Convert to cents
        currency: 'BRL',
        description: `Pedido #${orderId} - TROTTA Vapes`,
        expires_in: 3600, // 1 hour expiration
        customer: {
          email: customerEmail
        },
        metadata: {
          order_id: orderId
        },
        line_items: lineItems
      })
    });

    if (!response.ok) {
      throw new Error(`Payment request failed: ${response.statusText}`);
    }

    const paymentData: PaymentResponse = await response.json();
    return paymentData;
  } catch (error) {
    console.error("Error creating payment:", error);
    throw error;
  }
}

export async function checkPaymentStatus(paymentId: string) {
  try {
    const response = await fetch(`${ABACATE_PAY_API_URL}/payments/${paymentId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${ABACATE_PAY_API_KEY}`
      }
    });

    if (!response.ok) {
      throw new Error(`Failed to check payment status: ${response.statusText}`);
    }

    const paymentData = await response.json();
    return paymentData;
  } catch (error) {
    console.error("Error checking payment status:", error);
    throw error;
  }
}