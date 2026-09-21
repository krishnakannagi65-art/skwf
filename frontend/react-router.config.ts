import type { Config } from "@react-router/dev/config";
import products from "./app/data/bed-data";
export default {
  // Config options...
  // Server-side render by default, to enable SPA mode set this to `false`
  ssr: false,

  async prerender({ getStaticPaths }) {
    const dynamicPaths = products.map(
      (product: any) => `/product/${product.slug}`,
    );
    const staticPaths = getStaticPaths();
    return [...staticPaths, ...dynamicPaths];
  },
} satisfies Config;
