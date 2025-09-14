import DropdownOption from "./DropdownOption";

interface DropdownMenuProps {
    options: { value: string; label: string }[];
    title: string;
    mode: 'single' | 'multi';
    isOptionSelected: (value: string) => boolean;
    onSelect: (value: string) => void;
}

export default function DropdownMenu({
    options,
    title,
    mode,
    isOptionSelected,
    onSelect,
}: DropdownMenuProps) {
    return (
        <div
            className="absolute left-0 z-10 mt-2 w-full bg-white border border-gray-500 rounded-md shadow-lg"
            role="listbox"
            aria-label={`${title} options`}
        >
            <div className="p-2 space-y-1">
                {options.map((option) => (
                    <DropdownOption
                        key={option.value}
                        option={option}
                        isSelected={isOptionSelected(option.value)}
                        mode={mode}
                        onSelect={onSelect}
                    />
                ))}
            </div>
        </div>
    );
}