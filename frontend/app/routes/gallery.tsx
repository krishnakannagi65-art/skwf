import type { Route } from "./+types/home";
import { GalleryPage } from "~/pages/gallery";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Gallery() {
  return <GalleryPage />;
}
