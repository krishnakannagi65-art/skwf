import type { Route } from "./+types/home";
import { RoomDesignerPage } from "~/pages/room-designer";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function RoomDesigner() {
  return <RoomDesignerPage />;
}
