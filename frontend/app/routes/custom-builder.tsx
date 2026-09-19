import type { Route } from "./+types/home";
import { CustomBuilderPage } from "~/pages/custom-builder";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function CustomBuilder() {
  return <CustomBuilderPage />;
}
