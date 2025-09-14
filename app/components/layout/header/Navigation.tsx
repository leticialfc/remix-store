import { Link } from "react-router";

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
            <ul className="flex gap-10">
                {routes.map((route) => (
                    <li key={route.name}>
                        <Link key={route.name} to={route.path}>{route.name}</Link>
                    </li>
                ))}
            </ul>
        </nav>
    )
}

export default Navigation;