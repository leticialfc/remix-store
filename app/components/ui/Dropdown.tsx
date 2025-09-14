import { useDropdown } from "~/hooks/useDropdown";
import DropdownTrigger from "./dropdown/DropdownTrigger";
import DropdownMenu from "./dropdown/DropdownMenu";
import MobileDropdownContent from "./dropdown/MobileDropdownContent";

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
    const {
        isOpen,
        setIsOpen,
        isMobile,
        dropdownRef,
        getDisplayText,
        handleSelection,
        isOptionSelected,
        handleKeyDown,
    } = useDropdown(props);

    return (
        <>
            <div className={`relative inline-block text-left ${className}`} ref={dropdownRef}>
                <DropdownTrigger
                    isOpen={isOpen}
                    onClick={() => setIsOpen(!isOpen)}
                    onKeyDown={handleKeyDown}
                    displayText={getDisplayText()}
                    title={title}
                />

                {/* Desktop Dropdown */}
                {!isMobile && isOpen && (
                    <DropdownMenu
                        options={options}
                        title={title}
                        mode={props.mode}
                        isOptionSelected={isOptionSelected}
                        onSelect={handleSelection}
                    />
                )}
            </div>

            {/* Mobile Modal */}
            {isMobile && (
                <MobileDropdownContent
                    isOpen={isOpen}
                    onClose={() => setIsOpen(false)}
                    title={title}
                    options={options}
                    mode={props.mode}
                    isOptionSelected={isOptionSelected}
                    onSelect={handleSelection}
                />
            )}
        </>
    );
};

export default Dropdown;