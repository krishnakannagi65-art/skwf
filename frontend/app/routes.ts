import {
  type RouteConfig,
  index,
  layout,
  prefix,
  route,
} from "@react-router/dev/routes";

export default [
  layout("layouts/root.tsx", [
    index("routes/home.tsx"),
    route("showroom", "routes/showroom.tsx"),
    route("custom-builder", "routes/custom-builder.tsx"),
    route("room-designer", "routes/room-designer.tsx"),
    route("wood-library", "routes/wood-library.tsx"),
    route("gallery", "routes/gallery.tsx"),
    route("made-for-home", "routes/made-for-home.tsx"),
    route("contact", "routes/contact.tsx"),
    route("about", "routes/about.tsx"),

    // Product route
    route("product/:slug", "routes/product.tsx"),
  ]),

  // Admin routes
  ...prefix("admin", [
    route("login", "routes/admin/login.tsx"),
    route("logout", "routes/admin/logout.tsx"),

    layout("layouts/admin.tsx", [
      index("routes/admin/dashboard-redirect.tsx"),
      route("dashboard", "routes/admin/dashboard.tsx"),
      // route("products/list", "routes/admin/products.tsx"),
      // route("products/new", "routes/admin/product-new.tsx"),
      // route("products/:id/edit", "routes/admin/product-edit.tsx"),
    ]),
  ]),
] satisfies RouteConfig;
