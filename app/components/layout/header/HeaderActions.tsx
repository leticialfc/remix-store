import { useState } from "react";
import { Link } from "react-router";
import { Search, User, ShoppingCart, Menu } from "lucide-react";
import { useCart } from "~/contexts/CartContext";
import MobileMenu from "~/components/ui/MobileMenu";

const HeaderActions = () => {
    const { totalItems } = useCart();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const openMobileMenu = () => setIsMobileMenuOpen(true);
    const closeMobileMenu = () => setIsMobileMenuOpen(false);

    return (
        <>
            <nav className="flex items-center gap-4" aria-label="User actions">
                {/* Desktop Actions */}
                <ul className="hidden lg:flex space-x-4">
                    <li>
                        <Link
                            to="/search"
                            aria-label="Search"
                            className="p-2 text-gray-600 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-lg transition-colors"
                        >
                            <Search className="h-5 w-5" aria-hidden="true" />
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/account"
                            aria-label="Account"
                            className="p-2 text-gray-600 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-lg transition-colors"
                        >
                            <User className="h-5 w-5" aria-hidden="true" />
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/cart"
                            aria-label={`Shopping cart with ${totalItems} items`}
                            className="relative p-2 text-gray-600 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-lg transition-colors"
                        >
                            <ShoppingCart className="h-5 w-5" aria-hidden="true" />
                            {totalItems > 0 && (
                                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                                    {totalItems > 99 ? '99+' : totalItems}
                                </span>
                            )}
                        </Link>
                    </li>
                </ul>

                {/* Mobile Menu Trigger */}
                <div className="lg:hidden" role="navigation" aria-label="Mobile menu">
                    <button
                        onClick={openMobileMenu}
                        aria-label="Open navigation menu"
                        aria-expanded={isMobileMenuOpen}
                        aria-controls="mobile-menu"
                        className="p-2 text-gray-600 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-lg transition-colors"
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