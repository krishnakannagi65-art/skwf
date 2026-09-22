import { redirect } from "react-router";

export async function clientLoader() {
  // Use a 301 status code to indicate a permanent redirect.
  // This helps browsers and SEO bots update their links.
  return redirect("/admin/dashboard", 301);
}
