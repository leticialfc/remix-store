import { Link, useLocation } from "react-router";
import { ShoppingCart } from "lucide-react";
import { useCart } from "~/contexts/CartContext";

const CartLink = () => {
    const { totalItems } = useCart();
    const location = useLocation();

    return (
        <Link
            to="/cart"
            aria-label={`Shopping cart with ${totalItems} items`}
            className={`relative p-1 focus:outline-none transition-colors border-b ${location.pathname === '/cart' ? 'border-gray-950' : 'border-transparent hover:border-gray-300'}`}
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
