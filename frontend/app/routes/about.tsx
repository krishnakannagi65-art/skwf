import { mergeMeta } from "~/lib/utils";
import { AboutPage } from "~/pages/about";

import type { Route } from "./+types/showroom";

export function meta({ matches }: Route.MetaArgs) {
  return mergeMeta(matches, [
    { title: "About — SKWF | Showroom & Workshop" },
    { name: "description", content: "About SKWF Showroom & Workshop" },
    { name: "keywords", content: "SKWF, Showroom, Workshop, About" },
    { name: "og:title", content: "About — SKWF | Showroom & Workshop" },
    { name: "og:description", content: "About SKWF Showroom & Workshop" },
  ]);
}

export default function About() {
  return <AboutPage />;
}
