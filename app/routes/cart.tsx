import type { Route } from "./+types/cart";
import { useCart } from "~/contexts/CartContext";
import { Link } from "react-router";
import Button from "~/components/ui/Button";
import CartItem from "~/components/cart/CartItem";
import CartSummary from "~/components/cart/CartSummary";

export function meta({ }: Route.MetaArgs) {
    return [
        { title: "Shopping Cart - The Online Store" },
        { name: "description", content: "Review and manage items in your shopping cart." },
    ];
}

export default function Cart() {
    const { items, totalPrice } = useCart();

    const handleCheckout = () => {
        alert("Checkout");
    };

    if (items.length === 0) {
        return (
            <div className="w-full text-center py-8">
                <h1 className="text-xl font-semibold mb-2">Your cart is empty</h1>
                <p className="text-gray-700 mb-8">Add some products to get started!</p>
                <Link to="/">
                    <Button>
                        Continue Shopping
                    </Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
                <div className="space-y-6">
                    {items.map((item) => (
                        <CartItem key={item.id} item={item} />
                    ))}
                </div>
            </div>

            {/* Cart Summary */}
            <div className="lg:col-span-1">
                <CartSummary
                    subtotal={totalPrice}
                    onCheckout={handleCheckout}
                />
            </div>
        </div>
    );
}
