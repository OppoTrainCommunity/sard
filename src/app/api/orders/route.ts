import { NextResponse } from "next/server";
import { FieldValue } from "firebase-admin/firestore";
import { db } from "@/lib/firebase/admin";
import type { CartItem, OrderCustomer } from "@/types/cart";

interface CreateOrderBody {
  customer: OrderCustomer;
  items: CartItem[];
  subtotal: number;
}

function isValidBody(body: unknown): body is CreateOrderBody {
  if (!body || typeof body !== "object") return false;
  const b = body as Partial<CreateOrderBody>;
  if (!b.customer || typeof b.customer !== "object") return false;
  const { name, phone, city, address } = b.customer as Partial<OrderCustomer>;
  if (!name?.trim() || !phone?.trim() || !city?.trim() || !address?.trim()) return false;
  if (!Array.isArray(b.items) || b.items.length === 0) return false;
  if (typeof b.subtotal !== "number") return false;
  return true;
}

export async function POST(request: Request) {
  const body: unknown = await request.json();

  if (!isValidBody(body)) {
    return NextResponse.json({ error: "بيانات الطلب غير مكتملة" }, { status: 400 });
  }

  const fallbackId = `local-${Date.now()}`;

  try {
    const doc = await db.collection("orders").add({
      customer: body.customer,
      items: body.items,
      subtotal: body.subtotal,
      status: "pending",
      createdAt: FieldValue.serverTimestamp(),
    });
    return NextResponse.json({ orderId: doc.id, persisted: true });
  } catch (error) {
    // Firestore isn't reachable yet (e.g. no service account configured locally).
    // Don't block the customer's order — the WhatsApp confirmation is the source
    // of truth for now; log this so it's visible once real credentials are set up.
    console.error("Failed to persist order to Firestore:", error);
    return NextResponse.json({ orderId: fallbackId, persisted: false });
  }
}
