import type { Route } from "./+types/home";
import { MadeForHomePage } from "~/pages/made-for-home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function MadeForHome() {
  return <MadeForHomePage />;
}
