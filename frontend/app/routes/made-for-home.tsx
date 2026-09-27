import { useLoaderData } from "react-router";
import { getFeaturedProducts } from "~/models/product";
import { MadeForHomePage } from "~/pages/made-for-home";

import { mergeMeta } from "~/lib/utils";
import type { Route } from "./+types/made-for-home";

export function meta({ matches }: Route.MetaArgs) {
  return mergeMeta(matches, [
    { title: "Made for Home — SKWF | Showroom & Workshop" },
    {
      name: "description",
      content: "Made for Home by SKWF Showroom & Workshop",
    },
    { name: "keywords", content: "SKWF, Showroom, Workshop, Made for Home" },
    { name: "og:title", content: "Made for Home — SKWF | Showroom & Workshop" },
    {
      name: "og:description",
      content: "Made for Home by SKWF Showroom & Workshop",
    },
  ]);
}

export async function clientLoader({}: Route.LoaderArgs) {
  const products = await getFeaturedProducts();

  if (!products) {
    throw new Response("Product Not Found", { status: 404 });
  }

  return { products };
}

export default function MadeForHome() {
  const { products } = useLoaderData<typeof clientLoader>();
  return <MadeForHomePage products={products} />;
}
