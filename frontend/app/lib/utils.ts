import { BUSINESS } from "./constants";

import type { MetaDescriptor } from "react-router";
import type { Route } from "../routes/+types/about";

export function getDefaultMeta() {
  const title = `${BUSINESS.name} — ${BUSINESS.descriptionShort} | ${BUSINESS.location.city}`;
  const urlWithoutTrailingSlash = BUSINESS.seo.url.replace(/\/$/, "");
  return [
    { title },
    {
      name: "description",
      content: BUSINESS.description,
    },
    {
      name: "keywords",
      content: BUSINESS.seo.keywords.join(", "),
    },
    {
      name: "og:title",
      content: title,
    },
    {
      name: "og:description",
      content: BUSINESS.description,
    },
    {
      name: "og:type",
      content: "website",
    },
    {
      name: "og:url",
      content: BUSINESS.seo.url,
    },
    {
      name: "og:image",
      content: `${urlWithoutTrailingSlash}/shop.jpeg`,
    },
    {
      name: "twitter:card",
      content: "summary_large_image",
    },
    {
      name: "twitter:image",
      content: `${urlWithoutTrailingSlash}/shop.jpeg`,
    },
  ];
}

type Match = Route.MetaArgs["matches"][number];

/**
 * Extracts a unique key for a meta tag to determine if it should be overridden.
 */
function getMetaKey(meta: MetaDescriptor): string {
  if ("title" in meta) return "title";
  if ("name" in meta) return `name:${meta.name}`;
  if ("property" in meta) return `property:${meta.property}`;
  if ("charSet" in meta) return "charSet";
  if ("httpEquiv" in meta) return `httpEquiv:${meta.httpEquiv}`;

  // Fallback for unknown meta shapes
  return JSON.stringify(meta);
}

/**
 * Merges parent meta tags with child meta tags, prioritizing the child's overrides.
 */
export function mergeMeta(
  matches: Match[],
  childMeta: MetaDescriptor[],
): MetaDescriptor[] {
  // Gather all parent meta tags
  const parentMeta = matches.flatMap((match) => match?.meta ?? []);

  // Identify the keys of the tags the child is overriding
  const childMetaKeys = new Set(childMeta.map(getMetaKey));

  // Filter out parent tags that the child is replacing
  const preservedParentMeta = parentMeta.filter(
    (tag) => !childMetaKeys.has(getMetaKey(tag)),
  );

  return [...preservedParentMeta, ...childMeta];
}
