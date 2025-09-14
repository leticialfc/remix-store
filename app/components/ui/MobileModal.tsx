import { useState, useEffect, useRef } from "react";
import { X } from "lucide-react";
import type { ReactNode } from "react";

interface MobileModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: ReactNode;
    className?: string;
}

const MobileModal = ({ isOpen, onClose, title, children, className = "" }: MobileModalProps) => {
    const [isVisible, setIsVisible] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);
    const modalRef = useRef<HTMLDivElement>(null);
    const closeButtonRef = useRef<HTMLButtonElement>(null);
    const lastFocusedElement = useRef<HTMLElement | null>(null);

    // Handle modal open/close animations
    useEffect(() => {
        if (isOpen) {
            setIsVisible(true);
            setIsAnimating(true);
            // Store the currently focused element
            lastFocusedElement.current = document.activeElement as HTMLElement;

            // Prevent body scroll
            document.body.style.overflow = 'hidden';

            // Focus the close button after animation
            setTimeout(() => {
                closeButtonRef.current?.focus();
                setIsAnimating(false);
            }, 300);
        } else {
            setIsAnimating(true);
            // Restore body scroll
            document.body.style.overflow = '';

            // Return focus to the element that opened the modal
            if (lastFocusedElement.current) {
                lastFocusedElement.current.focus();
            }

            // Hide modal after animation
            setTimeout(() => {
                setIsVisible(false);
                setIsAnimating(false);
            }, 300);
        }

        return () => {
            if (!isOpen) {
                document.body.style.overflow = '';
            }
        };
    }, [isOpen]);

    // Handle escape key
    useEffect(() => {
        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === 'Escape' && isOpen) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
        }

        return () => document.removeEventListener('keydown', handleEscape);
    }, [isOpen, onClose]);

    // Trap focus within modal
    useEffect(() => {
        if (!isOpen || isAnimating) return;

        const handleTabKey = (event: KeyboardEvent) => {
            if (event.key !== 'Tab') return;

            const modal = modalRef.current;
            if (!modal) return;

            const focusableElements = modal.querySelectorAll(
                'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
            );
            const firstElement = focusableElements[0] as HTMLElement;
            const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

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

        document.addEventListener('keydown', handleTabKey);
        return () => document.removeEventListener('keydown', handleTabKey);
    }, [isOpen, isAnimating]);

    if (!isVisible) return null;

    return (
        <>
            {/* Backdrop */}
            <div
                className={`fixed inset-0 bg-black z-40 lg:hidden transition-opacity duration-300 ease-in-out ${isOpen ? 'opacity-50' : 'opacity-0'
                    }`}
                onClick={onClose}
                aria-hidden="true"
            />

            {/* Modal */}
            <div
                ref={modalRef}
                role="dialog"
                aria-modal="true"
                aria-labelledby="modal-title"
                className={`fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-2xl z-50 lg:hidden transition-transform duration-300 ease-out max-h-[80vh] ${isOpen ? 'translate-y-0' : 'translate-y-full'
                    } ${className}`}
            >
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-white rounded-t-3xl">
                    <h2
                        id="modal-title"
                        className="text-xl font-bold text-gray-900"
                    >
                        {title}
                    </h2>
                    <button
                        ref={closeButtonRef}
                        onClick={onClose}
                        className="p-2 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                        aria-label={`Close ${title.toLowerCase()}`}
                    >
                        <X className="h-6 w-6" aria-hidden="true" />
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto">
                    {children}
                </div>
            </div>
        </>
    );
};

export default MobileModal;