import { useCart } from "~/contexts/CartContext";
import type { Product } from "~/services/api.server";

interface CartItem extends Product {
    quantity: number;
}

interface CartItemProps {
    item: CartItem;
}

const CartItem = ({ item }: CartItemProps) => {
    const { removeFromCart, updateQuantity } = useCart();

    return (
        <div className="flex items-center space-x-4 p-4 border-b">
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
                    aria-label={`Decrease quantity of ${item.title}`}
                >
                    -
                </button>
                <span className="w-8 text-center font-medium" aria-label={`Quantity: ${item.quantity}`}>
                    {item.quantity}
                </span>
                <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 transition-colors"
                    aria-label={`Increase quantity of ${item.title}`}
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
                aria-label={`Remove ${item.title} from cart`}
            >
                Remove
            </button>
        </div>
    );
};

export default CartItem;