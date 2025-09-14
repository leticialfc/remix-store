interface DropdownOptionProps {
    option: { value: string; label: string };
    isSelected: boolean;
    mode: 'single' | 'multi';
    onSelect: (value: string) => void;
}

export default function DropdownOption({
    option,
    isSelected,
    mode,
    onSelect,
}: DropdownOptionProps) {
    if (mode === 'multi') {
        return (
            <div className={`flex items-center px-4 py-2 ${isSelected
                ? 'bg-stone-100 font-medium rounded-md'
                : 'hover:bg-stone-50'
                }`}>
                <input
                    type="checkbox"
                    id={`option-${option.value}`}
                    checked={isSelected}
                    onChange={() => onSelect(option.value)}
                    className="h-4 w-4 border-gray-300 rounded"
                />
                <label
                    htmlFor={`option-${option.value}`}
                    className="ml-3 text-sm text-gray-700 cursor-pointer flex-1"
                >
                    {option.label}
                </label>
            </div>
        );
    }

    return (
        <button
            onClick={() => onSelect(option.value)}
            className={`block w-full px-4 py-2 text-left text-sm rounded-md text-gray-700 ${isSelected
                ? 'bg-stone-100 font-medium'
                : 'hover:bg-stone-50'
                }`}
            role="option"
            aria-selected={isSelected}
        >
            {option.label}
        </button>
    );
}