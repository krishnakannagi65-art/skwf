import type { Route } from "./+types/home";
import { WoodLibraryPage } from "~/pages/wood-library";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function WoodLibrary() {
  return <WoodLibraryPage />;
}
