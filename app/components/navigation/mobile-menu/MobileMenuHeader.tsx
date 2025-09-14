import { useRef, useEffect } from "react";
import { X } from "lucide-react";
import HeaderLogo from "../header/HeaderLogo";
import HeaderNavigation from "../header/HeaderNavigation";
import HeaderActionsContent from "../header/HeaderActionsContent";

interface MobileMenuHeaderProps {
    isOpen: boolean;
    onClose: () => void;
}

const MobileMenuHeader = ({ isOpen, onClose }: MobileMenuHeaderProps) => {
    const closeButtonRef = useRef<HTMLButtonElement>(null);

    // Focus the close button when menu opens
    useEffect(() => {
        if (isOpen) {
            setTimeout(() => {
                closeButtonRef.current?.focus();
            }, 300);
        }
    }, [isOpen]);

    return (
        <header className="border-b border-gray-500 px-4 py-3 lg:px-14">
            <div className="max-w-screen-2xl mx-auto">
                <div className="w-full flex items-center justify-between">
                    <HeaderLogo text={"The Online Store".toLocaleUpperCase()} />

                    <div className="flex items-center gap-4">
                        <HeaderActionsContent />
                        <button
                            ref={closeButtonRef}
                            onClick={onClose}
                            aria-label="Close navigation menu"
                            className="p-2 focus:outline-none  rounded-lg transition-colors"
                        >
                            <X className="h-6 w-6" aria-hidden="true" />
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default MobileMenuHeader;