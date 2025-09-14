import { useState } from "react";
import { Menu } from "lucide-react";
import MobileMenu from "~/components/ui/MobileMenu";
import CartLink from "~/components/cart/CartLink";
import HeaderActionsContent from "./HeaderActionsContent";

const HeaderActions = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const openMobileMenu = () => setIsMobileMenuOpen(true);
    const closeMobileMenu = () => setIsMobileMenuOpen(false);

    return (
        <>
            {/* Desktop Actions */}
            <div className="hidden lg:block">
                <HeaderActionsContent />
            </div>

            {/* Mobile Actions */}
            <div className="lg:hidden flex items-center gap-4">
                <HeaderActionsContent />
                <button
                    onClick={openMobileMenu}
                    aria-label="Open navigation menu"
                    aria-expanded={isMobileMenuOpen}
                    aria-controls="mobile-menu"
                    className="p-2 focus:outline-none rounded-lg transition-colors"
                >
                    <Menu className="h-6 w-6" aria-hidden="true" />
                </button>
            </div>

            {/* Mobile Menu */}
            <MobileMenu
                isOpen={isMobileMenuOpen}
                onClose={closeMobileMenu}
            />
        </>
    )
}

export default HeaderActions;