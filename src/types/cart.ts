export interface CartItem {
  id: string;
  productId: string;
  productName: string;
  productImage: string;
  categorySlug: string;
  variantLabel: string | null;
  price: number;
  quantity: number;
}

export interface OrderCustomer {
  name: string;
  phone: string;
  city: string;
  address: string;
  notes: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  subtotal: number;
  customer: OrderCustomer;
  createdAt: string;
}
