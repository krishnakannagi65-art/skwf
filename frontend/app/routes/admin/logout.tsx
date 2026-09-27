import { redirect } from "react-router";
import { supabase } from "~/lib/supabase";

// Handles direct visits to the URL (GET requests)
export async function clientLoader() {
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error("Logout error:", error);
  }

  return redirect("/admin/login");
}

// Handles form submissions (POST requests), just in case you
// still use the <Form> component for your logout button.
export async function clientAction() {
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error("Logout error:", error);
  }

  return redirect("/admin/login");
}

export default function AdminLogout() {
  return null;
}
