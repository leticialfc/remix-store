import Navigation from "../Navigation";
import HeaderActions from "../ui/HeaderActions";
import HeaderLogo from "../ui/HeaderLogo";


const Header = () => {
    return (
        <header className="bg-gray-50 px-4 py-8 lg:px-14">
            <div className="max-w-screen-2xl mx-auto">
                <div className="w-full flex items-center justify-between">
                    <HeaderLogo /><Navigation /><HeaderActions />
                </div>
            </div>
        </header>
    )
}

export default Header;