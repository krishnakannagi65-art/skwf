import { mergeMeta } from "~/lib/utils";
import { CustomBuilderPage } from "~/pages/custom-builder";

import type { Route } from "./+types/product";

export function meta({ matches }: Route.MetaArgs) {
  return mergeMeta(matches, [
    { title: "Custom Builder — SKWF | Showroom & Workshop" },
    { name: "description", content: "Build your custom furniture with SKWF" },
    { name: "keywords", content: "SKWF, Showroom, Workshop, Custom Builder" },
    {
      name: "og:title",
      content: "Custom Builder — SKWF | Showroom & Workshop",
    },
    {
      name: "og:description",
      content: "Build your custom furniture with SKWF",
    },
  ]);
}

export default function CustomBuilder() {
  return <CustomBuilderPage />;
}
