import { useLoaderData } from "react-router";
import { mergeMeta } from "~/lib/utils";
import { getFeaturedProducts } from "~/models/product";
import { RoomDesignerPage } from "~/pages/room-designer";

import type { Route } from "./+types/wood-library";

export function meta({ matches }: Route.MetaArgs) {
  return mergeMeta(matches, [
    { title: "Room Designer — SKWF | Showroom & Workshop" },
    {
      name: "description",
      content: "Room Designer by SKWF Showroom & Workshop",
    },
    { name: "keywords", content: "SKWF, Showroom, Workshop, Room Designer" },
    {
      name: "og:title",
      content: "Room Designer — SKWF | Showroom & Workshop",
    },
    {
      name: "og:description",
      content: "Room Designer by SKWF Showroom & Workshop",
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

export default function RoomDesigner() {
  const { products } = useLoaderData<typeof clientLoader>();
  return <RoomDesignerPage products={products} />;
}
