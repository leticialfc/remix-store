import MobileModal from "~/components/modal/MobileModal";
import MobileDropdownOption from "./MobileDropdownOption";

interface MobileDropdownContentProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    options: { value: string; label: string }[];
    mode: 'single' | 'multi';
    isOptionSelected: (value: string) => boolean;
    onSelect: (value: string) => void;
}

export default function MobileDropdownContent({
    isOpen,
    onClose,
    title,
    options,
    mode,
    isOptionSelected,
    onSelect,
}: MobileDropdownContentProps) {
    return (
        <MobileModal
            isOpen={isOpen}
            onClose={onClose}
            title={title}
        >
            <div className="space-y-2">
                {options.map((option) => (
                    <MobileDropdownOption
                        key={option.value}
                        option={option}
                        isSelected={isOptionSelected(option.value)}
                        mode={mode}
                        onSelect={onSelect}
                    />
                ))}
            </div>
        </MobileModal>
    );
}