import { Link } from "react-router";
import { Search, User, ShoppingCart, MenuIcon } from "lucide-react";
import { useCart } from "~/contexts/CartContext";

const actions = [
    { to: "/search", label: "Search", icon: Search, desktopOnly: true, mobileOnly: false },
    { to: "/account", label: "Account", icon: User, desktopOnly: true, mobileOnly: false },
    { to: "/cart", label: "Cart", icon: ShoppingCart, desktopOnly: true, mobileOnly: false },
    { to: "/menu", label: "Menu", icon: MenuIcon, desktopOnly: false, mobileOnly: true },
];

const HeaderActions = () => {
    const { totalItems } = useCart();

    return (
        <nav className="flex items-center gap-4" aria-label="secondary">
            <ul className="flex space-x-4">
                {actions.map(({ label, to, icon: Icon, desktopOnly, mobileOnly }) => (
                    <li key={label}>
                        <Link
                            to={to}
                            aria-label={label}
                            className={`relative ${desktopOnly ? "hidden lg:flex" : "flex lg:hidden"}`}
                        >
                            <Icon className={`${mobileOnly ? "h-6 w-6" : "h-5 w-5"}`} />
                            {label === "Cart" && totalItems > 0 && (
                                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                    {totalItems}
                                </span>
                            )}
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    )
}

export default HeaderActions;