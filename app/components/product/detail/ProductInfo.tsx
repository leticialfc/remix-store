import type { Product } from "~/services/api.server";
import AddToCartButton from "~/components/product/detail/AddToCartButton";
import Divider from "../../ui/Divider";

const ProductInfo = ({ product }: { product: Product }) => {
    return (
        <section className="flex-1 flex flex-col">
            <div className="flex flex-col">
                <ProductTitle title={product.title} />
                <ProductPrice price={product.price} />
            </div>
            <div className="mt-6 w-full">
                <AddToCartButton product={product} className="w-full" radius="none" />
            </div>
            <Divider spacing="large" />
            <ProductDescription description={product.description} />
        </section>
    )
}

export default ProductInfo;

const ProductTitle = ({ title }: { title: string }) => {
    return (
        <h1 className="text-2xl font-bold">{title}</h1>
    )
}

const ProductPrice = ({ price }: { price: number }) => {
    const formatPrice = () => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        }).format(price);
    }
    return (
        <div className="text-2xl font-semibold">{formatPrice()}</div>
    )
}

const ProductDescription = ({ description }: { description: string }) => {
    return (
        <div className="flex flex-col gap-3">
            <div>Product Details</div>
            <div>{description}</div>
        </div>
    )
}

