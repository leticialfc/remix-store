import type { Route } from "./+types/cart";
import { useCart } from "~/contexts/CartContext";
import { Link } from "react-router";

export function meta({ }: Route.MetaArgs) {
    return [
        { title: "Shopping Cart - Simple Online Store" },
        { name: "description", content: "Review and manage items in your shopping cart." },
    ];
}

export default function Cart() {
    const { items, removeFromCart, updateQuantity, totalPrice, clearCart } = useCart();

    if (items.length === 0) {
        return (
            <div className="text-center py-12">
                <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
                <p className="text-gray-600 mb-6">Add some products to get started!</p>
                <Link
                    to="/home"
                    className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                >
                    Continue Shopping
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto py-8">
            <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

            <div className="space-y-4">
                {items.map((item) => (
                    <div key={item.id} className="flex items-center space-x-4 bg-white p-4 rounded-lg shadow border">
                        <img
                            src={item.thumbnail}
                            alt={item.title}
                            className="w-16 h-16 object-cover rounded"
                        />
                        <div className="flex-1">
                            <h3 className="font-semibold">{item.title}</h3>
                            <p className="text-gray-600">${item.price.toFixed(2)}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                            <button
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 transition-colors"
                            >
                                -
                            </button>
                            <span className="w-8 text-center font-medium">{item.quantity}</span>
                            <button
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 transition-colors"
                            >
                                +
                            </button>
                        </div>
                        <div className="text-right">
                            <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                        <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-red-600 hover:text-red-800 px-2 transition-colors"
                        >
                            Remove
                        </button>
                    </div>
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
