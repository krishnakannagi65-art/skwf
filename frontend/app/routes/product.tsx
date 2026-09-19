import type { Route } from "./+types/home";
import { ProductDetailPage } from "~/pages/product-detail";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

// TODO: Update the slug to be dynamic based on the product being viewed. This will likely involve using route parameters or a query string to determine which product's details to display.
export default function Product() {
  return <ProductDetailPage slug="example-product" />;
}
