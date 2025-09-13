import type { Route } from "./+types/cart";

export async function loader({ params }: Route.LoaderArgs) {
}

export async function action() { }

export default function Cart({ loaderData }: Route.ComponentProps) {
    return <div>Cart</div>;
}
