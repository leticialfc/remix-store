import type { Route } from "./+types/product-detail";

export async function loader({ params }: Route.LoaderArgs) {
    const { id } = params;
    return { id };
}

export async function action() { }

export default function ProductDetail({ loaderData }: Route.ComponentProps) {
    return <div>Product Detail: {loaderData.id}, </div>;
}
