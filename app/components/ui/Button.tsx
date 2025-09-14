import type { ReactNode, ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    /** 
     * Variant for the button. Defaults to 'primary'.
     * - 'primary': Gray-900 background with black hover
     * - 'outline': No background with gray border
     * - 'no-outline': No background and no border
     * - 'icon': Icon-only button with subtle background and hover states
     * - 'custom': Use className prop for full customization
     */
    variant?: 'primary' | 'outline' | 'no-outline' | 'icon' | 'custom';
    /**
     * Button size. Defaults to 'medium'.
     */
    size?: 'small' | 'medium' | 'large';
    /**
     * Whether the button should take full width
     */
    fullWidth?: boolean;
    /**
     * Border radius style. Defaults to 'medium'.
     * - 'none': No border radius (sharp corners)
     * - 'small': Small border radius (rounded-sm)
     * - 'medium': Medium border radius (rounded-md)
     * - 'large': Large border radius (rounded-lg)
     * - 'xl': Extra large border radius (rounded-xl)
     * - 'full': Fully rounded (rounded-full, pill shape)
     */
    radius?: 'none' | 'small' | 'medium' | 'large' | 'xl' | 'full';
}

export default function Button({
    children,
    variant = 'primary',
    size = 'medium',
    fullWidth = false,
    radius = 'medium',
    className = '',
    ...props
}: ButtonProps) {
    const getVariantClasses = () => {
        switch (variant) {
            case 'outline':
                return 'bg-white hover:bg-gray-50 text-gray-900 border border-gray-300';
            case 'no-outline':
                return "hover:bg-gray-50";
            case 'icon':
                return 'bg-transparent hover:bg-gray-100 text-gray-600 hover:text-gray-900';
            case 'custom':
                return ''; // Let className handle all styling
            case 'primary':
            default:
                return 'bg-gray-900 hover:bg-black text-white';
        }
    };

    const getSizeClasses = () => {
        // Icon buttons get square dimensions and centered content
        if (variant === 'icon') {
            switch (size) {
                case 'small':
                    return 'p-1.5 w-8 h-8';
                case 'large':
                    return 'p-3 w-12 h-12';
                case 'medium':
                default:
                    return 'p-2 w-10 h-10';
            }
        }

        // Regular button sizing
        switch (size) {
            case 'small':
                return 'py-2 px-4 text-sm';
            case 'large':
                return 'py-4 px-8 text-lg';
            case 'medium':
            default:
                return 'py-3 px-6';
        }
    };

    const getRadiusClasses = () => {
        switch (radius) {
            case 'none':
                return 'rounded-none';
            case 'small':
                return 'rounded-sm';
            case 'large':
                return 'rounded-lg';
            case 'xl':
                return 'rounded-xl';
            case 'full':
                return 'rounded-full';
            case 'medium':
            default:
                return 'rounded-md';
        }
    };

    const baseClasses = 'font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2';

    // Icon buttons get additional centering classes
    const iconClasses = variant === 'icon' ? 'flex items-center justify-center' : '';

    const variantClasses = variant === 'custom' ? '' : getVariantClasses();
    const sizeClasses = getSizeClasses();
    const radiusClasses = getRadiusClasses();
    const widthClasses = fullWidth ? 'w-full' : '';

    return (
        <button
            className={`${baseClasses} ${iconClasses} ${variantClasses} ${sizeClasses} ${radiusClasses} ${widthClasses} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
}