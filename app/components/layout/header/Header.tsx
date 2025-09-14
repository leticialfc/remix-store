import HeaderActions from "./HeaderActions";
import HeaderLogo from "./HeaderLogo";
import Navigation from "./Navigation";

const Header = () => {
    return (
        <header className="border-b border-gray-500 px-4 py-2 lg:px-14">
            <div className="max-w-screen-2xl mx-auto">
                <div className="w-full flex items-center justify-between">
                    <HeaderLogo text={"The Online Store".toLocaleUpperCase()} /><Navigation className="hidden lg:flex" /><HeaderActions />
                </div>
            </div>
        </header>
    )
}

export default Header;