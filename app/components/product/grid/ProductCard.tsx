import { Link } from "react-router";
import type { Product } from "~/services/api.server";

interface ProductCardProps {
    product: Product;
    className?: string;
}

const ProductCard = ({ product, className = "" }: ProductCardProps) => {
    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        }).format(price);
    };

    return (
        <Link
            to={`/products/${product.id}`}
            className={`group block ${className}`}
        >
            <div className="space-y-3">
                {/* Product Image */}
                <div className="aspect-square bg-gray-200 overflow-hidden">
                    <img
                        src={product.thumbnail}
                        alt={product.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                </div>

                {/* Product Info */}
                <div className="space-y-1">
                    <h3 className="text-sm font-medium text-gray-900 group-hover:text-gray-700 transition-colors">
                        {product.title}
                    </h3>
                    <p className="text-sm text-gray-600">
                        {formatPrice(product.price)}
                    </p>
                </div>
            </div>
        </Link>
    );
};

export default ProductCard;