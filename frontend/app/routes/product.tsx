import { useLoaderData } from "react-router";
import { getProductBySlug } from "~/models/product";
import { ProductDetailPage } from "~/pages/product-detail";

export async function loader({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const product = await getProductBySlug(slug);

  if (!product) {
    throw new Response("Product Not Found", { status: 404 });
  }

  return { product };
}

export default function Product() {
  const { product } = useLoaderData<typeof loader>();
  return <ProductDetailPage product={product} />;
}
