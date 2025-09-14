import { ChevronDown } from "lucide-react";

interface DropdownTriggerProps {
    isOpen: boolean;
    onClick: () => void;
    onKeyDown: (event: React.KeyboardEvent) => void;
    displayText: string;
    title: string;
}

export default function DropdownTrigger({
    isOpen,
    onClick,
    onKeyDown,
    displayText,
    title,
}: DropdownTriggerProps) {
    return (
        <button
            type="button"
            onClick={onClick}
            onKeyDown={onKeyDown}
            className="inline-flex justify-between items-center w-full px-4 py-2 text-sm border border-gray-500 rounded-md hover:bg-stone-50"
            aria-expanded={isOpen}
            aria-haspopup="listbox"
            aria-label={`${title} options`}
        >
            <span>{displayText}</span>
            <ChevronDown
                className={`ml-2 h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                aria-hidden="true"
            />
        </button>
    );
}