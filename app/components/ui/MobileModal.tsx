import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
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
    const [hasDOM, setHasDOM] = useState(false);
    const modalRef = useRef<HTMLDivElement>(null);
    const closeButtonRef = useRef<HTMLButtonElement>(null);
    const lastFocusedElement = useRef<HTMLElement | null>(null);

    useEffect(() => setHasDOM(true), []);

    useEffect(() => {
        if (isOpen) {
            setIsVisible(true);
            setIsAnimating(true);
            lastFocusedElement.current = document.activeElement as HTMLElement;
            document.body.style.overflow = "hidden";
            const t = setTimeout(() => {
                closeButtonRef.current?.focus();
                setIsAnimating(false);
            }, 300);
            return () => clearTimeout(t);
        } else {
            setIsAnimating(true);
            document.body.style.overflow = "";
            lastFocusedElement.current?.focus?.();
            const t = setTimeout(() => {
                setIsVisible(false);
                setIsAnimating(false);
            }, 300);
            return () => clearTimeout(t);
        }
    }, [isOpen]);

    useEffect(() => {
        const onEsc = (e: KeyboardEvent) => e.key === "Escape" && isOpen && onClose();
        if (isOpen) document.addEventListener("keydown", onEsc);
        return () => document.removeEventListener("keydown", onEsc);
    }, [isOpen, onClose]);

    if (!hasDOM || !isVisible) return null;

    const node = (
        <div
            className={[
                "fixed inset-0 lg:hidden",
                isOpen ? "opacity-100 visible pointer-events-auto" : "opacity-0 invisible pointer-events-none",
                "transition-opacity duration-300 ease-in-out",
                "z-[1200]", // ⬅️ above everything
            ].join(" ")}
            id="mobile-modal-layer"
        >
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/50 z-[1200]"
                onMouseDown={(e) => {
                    if (e.target === e.currentTarget) onClose();
                }}
                aria-hidden="true"
            />

            {/* Sheet */}
            <div
                ref={modalRef}
                role="dialog"
                aria-modal="true"
                aria-labelledby="modal-title"
                onMouseDown={(e) => e.stopPropagation()}
                className={[
                    "absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-2xl",
                    "max-h-[80vh] flex flex-col",
                    "transition-transform duration-300 ease-out",
                    isOpen ? "translate-y-0" : "translate-y-full",
                    "z-[1201]",
                    className,
                ].join(" ")}
            >
                <div className="flex items-center justify-between p-5 border-b border-gray-500 rounded-t-3xl">
                    <h2 id="modal-title" className="text-md font-bold">
                        {title}
                    </h2>
                    <button
                        ref={closeButtonRef}
                        onClick={onClose}
                        className="p-2 rounded-full hover:bg-gray-100 focus:outline-none"
                        aria-label={`Close ${title.toLowerCase()}`}
                    >
                        <X className="h-6 w-6" aria-hidden="true" />
                    </button>
                </div>

                <div className="flex-1 p-5 overflow-y-auto">{children}</div>
            </div>
        </div>
    );

    return createPortal(node, document.body);
};

export default MobileModal;
