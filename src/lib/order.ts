import { formatPrice } from "@/lib/catalog";
import type { Order } from "@/types/cart";

export function buildOrderWhatsAppMessage(order: Order): string {
  const lines = [
    `مرحباً، أرغب بتأكيد طلبي رقم #${order.id}`,
    "",
    ...order.items.map(
      (item) =>
        `- ${item.productName}${item.variantLabel ? ` (${item.variantLabel})` : ""} × ${item.quantity} — ${formatPrice(item.price * item.quantity)}`
    ),
    "",
    `المجموع الفرعي: ${formatPrice(order.subtotal)}`,
    "",
    `الاسم: ${order.customer.name}`,
    `الهاتف: ${order.customer.phone}`,
    `المدينة: ${order.customer.city}`,
    `العنوان: ${order.customer.address}`,
    ...(order.customer.notes ? [`ملاحظات: ${order.customer.notes}`] : []),
  ];
  return lines.join("\n");
}
