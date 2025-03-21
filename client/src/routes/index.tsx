import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

export const Route = createFileRoute("/")({
  component: HomeComponent,
});

function HomeComponent() {
  useEffect(() => {
    const id = localStorage.getItem("uuid");
    if (!id) {
      localStorage.setItem("uuid", uuidv4());
    }
  }, []);
  return <main></main>;
}
