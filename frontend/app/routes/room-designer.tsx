import { useLoaderData } from "react-router";
import { getFeaturedProducts } from "~/models/product";
import { RoomDesignerPage } from "~/pages/room-designer";
import type { Route } from "./+types/wood-library";

export async function loader({}: Route.LoaderArgs) {
  const products = await getFeaturedProducts();

  if (!products) {
    throw new Response("Product Not Found", { status: 404 });
  }

  return { products };
}

export default function RoomDesigner() {
  const { products } = useLoaderData<typeof loader>();
  return <RoomDesignerPage products={products} />;
}
