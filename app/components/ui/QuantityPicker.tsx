import { Minus, Plus } from "lucide-react";

interface QuantityPickerProps {
    quantity: number;
    onQuantityChange: (newQuantity: number) => void;
    min?: number;
    max?: number;
    itemName?: string; // For accessibility labels
    className?: string;
}

const QuantityPicker = ({
    quantity,
    onQuantityChange,
    min = 1,
    max = 99,
    itemName = "item",
    className = ""
}: QuantityPickerProps) => {
    const handleDecrease = () => {
        const newQuantity = Math.max(min, quantity - 1);
        onQuantityChange(newQuantity);
    };

    const handleIncrease = () => {
        const newQuantity = Math.min(max, quantity + 1);
        onQuantityChange(newQuantity);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value) || min;
        const newQuantity = Math.max(min, Math.min(max, value));
        onQuantityChange(newQuantity);
    };

    return (
        <div className={`flex items-center space-x-2 ${className}`}>
            <button
                onClick={handleDecrease}
                disabled={quantity <= min}
                className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                aria-label={`Decrease quantity of ${itemName}`}
            >
                <Minus className="h-4 w-4" />
            </button>

            <input
                type="number"
                value={quantity}
                onChange={handleInputChange}
                min={min}
                max={max}
                className="w-12 text-center font-medium border border-gray-300 rounded px-1 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                aria-label={`Quantity of ${itemName}`}
            />

            <button
                onClick={handleIncrease}
                disabled={quantity >= max}
                className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                aria-label={`Increase quantity of ${itemName}`}
            >
                <Plus className="h-4 w-4" />
            </button>
        </div>
    );
};

export default QuantityPicker;