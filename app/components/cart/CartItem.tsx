import { useCart } from "~/contexts/CartContext";
import type { Product } from "~/services/api.server";
import Button from "../common/Button";
import QuantityPicker from "../common/QuantityPicker";
import { Trash2 as Trash } from "lucide-react";
import ProductImage from "../product/ProductImage";

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
        <div className="flex space-x-4 pb-4 border-b">
            <ProductImage src={item.thumbnail} alt={item.title} size="small" />
            <div className="flex flex-col items-baseline justify-between w-full lg:w-fit">
                <div>
                    <h3 className="font-semibold">{item.title}</h3>
                    <p className="text-gray-600">${item.price.toFixed(2)}</p>
                </div>
                <div className="flex items-center w-full justify-between lg:justify-normal lg:space-x-2">
                    <QuantityPicker
                        quantity={item.quantity}
                        onQuantityChange={handleQuantityChange}
                        itemName={item.title}
                        size="small"
                    />
                    <Button
                        variant="icon"
                        size="medium"
                        onClick={() => removeFromCart(item.id)}
                        aria-label={`Remove ${item.title} from cart`}
                    >
                        <Trash className="h-5 w-5" />
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default CartItem;