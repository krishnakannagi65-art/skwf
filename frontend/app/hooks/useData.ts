import type { Category, Project, Testimonial, WoodType } from "~/types";

export function useCategories() {
  return { categories: [] as Category[], loading: false };
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
