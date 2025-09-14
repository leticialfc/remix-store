import { useState, useRef, useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";
import MobileModal from "./MobileModal";

interface DropdownOption {
    value: string;
    label: string;
}

interface BaseDropdownProps {
    options: DropdownOption[];
    title: string;
    className?: string;
}

interface SingleSelectDropdownProps extends BaseDropdownProps {
    mode: 'single';
    value: string;
    onChange: (value: string) => void;
}

interface MultiSelectDropdownProps extends BaseDropdownProps {
    mode: 'multi';
    selectedValues: string[];
    onChange: (values: string[]) => void;
    placeholder?: string;
}

type DropdownProps = SingleSelectDropdownProps | MultiSelectDropdownProps;

const Dropdown: React.FC<DropdownProps> = (props) => {
    const { options, title, className } = props;
    const [isOpen, setIsOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Determine display text based on mode
    const getDisplayText = () => {
        if (props.mode === 'single') {
            const selectedOption = options.find(option => option.value === props.value);
            return `${title}: ${selectedOption?.label || 'None'}`;
        } else {
            const selectedCount = props.selectedValues.length;
            if (selectedCount === 0) {
                return props.placeholder || `${title}: None`;
            } else if (selectedCount === 1) {
                const selectedOption = options.find(option => option.value === props.selectedValues[0]);
                return `${title}: ${selectedOption?.label}`;
            } else {
                return `${title}: ${selectedCount} selected`;
            }
        }
    };

    // Handle selection based on mode
    const handleSelection = (optionValue: string) => {
        if (props.mode === 'single') {
            props.onChange(optionValue);
            setIsOpen(false);
        } else {
            const isSelected = props.selectedValues.includes(optionValue);
            let newValues;

            if (isSelected) {
                newValues = props.selectedValues.filter(v => v !== optionValue);
            } else {
                newValues = [...props.selectedValues, optionValue];
            }

            props.onChange(newValues);
            // Don't close dropdown in multi-select mode to allow multiple selections
        }
    };

    // Check if an option is selected
    const isOptionSelected = (optionValue: string) => {
        if (props.mode === 'single') {
            return props.value === optionValue;
        } else {
            return props.selectedValues.includes(optionValue);
        }
    };

    // Mobile detection
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

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
        <>
            <div className={`relative inline-block text-left ${className}`} ref={dropdownRef}>
                <button
                    type="button"
                    onClick={() => setIsOpen(!isOpen)}
                    onKeyDown={handleKeyDown}
                    className="inline-flex justify-between items-center w-full px-4 py-2 text-sm text-gray-950 bg-white border border-gray-500 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    aria-expanded={isOpen}
                    aria-haspopup="listbox"
                    aria-label={`${title} options`}
                >
                    <span>{getDisplayText()}</span>
                    <ChevronDown
                        className={`ml-2 h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                        aria-hidden="true"
                    />
                </button>

                {/* Desktop Dropdown */}
                {!isMobile && isOpen && (
                    <div
                        className="absolute left-0 z-10 mt-2 w-full bg-white border border-gray-700 rounded-md shadow-lg"
                        role="listbox"
                        aria-label={`${title} options`}
                    >
                        <div className="py-1">
                            {options.map((option) => {
                                const isSelected = isOptionSelected(option.value);

                                return props.mode === 'multi' ? (
                                    // Multi-select with checkbox
                                    <div key={option.value} className="flex items-center px-4 py-2 hover:bg-gray-50">
                                        <input
                                            type="checkbox"
                                            id={`option-${option.value}`}
                                            checked={isSelected}
                                            onChange={() => handleSelection(option.value)}
                                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                        />
                                        <label
                                            htmlFor={`option-${option.value}`}
                                            className="ml-3 text-sm text-gray-700 cursor-pointer flex-1"
                                        >
                                            {option.label}
                                        </label>
                                    </div>
                                ) : (
                                    // Single-select button
                                    <button
                                        key={option.value}
                                        onClick={() => handleSelection(option.value)}
                                        className={`block w-full px-4 py-2 text-left text-sm hover:bg-gray-50 focus:bg-gray-100 focus:outline-none ${isSelected
                                            ? 'bg-gray-100 text-gray-950 font-medium'
                                            : 'text-gray-800'
                                            }`}
                                        role="option"
                                        aria-selected={isSelected}
                                    >
                                        {option.label}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>

            {/* Mobile Modal */}
            {isMobile && (
                <MobileModal
                    isOpen={isOpen}
                    onClose={() => setIsOpen(false)}
                    title={title}
                >
                    <div className="space-y-2">
                        {options.map((option) => {
                            const isSelected = isOptionSelected(option.value);

                            return props.mode === 'multi' ? (
                                // Multi-select with checkbox for mobile
                                <div key={option.value} className="flex items-center px-4 py-3 rounded-lg hover:bg-gray-50">
                                    <input
                                        type="checkbox"
                                        id={`mobile-option-${option.value}`}
                                        checked={isSelected}
                                        onChange={() => handleSelection(option.value)}
                                        className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                    />
                                    <label
                                        htmlFor={`mobile-option-${option.value}`}
                                        className="ml-3 text-base text-gray-700 cursor-pointer flex-1"
                                    >
                                        {option.label}
                                    </label>
                                </div>
                            ) : (
                                // Single-select button for mobile
                                <button
                                    key={option.value}
                                    onClick={() => handleSelection(option.value)}
                                    className={`block w-full px-4 py-3 text-left text-base rounded-lg transition-colors ${isSelected
                                        ? 'bg-blue-50 text-blue-700 font-medium border border-blue-200'
                                        : 'text-gray-700 hover:bg-gray-50'
                                        }`}
                                >
                                    <div className="flex items-center justify-between">
                                        <span>{option.label}</span>
                                        {isSelected && <Check className="h-5 w-5 text-blue-600" />}
                                    </div>
                                </button>
                            );
                        })}

                        {/* Close button for multi-select mode */}
                        {props.mode === 'multi' && (
                            <div className="pt-4 border-t">
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                                >
                                    Done
                                </button>
                            </div>
                        )}
                    </div>
                </MobileModal>
            )}
        </>
    );
};

export default Dropdown;