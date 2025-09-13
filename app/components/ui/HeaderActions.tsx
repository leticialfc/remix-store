import { Link } from "react-router";
import { Search, User, ShoppingCart, MenuIcon } from "lucide-react";

const actions = [
    { to: "/search", label: "Search", icon: Search, desktopOnly: true, mobileOnly: false },
    { to: "/account", label: "Account", icon: User, desktopOnly: true, mobileOnly: false },
    { to: "/cart", label: "Cart", icon: ShoppingCart, desktopOnly: true, mobileOnly: false },
    { to: "/menu", label: "Menu", icon: MenuIcon, desktopOnly: false, mobileOnly: true },
];

const HeaderActions = () => {
    return (
        <nav className="flex items-center gap-4" aria-label="secondary">
            <ul className="flex space-x-4">
                {actions.map(({ label, to, icon: Icon, desktopOnly, mobileOnly }) => (
                    <li key={label}>
                        <Link
                            to={to}
                            aria-label={label}
                            className={`${desktopOnly ? "hidden lg:flex" : "flex lg:hidden"}`}
                        >
                            <Icon className={`${mobileOnly ? "h-6 w-6" : "h-4 w-4"}`} />
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    )
}

export default HeaderActions;