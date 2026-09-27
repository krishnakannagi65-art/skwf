import { useLoaderData } from "react-router";
import { getFeaturedProducts } from "~/models/product";
import { MadeForHomePage } from "~/pages/made-for-home";

import type { Route } from "./+types/made-for-home";

export async function loader({}: Route.LoaderArgs) {
  const products = await getFeaturedProducts();

  if (!products) {
    throw new Response("Product Not Found", { status: 404 });
  }

  return { products };
}

export default function MadeForHome() {
  const { products } = useLoaderData<typeof loader>();
  return <MadeForHomePage products={products} />;
}
