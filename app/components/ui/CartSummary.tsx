import { useState } from "react";
import Button from "./Button";

interface CartSummaryProps {
    subtotal: number;
    shipping?: number;
    onCheckout: () => void;
    className?: string;
}

const CartSummary = ({
    subtotal,
    shipping = 20.00,
    onCheckout,
    className = ""
}: CartSummaryProps) => {
    const [promoCode, setPromoCode] = useState("");
    const [isPromoApplied, setIsPromoApplied] = useState(false);
    const [promoDiscount, setPromoDiscount] = useState(0);

    const total = subtotal + shipping - promoDiscount;

    const handleApplyPromo = () => {
        // Mock promo code logic
        if (promoCode.toLowerCase() === "save10") {
            setPromoDiscount(subtotal * 0.1);
            setIsPromoApplied(true);
        } else if (promoCode.toLowerCase() === "freeship") {
            setPromoDiscount(shipping);
            setIsPromoApplied(true);
        } else {
            alert("Invalid promo code");
        }
    };

    const handlePromoKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            if (promoCode.trim() && !isPromoApplied) {
                handleApplyPromo();
            }
        }
    };

    const handlePayPal = () => {
        alert("PayPal checkout");
    };

    return (
        <div className={`border border-gray-700 rounded-2xl p-6 ${className}`}>
            {/* Header */}
            <div className="mb-6">
                <h2 className="text-xl font-bold text-gray-900 mb-1">Cart Summary</h2>
            </div>

            {/* Price Breakdown */}
            <div className="space-y-2 mb-6">
                <div className="flex justify-between items-center text-gray-700">
                    <span className="text-sm">Subtotal</span>
                    <span className="text-sm font-medium">${subtotal.toFixed(2)}</span>
                </div>

                <div className="flex justify-between items-center text-gray-700">
                    <span className="text-sm">Shipping</span>
                    <span className="text-sm font-medium">
                        {promoDiscount === shipping ? (
                            <span>
                                <span className="line-through text-gray-400">${shipping.toFixed(2)}</span>
                                <span className="ml-2 text-green-600">FREE</span>
                            </span>
                        ) : (
                            `$${shipping.toFixed(2)}`
                        )}
                    </span>
                </div>

                {promoDiscount > 0 && promoDiscount !== shipping && (
                    <div className="flex justify-between items-center text-green-600">
                        <span className="text-sm">Discount</span>
                        <span className="text-sm font-medium">-${promoDiscount.toFixed(2)}</span>
                    </div>
                )}

                <div className="flex justify-between items-center">
                    <span className="text-md font-bold text-gray-700">Total</span>
                    <span className="text-md font-bold text-gray-700">${total.toFixed(2)}</span>
                </div>
            </div>

            {/* Checkout Button */}
            <div className="space-y-4 mb-6">
                <Button
                    onClick={onCheckout}
                    variant="primary"
                    fullWidth
                    radius="large"
                    aria-label={`Checkout with total of $${total.toFixed(2)}`}
                >
                    Check out
                </Button>

                {/* PayPal Option */}
                <div className="text-center text-sm">
                    <button
                        onClick={handlePayPal}
                        className="text-gray-600 hover:text-gray-800 font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded"
                    >
                        Or pay with PayPal
                    </button>
                </div>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-300 pt-4 text-sm">
                {/* Promo Code Section */}
                <div>
                    <label htmlFor="promo-code" className="block font-medium text-gray-900 mb-2">
                        Promo code
                    </label>
                    <div className="w-full flex justify-between gap-4">
                        <input
                            id="promo-code"
                            type="text"
                            value={promoCode}
                            onChange={(e) => setPromoCode(e.target.value)}
                            onKeyDown={handlePromoKeyDown}
                            placeholder="Enter code"
                            disabled={isPromoApplied}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:text-gray-500"
                        />
                        <Button
                            onClick={handleApplyPromo}
                            disabled={!promoCode.trim() || isPromoApplied}
                            variant="primary"
                            size="small"
                        >
                            Apply
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartSummary;