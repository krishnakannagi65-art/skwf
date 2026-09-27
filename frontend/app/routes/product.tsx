import { useLoaderData } from "react-router";
import { getProductBySlug } from "~/models/product";
import { ProductDetailPage } from "~/pages/product-detail";

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
