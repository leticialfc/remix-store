import { getProduct } from "~/services/api.server";
import type { Route } from "./+types/product-detail";
import ProductImage from "~/components/ui/ProductImage";
import ProductInfo from "~/components/product/detail/ProductInfo";
import { data } from "react-router";

export async function loader({ params }: Route.LoaderArgs) {
    const product = await getProduct(params.id);
    return { product };
}

export async function action() { }

export function meta({ data }: Route.MetaArgs) {
    return [
        { title: "Product Detail - The Online Store" },
        { name: "description", content: `${data.product.description}` },
    ];
}

export default function ProductDetail({ loaderData }: Route.ComponentProps) {
    const { product } = loaderData;
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-12">
            <div className="lg:col-span-2">
                <ProductImage src={product.images[0]} alt={product.title} />
            </div>
            <ProductInfo
                product={product} />
        </div>
    );
}
