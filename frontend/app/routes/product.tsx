import { useLoaderData } from "react-router";
import { mergeMeta } from "~/lib/utils";
import { getProductBySlug } from "~/models/product";
import { ProductDetailPage } from "~/pages/product-detail";

import type { Route } from "./+types/product";

export function meta({ matches }: Route.MetaArgs) {
  return mergeMeta(matches, [
    { title: "Product Details — SKWF | Showroom & Workshop" },
    {
      name: "description",
      content: "Product details by SKWF Showroom & Workshop",
    },
    { name: "keywords", content: "SKWF, Showroom, Workshop, Product Details" },
    {
      name: "og:title",
      content: "Product Details — SKWF | Showroom & Workshop",
    },
    {
      name: "og:description",
      content: "Product details by SKWF Showroom & Workshop",
    },
  ]);
}

export async function clientLoader({ params }: { params: { slug: string } }) {
  const { slug } = params;
  try {
    const product = await getProductBySlug(slug);
    if (!product) {
      throw new Response("Product Not Found", { status: 404 });
    }
    return { product };
  } catch (error) {
    throw new Response("Product Not Found", { status: 404 });
  }
}

export function HydrateFallback() {
  return <div>Loading product details...</div>;
}

export default function Product() {
  const { product } = useLoaderData<typeof clientLoader>();
  return <ProductDetailPage product={product} />;
}
