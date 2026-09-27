export interface Category {
  id: string;
  name: string;
  name_ta: string;
  slug: string;
  icon: string;
  description: string;
  description_ta: string;
  display_order: number;
}

export interface WoodType {
  id: string;
  name: string;
  name_ta: string;
  slug: string;
  characteristics: string;
  characteristics_ta: string;
  color_description: string;
  color_description_ta: string;
  durability: string;
  price_tier: string;
  image_url: string;
  grain_texture_url: string;
  display_order: number;
}

export type ProductStatus = "draft" | "active" | "archived";

export interface Product {
  id: string;
  created_at?: string;
  updated_at?: string;

  // Core Identifiers
  sku?: string;
  slug: string;

  // Content & i18n
  name: string;
  name_ta: string;
  description: string;
  description_ta: string;

  // Pricing (Decimals)
  price_min: number;
  price_max: number | null; // Nullable if the product has a fixed, single price

  // Taxonomy
  category_id: string | null; // Ready for a future 'categories' table foreign key
  wood_type?: string[] | null; // Array to support products made of mixed woods

  // Media
  image_url: string | null;
  gallery_images: string[];

  // Configuration
  status?: ProductStatus;
  is_featured: boolean;
  is_customizable: boolean;
  display_order: number;

  dimensions: string;
}

export interface Project {
  id: string;
  title: string;
  title_ta: string;
  description: string;
  description_ta: string;
  before_image: string;
  after_image: string;
  location: string;
  room_type: string;
  display_order: number;
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  rating: number;
  text: string;
  text_ta: string;
  display_order: number;
}

export interface Enquiry {
  id: string;
  name: string;
  phone: string;
  email: string;
  message: string;
  enquiry_type: string;
  details: Record<string, unknown>;
  status: string;
  created_at: string;
}

export type Language = "en" | "ta";

export type Route =
  | { name: "/" }
  | { name: "showroom" }
  | { name: "product"; slug: string }
  | { name: "custom-builder" }
  | { name: "room-designer" }
  | { name: "wood-library" }
  | { name: "gallery" }
  | { name: "made-for-home" }
  | { name: "contact" }
  | { name: "about" };
