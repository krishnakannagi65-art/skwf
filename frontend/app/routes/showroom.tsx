import type { Route } from "./+types/home";
import { ShowroomPage } from "~/pages/showroom";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Showroom() {
  return <ShowroomPage />;
}
