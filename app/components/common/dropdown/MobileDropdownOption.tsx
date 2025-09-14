import { Check } from "lucide-react";

interface MobileDropdownOptionProps {
    option: { value: string; label: string };
    isSelected: boolean;
    mode: 'single' | 'multi';
    onSelect: (value: string) => void;
}

export default function MobileDropdownOption({
    option,
    isSelected,
    mode,
    onSelect,
}: MobileDropdownOptionProps) {
    if (mode === 'multi') {
        return (
            <div className={`flex items-center text-sm px-4 py-3 rounded-lg ${isSelected
                ? 'bg-stone-100 font-medium'
                : 'hover:bg-stone-50'
                }`}>
                <input
                    type="checkbox"
                    id={`mobile-option-${option.value}`}
                    checked={isSelected}
                    onChange={() => onSelect(option.value)}
                    className="h-5 w-5 border-gray-300 rounded"
                />
                <label
                    htmlFor={`mobile-option-${option.value}`}
                    className="ml-3 text-base text-gray-700 cursor-pointer rounded flex-1"
                >
                    {option.label}
                </label>
            </div>
        );
    }

    return (
        <button
            onClick={() => onSelect(option.value)}
            className={`block w-full px-4 py-3 text-left text-base rounded-lg transition-colors text-gray-700 ${isSelected
                ? 'bg-stone-100 font-medium'
                : 'hover:bg-stone-50'
                }`}
        >
            <div className="flex items-center justify-between">
                <span>{option.label}</span>
                {isSelected && <Check className="h-5 w-5 text-gray-700" />}
            </div>
        </button>
    );
}