import { mergeMeta } from "~/lib/utils";
import { ShowroomPage } from "~/pages/showroom";

import type { Route } from "./+types/showroom";

export function meta({ matches }: Route.MetaArgs) {
  return mergeMeta(matches, [
    { title: "Showroom — SKWF | Showroom & Workshop" },
    { name: "description", content: "Showroom of SKWF Showroom & Workshop" },
    { name: "keywords", content: "SKWF, Showroom, Workshop, Showroom" },
    { name: "og:title", content: "Showroom — SKWF | Showroom & Workshop" },
    {
      name: "og:description",
      content: "Showroom of SKWF Showroom & Workshop",
    },
  ]);
}

export default function Showroom() {
  return <ShowroomPage />;
}
