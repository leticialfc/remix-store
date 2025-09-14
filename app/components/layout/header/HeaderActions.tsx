import { useState } from "react";
import { Link } from "react-router";
import { Search, User, Menu } from "lucide-react";
import MobileMenu from "~/components/ui/MobileMenu";
import CartLink from "~/components/cart/CartLink";

const HeaderActions = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const openMobileMenu = () => setIsMobileMenuOpen(true);
    const closeMobileMenu = () => setIsMobileMenuOpen(false);

    return (
        <>
            <nav className="flex items-center gap-4" aria-label="User actions">
                {/* Desktop Actions */}
                <ul className="flex space-x-2">
                    <li className="flex">
                        <Link
                            to="/search"
                            aria-label="Search"
                            className="p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-lg transition-colors"
                        >
                            <Search className="h-5 w-5" aria-hidden="true" />
                        </Link>
                    </li>
                    <li className="flex">
                        <Link
                            to="/account"
                            aria-label="Account"
                            className="p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-lg transition-colors"
                        >
                            <User className="h-5 w-5" aria-hidden="true" />
                        </Link>
                    </li>
                    <li className="flex">
                        <CartLink />
                    </li>
                </ul>

                {/* Mobile Menu Trigger */}
                <div className="lg:hidden" role="navigation" aria-label="Mobile menu">
                    <button
                        onClick={openMobileMenu}
                        aria-label="Open navigation menu"
                        aria-expanded={isMobileMenuOpen}
                        aria-controls="mobile-menu"
                        className="p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-lg transition-colors"
                    >
                        <Menu className="h-6 w-6" aria-hidden="true" />
                    </button>
                </div>
            </nav>

            {/* Mobile Menu */}
            <MobileMenu
                isOpen={isMobileMenuOpen}
                onClose={closeMobileMenu}
            />
        </>
    )
}

export default HeaderActions;