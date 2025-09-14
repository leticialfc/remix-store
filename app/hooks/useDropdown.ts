import { useState, useRef, useEffect } from "react";

interface DropdownOption {
  value: string;
  label: string;
}

interface BaseDropdownProps {
  options: DropdownOption[];
  title: string;
}

interface SingleSelectDropdownProps extends BaseDropdownProps {
  mode: "single";
  value: string;
  onChange: (value: string) => void;
}

interface MultiSelectDropdownProps extends BaseDropdownProps {
  mode: "multi";
  selectedValues: string[];
  onChange: (values: string[]) => void;
  placeholder?: string;
}

type DropdownProps = SingleSelectDropdownProps | MultiSelectDropdownProps;

export const useDropdown = (props: DropdownProps) => {
  const { options, title } = props;
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Determine display text based on mode
  const getDisplayText = () => {
    if (props.mode === "single") {
      const selectedOption = options.find(
        (option) => option.value === props.value
      );
      return `${title}: ${selectedOption?.label || "None"}`;
    } else {
      const selectedCount = props.selectedValues.length;
      if (selectedCount === 0) {
        return props.placeholder || `${title}: None`;
      } else if (selectedCount === 1) {
        const selectedOption = options.find(
          (option) => option.value === props.selectedValues[0]
        );
        return `${title}: ${selectedOption?.label}`;
      } else {
        return `${title}: ${selectedCount} selected`;
      }
    }
  };

  // Handle selection based on mode
  const handleSelection = (optionValue: string) => {
    if (props.mode === "single") {
      props.onChange(optionValue);
      setIsOpen(false);
    } else {
      const isSelected = props.selectedValues.includes(optionValue);
      let newValues;

      if (isSelected) {
        newValues = props.selectedValues.filter((v) => v !== optionValue);
      } else {
        newValues = [...props.selectedValues, optionValue];
      }

      props.onChange(newValues);
      // Don't close dropdown in multi-select mode to allow multiple selections
    }
  };

  // Check if an option is selected
  const isOptionSelected = (optionValue: string) => {
    if (props.mode === "single") {
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
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Keyboard handling
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Escape") {
      setIsOpen(false);
    }
  };

  return {
    isOpen,
    setIsOpen,
    isMobile,
    dropdownRef,
    getDisplayText,
    handleSelection,
    isOptionSelected,
    handleKeyDown,
  };
};
