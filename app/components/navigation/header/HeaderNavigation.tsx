import { Link, useLocation } from "react-router";

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

const HeaderNavigation = ({ className = "" }: NavigationProps) => {
    const location = useLocation();

    return (
        <nav className={`flex ${className}`} aria-label="Primary navigation">
            <ul className="flex gap-8">
                {routes.map((route) => (
                    <li key={route.name} className={`${location.pathname === route.path ? 'border-b' : 'hover:border-b border-transparent hover:border-gray-300'} transition-colors`}>
                        <Link key={route.name} to={route.path}>{route.name}</Link>
                    </li>
                ))}
            </ul>
        </nav>
    )
}

export default HeaderNavigation;