import { mergeMeta } from "~/lib/utils";
import { GalleryPage } from "~/pages/gallery";

import type { Route } from "./+types/gallery";

export function meta({ matches }: Route.MetaArgs) {
  return mergeMeta(matches, [
    { title: "Gallery — SKWF | Showroom & Workshop" },
    { name: "description", content: "Gallery of SKWF Showroom & Workshop" },
    { name: "keywords", content: "SKWF, Showroom, Workshop, Gallery" },
    { name: "og:title", content: "Gallery — SKWF | Showroom & Workshop" },
    { name: "og:description", content: "Gallery of SKWF Showroom & Workshop" },
  ]);
}

export default function Gallery() {
  return <GalleryPage />;
}
