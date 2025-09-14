import HeaderActions from "./HeaderActions";
import HeaderLogo from "./HeaderLogo";
import HeaderNavigation from "./HeaderNavigation";

const Header = () => {
    return (
        <header className="border-b border-gray-500 px-4 py-3 lg:px-14">
            <div className="max-w-screen-2xl mx-auto">
                <div className="w-full flex items-center justify-between">
                    <HeaderLogo text={"The Online Store".toLocaleUpperCase()} /><HeaderNavigation className="hidden lg:flex" /><HeaderActions />
                </div>
            </div>
        </header>
    )
}

export default Header;