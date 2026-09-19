import bedProducts from "~/data/bed-data";
import type {
  Category,
  Product,
  Project,
  Testimonial,
  WoodType,
} from "~/types";

export function useCategories() {
  return { categories: [] as Category[], loading: false };
}

export function useProducts(filters?: {
  categoryId?: string;
  woodTypeId?: string;
  featured?: boolean;
}) {
  const products = (bedProducts as Product[]).filter((product) => {
    if (filters?.categoryId && product.category_id !== filters.categoryId)
      return false;
    if (filters?.woodTypeId && product.wood_type_id !== filters.woodTypeId)
      return false;
    if (filters?.featured && !product.is_featured) return false;
    return true;
  });

  return { products, loading: false };
}

export function useProduct(slug: string) {
  return {
    product:
      (bedProducts as Product[]).find((item) => item.slug === slug) || null,
    loading: false,
  };
}

export function useWoodTypes() {
  return { woodTypes: [] as WoodType[], loading: false };
}

export function useProjects() {
  return { projects: [] as Project[], loading: false };
}

export function useTestimonials() {
  return { testimonials: [] as Testimonial[], loading: false };
}

export function useAllData() {
  const { categories, loading: catLoading } = useCategories();
  const { products, loading: prodLoading } = useProducts();
  const { woodTypes, loading: woodLoading } = useWoodTypes();

  return {
    categories,
    products,
    woodTypes,
    loading: catLoading || prodLoading || woodLoading,
  };
}
