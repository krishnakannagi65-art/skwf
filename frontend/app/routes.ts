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
  route("admin/login", "routes/admin/login.tsx"),
  route("admin/logout", "routes/admin/logout.tsx"),

  layout("layouts/admin.tsx", [
    route("admin", "routes/admin/dashboard-redirect.tsx"),
    route("admin/dashboard", "routes/admin/dashboard.tsx"),
    // route("admin/products/list", "routes/admin/products.tsx"),
    // route("admin/products/new", "routes/admin/product-new.tsx"),
    // route("admin/products/:id/edit", "routes/admin/product-edit.tsx"),
  ]),
] satisfies RouteConfig;
