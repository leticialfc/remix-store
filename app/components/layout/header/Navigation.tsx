import { Link } from "react-router";
import { isSelected } from "~/utils/isSelected";

interface NavigationProps {
    className?: string;
}

const routes = [
    { name: "Home", path: "/" },
    { name: "Shop", path: "/shop" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
    { name: "Blog", path: "/blog" }
];

const Navigation = ({ className = "" }: NavigationProps) => {
    return (
        <nav className={`flex ${className}`} aria-label="Primary navigation">
            <ul className="flex gap-8">
                {routes.map((route) => (
                    <li key={route.name} className={`rounded-md px-4 py-2 ${isSelected(route.path) ? 'bg-gray-100' : ''}`}>
                        <Link key={route.name} to={route.path}>{route.name}</Link>
                    </li>
                ))}
            </ul>
        </nav>
    )
}

export default Navigation;