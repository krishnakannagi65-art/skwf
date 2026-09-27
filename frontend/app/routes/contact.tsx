import { mergeMeta } from "~/lib/utils";
import { ContactPage } from "~/pages/contact";

import type { Route } from "./+types/room-designer";

export function meta({ matches }: Route.MetaArgs) {
  return mergeMeta(matches, [
    { title: "Contact — SKWF | Showroom & Workshop" },
    { name: "description", content: "Contact SKWF Showroom & Workshop" },
    { name: "keywords", content: "SKWF, Showroom, Workshop, Contact" },
    { name: "og:title", content: "Contact — SKWF | Showroom & Workshop" },
    { name: "og:description", content: "Contact SKWF Showroom & Workshop" },
  ]);
}

export default function Contact() {
  return <ContactPage />;
}
