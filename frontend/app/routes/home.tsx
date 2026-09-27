import { useLoaderData } from "react-router";
import { getFeaturedProducts } from "~/models/product";
import { HomePage } from "~/pages/home";

import type { Route } from "./+types/home";

export async function loader({}: Route.LoaderArgs) {
  const products = await getFeaturedProducts();

  if (!products) {
    throw new Response("Product Not Found", { status: 404 });
  }

  return { products };
}

export default function Home() {
  const { products } = useLoaderData<typeof loader>();

  return <HomePage featuredProducts={products} />;
}
