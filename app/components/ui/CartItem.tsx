import { useCart } from "~/contexts/CartContext";
import type { Product } from "~/services/api.server";
import Button from "./Button";
import QuantityPicker from "./QuantityPicker";
import { Trash } from "lucide-react";
import ProductImage from "./ProductImage";

interface CartItem extends Product {
    quantity: number;
}

interface CartItemProps {
    item: CartItem;
}

const CartItem = ({ item }: CartItemProps) => {
    const { removeFromCart, updateQuantity } = useCart();

    const handleQuantityChange = (newQuantity: number) => {
        updateQuantity(item.id, newQuantity);
    };

    return (
        <div className="flex items-center space-x-4 pb-4 border-b">
            <ProductImage src={item.thumbnail} alt={item.title} size="small" />
            <div className="flex flex-1 flex-col items-baseline justify-between">
                <div>
                    <h3 className="font-semibold">{item.title}</h3>
                    <p className="text-gray-600">${item.price.toFixed(2)}</p>
                </div>

                <div className="flex">
                    <QuantityPicker
                        quantity={item.quantity}
                        onQuantityChange={handleQuantityChange}
                        itemName={item.title}
                        min={0} // Allow 0 to remove item
                    />

                    <div className="text-right">
                        <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>

                    <Button
                        variant="icon"
                        size="medium"
                        onClick={() => removeFromCart(item.id)}
                        aria-label={`Remove ${item.title} from cart`}
                    >
                        <Trash className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default CartItem;