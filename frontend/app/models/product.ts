import { supabase } from "../lib/supabase";
import type { Product } from "../types";

export async function getFeaturedProducts(): Promise<Product[]> {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("is_featured", true)
    .order("display_order", { ascending: true });

  if (error) throw new Error(error.message);
  return data as Product[];
}

export async function getProducts(): Promise<Product[]> {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("display_order", { ascending: true });

  if (error) throw new Error(error.message);
  return data as Product[];
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) throw new Error(error.message);
  return data as Product;
}
