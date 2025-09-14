import { Minus, Plus } from "lucide-react";
import { useState, useEffect } from "react";

interface QuantityPickerProps {
    quantity: number;
    onQuantityChange: (newQuantity: number) => void;
    min?: number;
    max?: number;
    itemName?: string;
    className?: string;
    size?: 'small' | 'medium' | 'large';
}

const QuantityPicker = ({
    quantity,
    onQuantityChange,
    min = 1,
    max = 99,
    itemName = "item",
    className = "",
    size = 'medium'
}: QuantityPickerProps) => {
    const [inputValue, setInputValue] = useState(quantity.toString());

    // Sync input value when quantity prop changes
    useEffect(() => {
        setInputValue(quantity.toString());
    }, [quantity]);

    const handleDecrease = () => {
        const newQuantity = Math.max(min, quantity - 1);
        if (newQuantity !== quantity) {
            onQuantityChange(newQuantity);
        }
    };

    const handleIncrease = () => {
        const newQuantity = Math.min(max, quantity + 1);
        if (newQuantity !== quantity) {
            onQuantityChange(newQuantity);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setInputValue(value);

        // Only update if it's a valid number
        const numericValue = parseInt(value);
        if (!isNaN(numericValue)) {
            const clampedValue = Math.max(min, Math.min(max, numericValue));
            if (clampedValue !== quantity) {
                onQuantityChange(clampedValue);
            }
        }
    };

    const handleInputBlur = () => {
        // Ensure input shows correct value on blur
        setInputValue(quantity.toString());
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        // Allow: backspace, delete, tab, escape, enter
        if ([8, 9, 27, 13, 46].indexOf(e.keyCode) !== -1 ||
            // Allow: Ctrl+A, Ctrl+C, Ctrl+V, Ctrl+X
            (e.keyCode === 65 && e.ctrlKey === true) ||
            (e.keyCode === 67 && e.ctrlKey === true) ||
            (e.keyCode === 86 && e.ctrlKey === true) ||
            (e.keyCode === 88 && e.ctrlKey === true)) {
            return;
        }
        // Ensure that it is a number and stop the keypress
        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
            e.preventDefault();
        }
    };

    const getSizeClasses = () => {
        switch (size) {
            case 'small':
                return {
                    container: 'h-8',
                    button: 'px-2',
                    input: 'px-2 text-sm',
                    icon: 'h-3 w-3'
                };
            case 'large':
                return {
                    container: 'h-12',
                    button: 'px-4',
                    input: 'px-4 text-lg',
                    icon: 'h-5 w-5'
                };
            case 'medium':
            default:
                return {
                    container: 'h-10',
                    button: 'px-3',
                    input: 'px-3',
                    icon: 'h-4 w-4'
                };
        }
    };

    const sizeClasses = getSizeClasses();
    const isAtMin = quantity <= min;
    const isAtMax = quantity >= max;

    return (
        <div
            className={`
                inline-flex items-center 
                bg-white border border-gray-500 
                rounded-md overflow-hidden
                text-sm text-gray-950 hover:bg-gray-50 focus:outline-none 
                transition-all duration-200
                ${sizeClasses.container}
                ${className}
            `}
            role="group"
            aria-label={`Quantity selector for ${itemName}`}
        >
            {/* Decrease Button */}
            <button
                type="button"
                onClick={handleDecrease}
                disabled={isAtMin}
                className={`
                    flex items-center justify-center
                    text-gray-700 hover:text-gray-900 hover:bg-gray-50
                    disabled:text-gray-300 disabled:cursor-not-allowed disabled:hover:bg-transparent
                    transition-colors duration-150
                    focus:outline-none focus:bg-gray-100
                    ${sizeClasses.button}
                `}
                aria-label={`Decrease quantity of ${itemName}`}
                tabIndex={0}
            >
                <Minus className={sizeClasses.icon} strokeWidth={2.5} />
            </button>

            {/* Quantity Input */}
            <input
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                value={inputValue}
                onChange={handleInputChange}
                onBlur={handleInputBlur}
                onKeyDown={handleKeyDown}
                min={min}
                max={max}
                className={`
                    text-center font-semibold text-gray-900
                    bg-transparent border-0 
                    focus:outline-none
                    max-w-10
                    ${sizeClasses.input}
                `}
                aria-label={`Quantity of ${itemName}, current value ${quantity}`}
                aria-describedby={`quantity-range-${itemName}`}
            />

            {/* Hidden description for screen readers */}
            <span
                id={`quantity-range-${itemName}`}
                className="sr-only"
            >
                Minimum {min}, maximum {max}
            </span>

            {/* Increase Button */}
            <button
                type="button"
                onClick={handleIncrease}
                disabled={isAtMax}
                className={`
                    flex items-center justify-center
                    text-gray-700 hover:text-gray-900 hover:bg-gray-50
                    disabled:text-gray-300 disabled:cursor-not-allowed disabled:hover:bg-transparent
                    transition-colors duration-150
                    focus:outline-none focus:bg-gray-100
                    ${sizeClasses.button}
                `}
                aria-label={`Increase quantity of ${itemName}`}
                tabIndex={0}
            >
                <Plus className={sizeClasses.icon} strokeWidth={2.5} />
            </button>
        </div>
    );
};

export default QuantityPicker;