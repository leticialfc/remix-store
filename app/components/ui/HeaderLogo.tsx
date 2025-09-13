import { Link } from "react-router";

const HeaderLogo = () => {
    return (
        <Link to="/" className="flex items-center">
            <img
                src="/assets/logo.svg"
                alt="The Online Store"
                className="h-6 w-auto"
            />
        </Link>
    )
}

export default HeaderLogo;