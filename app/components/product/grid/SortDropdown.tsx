import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

interface SortOption {
    value: string;
    label: string;
}

interface SortDropdownProps {
    options: SortOption[];
    value: string;
    onChange: (value: string) => void;
    className?: string;
}

const SortDropdown = ({ options, value, onChange, className = "" }: SortDropdownProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const selectedOption = options.find(option => option.value === value);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleKeyDown = (event: React.KeyboardEvent) => {
        if (event.key === 'Escape') {
            setIsOpen(false);
        }
    };

    return (
        <div className={`relative inline-block text-left ${className}`} ref={dropdownRef}>
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                onKeyDown={handleKeyDown}
                className="inline-flex justify-between items-center w-full px-4 py-2 text-sm text-gray-950 bg-white border border-gray-500 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                aria-expanded={isOpen}
                aria-haspopup="listbox"
                aria-label="Sort products"
            >
                <span>Sort by: {selectedOption?.label}</span>
                <ChevronDown
                    className={`ml-2 h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                    aria-hidden="true"
                />
            </button>

            {isOpen && (
                <div
                    className="absolute left-0 z-10 mt-2 w-full bg-white border border-gray-700 rounded-md shadow-lg"
                    role="listbox"
                    aria-label="Sort options"
                >
                    <div className="py-1">
                        {options.map((option) => (
                            <button
                                key={option.value}
                                onClick={() => {
                                    onChange(option.value);
                                    setIsOpen(false);
                                }}
                                className={`block w-full px-4 py-2 text-left text-sm hover:bg-gray-50 focus:bg-gray-100 focus:outline-none ${value === option.value
                                    ? 'bg-gray-100 text-gray-950 font-medium'
                                    : 'text-gray-800'
                                    }`}
                                role="option"
                                aria-selected={value === option.value}
                            >
                                {option.label}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default SortDropdown;