import { useState, useEffect, useRef } from "react";

interface UseMobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export const useMobileMenu = ({ isOpen, onClose }: UseMobileMenuProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const lastFocusedElement = useRef<HTMLElement | null>(null);

  // Handle menu open/close animations and body scroll
  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      setIsAnimating(true);
      // Store the currently focused element
      lastFocusedElement.current = document.activeElement as HTMLElement;

      // Prevent body scroll
      document.body.style.overflow = "hidden";

      // Animation timing
      const animationTimer = setTimeout(() => {
        setIsAnimating(false);
      }, 300);

      return () => clearTimeout(animationTimer);
    } else {
      setIsAnimating(true);
      // Restore body scroll
      document.body.style.overflow = "";

      // Return focus to the element that opened the menu
      if (lastFocusedElement.current) {
        lastFocusedElement.current.focus();
      }

      // Hide menu after animation
      const hideTimer = setTimeout(() => {
        setIsVisible(false);
        setIsAnimating(false);
      }, 300);

      return () => clearTimeout(hideTimer);
    }
  }, [isOpen]);

  // Cleanup body scroll on unmount
  useEffect(() => {
    return () => {
      if (!isOpen) {
        document.body.style.overflow = "";
      }
    };
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  // Trap focus within menu
  useEffect(() => {
    if (!isOpen || isAnimating) return;

    const handleTabKey = (event: KeyboardEvent) => {
      if (event.key !== "Tab") return;

      const menu = menuRef.current;
      if (!menu) return;

      const focusableElements = menu.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const firstElement = focusableElements[0] as HTMLElement;
      const lastElement = focusableElements[
        focusableElements.length - 1
      ] as HTMLElement;

      if (event.shiftKey) {
        if (document.activeElement === firstElement) {
          event.preventDefault();
          lastElement.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          event.preventDefault();
          firstElement.focus();
        }
      }
    };

    document.addEventListener("keydown", handleTabKey);
    return () => document.removeEventListener("keydown", handleTabKey);
  }, [isOpen, isAnimating]);

  return {
    isVisible,
    isAnimating,
    menuRef,
  };
};
