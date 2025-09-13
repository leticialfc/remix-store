import type { Route } from "./+types/home";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "The Online Store" },
    { name: "description", content: "Shop our online store - browse products, view details, and manage your cart." },
  ];
}

export async function clientLoader({ params }: Route.LoaderArgs) {
  const res = await fetch('https://dummyjson.com/products');
  return await res.json();
}

export function HydrateFallback() {
  return <p>Loading...</p>
}

export default function Home() {
  return <div>Hello world</div>;
}
