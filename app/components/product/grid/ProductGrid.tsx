import type { Product } from "~/services/api.server";
import ProductCard from "./ProductCard";

interface ProductGridProps {
    products: Product[];
    className?: string;
}

const ProductGrid = ({ products, className = "" }: ProductGridProps) => {
    return (
        <section
            className={`${className}`}
            aria-label="Product grid"
        >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                    <ProductCard
                        key={product.id}
                        product={product}
                        className="focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2 rounded-lg"
                    />
                ))}
            </div>
        </section>
    );
};

export default ProductGrid;
