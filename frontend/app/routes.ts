import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  layout("layouts/root.tsx", [
    index("routes/home.tsx"),
    route("showroom", "routes/showroom.tsx"),
    route("product/:slug", "routes/product.tsx"),
    route("custom-builder", "routes/custom-builder.tsx"),
    route("room-designer", "routes/room-designer.tsx"),
    route("wood-library", "routes/wood-library.tsx"),
    route("gallery", "routes/gallery.tsx"),
    route("made-for-home", "routes/made-for-home.tsx"),
    route("contact", "routes/contact.tsx"),
    route("about", "routes/about.tsx"),
  ]),
] satisfies RouteConfig;
