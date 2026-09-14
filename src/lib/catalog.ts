import catalogData from "@/data/catalog.json";
import type { CatalogData, Category, Product } from "@/types/catalog";

const data = catalogData as CatalogData;

export function getCategories(): Category[] {
  return [...data.categories].sort((a, b) => a.order - b.order);
}

export function getProductsByCategory(categorySlug: string): Product[] {
  return data.products.filter((p) => p.category === categorySlug);
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return data.categories.find((c) => c.slug === slug);
}

export function getCategoryImage(categorySlug: string): string {
  return getProductsByCategory(categorySlug)[0]?.image ?? "";
}

export function getAllProducts(): Product[] {
  return data.products;
}

export function formatPrice(price: number): string {
  return `${price} ₪`;
}

export function formatCount(n: number): string {
  return `${n} ${n === 1 ? "منتج" : "منتجات"}`;
}
