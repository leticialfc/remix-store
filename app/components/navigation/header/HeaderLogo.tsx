import { Link } from "react-router";

interface HeaderLogoProps {
    /**
     * Image source for the logo. If not provided, only text will be shown.
     */
    imageSrc?: string;
    /**
     * Alt text for the logo image
     */
    imageAlt?: string;
    /**
     * Text to display. Can be used alone or alongside an image.
     */
    text?: string;
    /**
     * Font family for the text logo
     */
    fontFamily?: 'sans' | 'serif' | 'mono' | 'custom';
    /**
     * Font weight for the text logo
     */
    fontWeight?: 'normal' | 'medium' | 'semibold' | 'bold' | 'extrabold';
    /**
     * Font size for the text logo
     */
    fontSize?: 'sm' | 'base' | 'lg' | 'xl' | '2xl';
    /**
     * Additional CSS classes
     */
    className?: string;
}

const HeaderLogo = ({
    imageSrc,
    imageAlt = "The Online Store",
    text,
    fontFamily = 'sans',
    fontWeight = 'semibold',
    fontSize = 'lg',
    className = ""
}: HeaderLogoProps) => {
    const getFontFamilyClass = () => {
        switch (fontFamily) {
            case 'serif':
                return 'font-serif';
            case 'mono':
                return 'font-mono';
            case 'custom':
                return ''; // Let className handle custom fonts
            case 'sans':
            default:
                return 'font-sans';
        }
    };

    const getFontWeightClass = () => {
        switch (fontWeight) {
            case 'normal':
                return 'font-normal';
            case 'medium':
                return 'font-medium';
            case 'bold':
                return 'font-bold';
            case 'extrabold':
                return 'font-extrabold';
            case 'semibold':
            default:
                return 'font-semibold';
        }
    };

    const getFontSizeClass = () => {
        switch (fontSize) {
            case 'sm':
                return 'text-sm';
            case 'base':
                return 'text-base';
            case 'xl':
                return 'text-xl';
            case '2xl':
                return 'text-2xl';
            case 'lg':
            default:
                return 'text-lg';
        }
    };

    const textClasses = `${getFontFamilyClass()} ${getFontWeightClass()} ${getFontSizeClass()}`;

    return (
        <Link to="/" className={`flex items-center space-x-2 ${className}`}>
            {imageSrc && !text && (
                <img
                    src={imageSrc}
                    alt={imageAlt}
                    className="h-6 w-auto"
                />
            )}
            {imageSrc && text && (
                <>
                    <img
                        src={imageSrc}
                        alt={imageAlt}
                        className="h-6 w-auto"
                    />
                    <span className={textClasses}>{text}</span>
                </>
            )}
            {!imageSrc && text && (
                <span className={textClasses}>{text}</span>
            )}
        </Link>
    )
}

export default HeaderLogo;