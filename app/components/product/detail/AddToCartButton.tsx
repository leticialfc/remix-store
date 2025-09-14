import { useCart } from '~/contexts/CartContext';
import type { Product } from '~/services/api.server';
import Button from '~/components/common/Button';
import type { ComponentProps } from 'react';

interface AddToCartButtonProps extends Omit<ComponentProps<typeof Button>, 'onClick' | 'children'> {
    product: Product;
    text?: string;
}

export default function AddToCartButton({
    product,
    text = "Add to Cart",
    ...buttonProps
}: AddToCartButtonProps) {
    const { addToCart } = useCart();

    const handleAddToCart = () => {
        addToCart(product);
    };

    return (
        <Button onClick={handleAddToCart} {...buttonProps}>
            {text}
        </Button>
    );
}