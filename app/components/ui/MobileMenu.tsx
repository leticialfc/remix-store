import { useMobileMenu } from "~/hooks/useMobileMenu";
import MobileMenuHeader from "./MobileMenuHeader";
import MobileNavigation from "./mobile/MobileNavigation";

interface MobileMenuProps {
    isOpen: boolean;
    onClose: () => void;
}

const MobileMenu = ({ isOpen, onClose }: MobileMenuProps) => {
    const { isVisible, menuRef } = useMobileMenu({ isOpen, onClose });

    if (!isVisible) return null;

    return (
        <div
            ref={menuRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="mobile-menu-title"
            className={`fixed inset-0 bg-white z-50 lg:hidden transition-all duration-300 ease-in-out ${
                isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
            }`}
        >
            <MobileMenuHeader isOpen={isOpen} onClose={onClose} />
            <MobileNavigation isOpen={isOpen} onClose={onClose} />
        </div>
    );
};

export default MobileMenu;