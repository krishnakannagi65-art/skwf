import { useParams } from "react-router";
import type { Route } from "./+types/home";
import { ProductDetailPage } from "~/pages/product-detail";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Product() {
  const params = useParams<{ slug: string }>();
  return <ProductDetailPage slug={params.slug!} />;
}
