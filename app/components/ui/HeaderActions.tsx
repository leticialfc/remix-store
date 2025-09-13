import { Link } from "react-router";
import { Search, User, ShoppingCart, MenuIcon } from "lucide-react";

const actions = [
    { to: "/search", label: "Search", icon: Search, desktopOnly: true },
    { to: "/account", label: "Account", icon: User, desktopOnly: true },
    { to: "/cart", label: "Cart", icon: ShoppingCart, desktopOnly: true },
    { to: "/menu", label: "Menu", icon: MenuIcon, desktopOnly: false },
];

const HeaderActions = () => {
    return (
        <nav className="flex items-center gap-4" aria-label="secondary">
            <ul className="flex space-x-4">
                {actions.map(({ label, to, icon: Icon, desktopOnly }) => (
                    <li key={label}>
                        <Link
                            to={to}
                            aria-label={label}
                            className={`${desktopOnly ? "hidden lg:flex" : "flex lg:hidden"}`}
                        >
                            <Icon className="h-4 w-4" />
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    )
}

export default HeaderActions;