import type { Route } from "./+types/cart";
import { useCart } from "~/contexts/CartContext";
import { Link } from "react-router";
import Button from "~/components/ui/Button";
import CartItem from "~/components/ui/CartItem";

export function meta({ }: Route.MetaArgs) {
    return [
        { title: "Shopping Cart - The Online Store" },
        { name: "description", content: "Review and manage items in your shopping cart." },
    ];
}

export default function Cart() {
    const { items, removeFromCart, updateQuantity, totalPrice, clearCart } = useCart();

    if (items.length === 0) {
        return (
            <div className="w-full text-center py-12">
                <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
                <p className="text-gray-600 mb-6">Add some products to get started!</p>
                <Link to="/">
                    <Button>
                        Continue Shopping
                    </Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-12">
            <div className="lg:col-span-2">
                {items.map((item) => (
                    <CartItem key={item.id} item={item} />
                ))}
            </div>

            <div className="mt-8 bg-white p-6 rounded-lg shadow border">
                <div className="flex justify-between items-center mb-4">
                    <span className="text-xl font-semibold">Total: ${totalPrice.toFixed(2)}</span>
                    <div className="space-x-4">
                        <button
                            onClick={clearCart}
                            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                            Clear Cart
                        </button>
                        <button className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                            Checkout
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
