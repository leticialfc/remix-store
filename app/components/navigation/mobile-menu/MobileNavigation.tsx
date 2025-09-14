import MobileNavigationItem from "./MobileNavigationItem";

interface NavigationItem {
    name: string;
    path: string;
}

interface MobileNavigationProps {
    isOpen: boolean;
    onClose: () => void;
}

const navigationItems: NavigationItem[] = [
    { name: "Home", path: "/" },
    { name: "Shop", path: "/shop" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
    { name: "Blog", path: "/blog" }
];

export default function MobileNavigation({ isOpen, onClose }: MobileNavigationProps) {
    return (
        <div className="flex-1 overflow-y-auto p-4">
            <nav className="space-y-8" aria-label="Mobile navigation">
                <section>
                    <ul className="space-y-1">
                        {navigationItems.map((item, index) => (
                            <MobileNavigationItem
                                key={item.name}
                                item={item}
                                index={index}
                                isOpen={isOpen}
                                onClose={onClose}
                            />
                        ))}
                    </ul>
                </section>
            </nav>
        </div>
    );
}