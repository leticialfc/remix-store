import { Link, useLocation } from "react-router";

interface NavigationItem {
    name: string;
    path: string;
}

interface MobileNavigationItemProps {
    item: NavigationItem;
    index: number;
    isOpen: boolean;
    onClose: () => void;
}

export default function MobileNavigationItem({
    item,
    index,
    isOpen,
    onClose
}: MobileNavigationItemProps) {
    const location = useLocation();

    return (
        <li
            className={`transform transition-all duration-300 ease-out ${isOpen
                ? 'translate-y-0 opacity-100'
                : 'translate-y-6 opacity-0'
                }`}
            style={{ transitionDelay: `${250 + index * 50}ms` }}
        >
            <Link
                to={item.path}
                onClick={onClose}
                className={`block p-4 rounded-lg hover:bg-stone-50 transition-colors group ${location.pathname === item.path ? 'bg-stone-100' : ''}`}
            >
                <div className="font-semibold text-xl">
                    {item.name}
                </div>
            </Link>
        </li>
    );
}