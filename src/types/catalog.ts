export interface Category {
  slug: string;
  name: string;
  description: string | null;
  order: number;
}

export interface ProductVariant {
  label: string | null;
  price: number;
}

export interface Product {
  id: string;
  category: string;
  name: string;
  description: string | null;
  variants: ProductVariant[];
  contactForPricing: boolean;
  notes: string | null;
  image: string;
}

export interface CatalogData {
  categories: Category[];
  products: Product[];
}
