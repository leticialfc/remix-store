import { useState, useEffect, useRef } from "react";

interface UseMobileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const useMobileModal = ({ isOpen, onClose }: UseMobileModalProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasDOM, setHasDOM] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const lastFocusedElement = useRef<HTMLElement | null>(null);

  // DOM availability check
  useEffect(() => setHasDOM(true), []);

  // Handle modal open/close animations and focus management
  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      lastFocusedElement.current = document.activeElement as HTMLElement;
      document.body.style.overflow = "hidden";

      const focusTimeout = setTimeout(() => {
        closeButtonRef.current?.focus();
      }, 300);

      return () => clearTimeout(focusTimeout);
    } else {
      document.body.style.overflow = "";
      lastFocusedElement.current?.focus?.();

      const hideTimeout = setTimeout(() => {
        setIsVisible(false);
      }, 300);

      return () => clearTimeout(hideTimeout);
    }
  }, [isOpen]);

  // Escape key handling
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  // Backdrop click handler
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Prevent event propagation on modal content
  const handleModalClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return {
    isVisible,
    hasDOM,
    modalRef,
    closeButtonRef,
    handleBackdropClick,
    handleModalClick,
  };
};
