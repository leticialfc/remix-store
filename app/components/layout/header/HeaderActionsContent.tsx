import { Link, useLocation } from "react-router";
import { Search, User } from "lucide-react";
import CartLink from "~/components/cart/CartLink";

const HeaderActionsContent = () => {
    const location = useLocation();

    return (
        <nav className="flex items-center gap-4" aria-label="User actions">
            <ul className="flex items-center space-x-2">
                <li className="flex">
                    <Link
                        to="/search"
                        aria-label="Search"
                        className={`p-1 focus:outline-none transition-colors border-b ${location.pathname !== '/search' ? 'border-transparent hover:border-gray-300' : ''}`}
                    >
                        <Search className="h-5 w-5" aria-hidden="true" />
                    </Link>
                </li>
                <li className="flex">
                    <Link
                        to="/account"
                        aria-label="Account"
                        className={`p-1 focus:outline-none transition-colors border-b ${location.pathname !== '/account' ? 'border-transparent hover:border-gray-300' : ''}`}
                    >
                        <User className="h-5 w-5" aria-hidden="true" />
                    </Link>
                </li>
                <li className="flex">
                    <CartLink />
                </li>
            </ul>
        </nav >
    );
};

export default HeaderActionsContent;