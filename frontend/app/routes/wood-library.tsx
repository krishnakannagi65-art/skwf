import { mergeMeta } from "~/lib/utils";
import { WoodLibraryPage } from "~/pages/wood-library";

import type { Route } from "./+types/wood-library";

export function meta({ matches }: Route.MetaArgs) {
  return mergeMeta(matches, [
    { title: "Wood Library — SKWF | Showroom & Workshop" },
    {
      name: "description",
      content: "Wood Library of SKWF Showroom & Workshop",
    },
    { name: "keywords", content: "SKWF, Showroom, Workshop, Wood Library" },
    { name: "og:title", content: "Wood Library — SKWF | Showroom & Workshop" },
    {
      name: "og:description",
      content: "Wood Library of SKWF Showroom & Workshop",
    },
  ]);
}

export default function WoodLibrary() {
  return <WoodLibraryPage />;
}
