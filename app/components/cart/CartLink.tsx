import { Link } from "react-router";
import { ShoppingCart } from "lucide-react";
import { useCart } from "~/contexts/CartContext";

const CartLink = () => {
    const { totalItems } = useCart();

    return (
        <Link
            to="/cart"
            aria-label={`Shopping cart with ${totalItems} items`}
            className="relative p-2 focus:outline-none rounded-lg transition-colors"
        >
            <ShoppingCart className="h-5 w-5" aria-hidden="true" />
            {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                    {totalItems > 99 ? '99+' : totalItems}
                </span>
            )}
        </Link>
    );
};

export default CartLink;
