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

export interface Product {
  id: string;
  name: string;
  name_ta: string;
  slug: string;
  description: string;
  description_ta: string;
  price_min: number;
  price_max: number;
  category_id: string | null;
  wood_type_id: string | null;
  image_url: string;
  gallery_images: string[];
  dimensions: string;
  is_featured: boolean;
  is_customizable: boolean;
  display_order: number;
  category?: Category;
  wood_type?: WoodType;
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
  | { name: "home" }
  | { name: "showroom" }
  | { name: "product"; slug: string }
  | { name: "custom-builder" }
  | { name: "room-designer" }
  | { name: "wood-library" }
  | { name: "gallery" }
  | { name: "made-for-home" }
  | { name: "contact" }
  | { name: "about" };
