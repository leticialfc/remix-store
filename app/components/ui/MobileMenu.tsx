import { useState, useEffect, useRef } from "react";
import { X } from "lucide-react";
import { Link } from "react-router";
import HeaderLogo from "../layout/header/HeaderLogo";

interface MobileMenuProps {
    isOpen: boolean;
    onClose: () => void;
}

const MobileMenu = ({ isOpen, onClose }: MobileMenuProps) => {
    const [isVisible, setIsVisible] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const closeButtonRef = useRef<HTMLButtonElement>(null);
    const lastFocusedElement = useRef<HTMLElement | null>(null);

    // Handle menu open/close animations
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

            // Return focus to the element that opened the menu
            if (lastFocusedElement.current) {
                lastFocusedElement.current.focus();
            }

            // Hide menu after animation
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

    // Trap focus within menu
    useEffect(() => {
        if (!isOpen || isAnimating) return;

        const handleTabKey = (event: KeyboardEvent) => {
            if (event.key !== 'Tab') return;

            const menu = menuRef.current;
            if (!menu) return;

            const focusableElements = menu.querySelectorAll(
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

    const navigationItems = [
        { name: "Home", path: "/" },
        { name: "Shop", path: "/shop" },
        { name: "About", path: "/about" },
        { name: "Contact", path: "/contact" },
        { name: "Blog", path: "/blog" }
    ];

    return (
        <div
            ref={menuRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="mobile-menu-title"
            className={`fixed inset-0 bg-white z-50 lg:hidden transition-all duration-300 ease-in-out ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
                }`}
        >
            {/* Header */}
            <div className="flex justify-between border-b border-gray-500 px-4 py-2">
                <HeaderLogo text={"The Online Store".toLocaleUpperCase()} />
                <button
                    ref={closeButtonRef}
                    onClick={onClose}
                    className={`p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300 transform ${isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
                        }`}
                    style={{ transitionDelay: '150ms' }}
                    aria-label="Close menu"
                >
                    <X className="h-6 w-6" aria-hidden="true" />
                </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-4">
                <nav className="space-y-8" aria-label="Mobile navigation">
                    {/* Main Navigation */}
                    <section>
                        <ul className="space-y-1">
                            {navigationItems.map((item, index) => (
                                <li
                                    key={item.name}
                                    className={`transform transition-all duration-300 ease-out ${isOpen
                                        ? 'translate-y-0 opacity-100'
                                        : 'translate-y-6 opacity-0'
                                        }`}
                                    style={{ transitionDelay: `${250 + index * 50}ms` }}
                                >
                                    <Link
                                        to={item.path}
                                        onClick={onClose}
                                        className="block p-4 rounded-xl hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors group"
                                    >
                                        <div className="font-semibold text-xl text-gray-900 group-hover:text-blue-600 transition-colors">
                                            {item.name}
                                        </div>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </section>
                </nav>
            </div>
        </div>
    );
};

export default MobileMenu;