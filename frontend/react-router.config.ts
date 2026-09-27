import type { Config } from "@react-router/dev/config";
export default {
  // Config options...
  // Server-side render by default, to enable SPA mode set this to `false`
  ssr: false,
  prerender: true,
  // async prerender({ getStaticPaths }) {
  //   const products = await getProducts();
  //   const dynamicPaths = products.map(
  //     (product: any) => `/product/${product.slug}`,
  //   );
  //   const staticPaths = getStaticPaths();
  //   return [...staticPaths, "/product/:slug", ...dynamicPaths];
  // },
} satisfies Config;
