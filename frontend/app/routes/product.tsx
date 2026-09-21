import { useParams } from "react-router";
import { ProductDetailPage } from "~/pages/product-detail";

export default function Product() {
  const params = useParams<{ slug: string }>();
  return <ProductDetailPage slug={params.slug!} />;
}
