import { Link } from "react-router";
import { Search, User } from "lucide-react";
import CartLink from "~/components/cart/CartLink";

interface HeaderActionsContentProps {
    showMobileMenu?: boolean;
}

const HeaderActionsContent = ({ showMobileMenu = false }: HeaderActionsContentProps) => {
    return (
        <nav className="flex items-center gap-4" aria-label="User actions">
            <ul className="flex items-center space-x-2">
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
        </nav>
    );
};

export default HeaderActionsContent;