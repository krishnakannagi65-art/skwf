import type { Route } from "@/types";
import { useEffect, useState } from "react";

export function parseHash(): Route {
  const hash = window.location.hash.replace(/^#\/?/, "");
  const parts = hash.split("/").filter(Boolean);

  if (parts.length === 0) return { name: "home" };

  switch (parts[0]) {
    case "showroom":
      return { name: "showroom" };
    case "product":
      return { name: "product", slug: parts[1] || "" };
    case "custom-builder":
      return { name: "custom-builder" };
    case "room-designer":
      return { name: "room-designer" };
    case "wood-library":
      return { name: "wood-library" };
    case "gallery":
      return { name: "gallery" };
    case "made-for-home":
      return { name: "made-for-home" };
    case "contact":
      return { name: "contact" };
    case "about":
      return { name: "about" };
    default:
      return { name: "home" };
  }
}

export function navigate(path: string) {
  window.location.hash = path;
  window.scrollTo({ top: 0, behavior: "smooth" });
}

export function useRoute(): Route {
  const [route, setRoute] = useState<Route>(() => parseHash());

  useEffect(() => {
    const handler = () => {
      setRoute(parseHash());
      window.scrollTo({ top: 0, behavior: "smooth" });
    };
    window.addEventListener("hashchange", handler);
    return () => window.removeEventListener("hashchange", handler);
  }, []);

  return route;
}

export function routeToPath(route: Route): string {
  switch (route.name) {
    case "home":
      return "/";
    case "showroom":
      return "/showroom";
    case "product":
      return `/product/${route.slug}`;
    case "custom-builder":
      return "/custom-builder";
    case "room-designer":
      return "/room-designer";
    case "wood-library":
      return "/wood-library";
    case "gallery":
      return "/gallery";
    case "made-for-home":
      return "/made-for-home";
    case "contact":
      return "/contact";
    case "about":
      return "/about";
  }
}
