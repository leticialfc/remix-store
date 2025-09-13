import HeaderActions from "./HeaderActions";
import HeaderLogo from "./HeaderLogo";
import Navigation from "./Navigation";

const Header = () => {
    return (
        <header className="border-b border-gray-950 px-4 py-6 lg:px-14">
            <div className="max-w-screen-2xl mx-auto">
                <div className="w-full flex items-center justify-between">
                    <HeaderLogo /><Navigation /><HeaderActions />
                </div>
            </div>
        </header>
    )
}

export default Header;