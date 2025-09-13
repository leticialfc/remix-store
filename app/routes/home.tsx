import type { Route } from "./+types/home";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Simple Online Store" },
    { name: "description", content: "Shop our online store - browse products, view details, and manage your cart." },
  ];
}

export default function Home() {
  return <div>Hello world</div>;
}
