import { Link } from "react-router";

const routes = [
    { name: "Home", path: "/" },
    { name: "Shop", path: "/shop" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
    { name: "Blog", path: "/blog" }
];

const Navigation = () => {
    return (
        <nav className="hidden lg:flex" aria-label="primary">
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