import type { Enquiry } from "@/types";

const STORAGE_KEY = "skwf-enquiries";

export async function submitEnquiry(
  data: Omit<Enquiry, "id" | "status" | "created_at">,
): Promise<boolean> {
  const enquiry: Enquiry = {
    ...data,
    id: crypto.randomUUID(),
    status: "new",
    created_at: new Date().toISOString(),
  };

  const existing = JSON.parse(
    localStorage.getItem(STORAGE_KEY) || "[]",
  ) as Enquiry[];
  localStorage.setItem(STORAGE_KEY, JSON.stringify([...existing, enquiry]));
  return true;
}
