import type { ReactNode, ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    /** 
     * Color variant for the button. Defaults to 'dark'.
     * - 'dark': Gray-900 background with black hover
     * - 'blue': Blue-600 background with blue-700 hover
     * - 'green': Green-600 background with green-700 hover
     * - 'red': Red-600 background with red-700 hover
     * - 'white': White background with gray border
     * - 'custom': Use className prop for full customization
     */
    variant?: 'dark' | 'blue' | 'green' | 'red' | 'white' | 'custom';
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
    variant = 'dark',
    size = 'medium',
    fullWidth = false,
    radius = 'medium',
    className = '',
    ...props
}: ButtonProps) {
    const getVariantClasses = () => {
        switch (variant) {
            case 'blue':
                return 'bg-blue-600 hover:bg-blue-700 text-white';
            case 'green':
                return 'bg-green-600 hover:bg-green-700 text-white';
            case 'red':
                return 'bg-red-600 hover:bg-red-700 text-white';
            case 'white':
                return 'bg-white hover:bg-gray-50 text-gray-900 border border-gray-300';
            case 'custom':
                return ''; // Let className handle all styling
            case 'dark':
            default:
                return 'bg-gray-900 hover:bg-black text-white';
        }
    };

    const getSizeClasses = () => {
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

    const baseClasses = 'font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed';
    const variantClasses = variant === 'custom' ? '' : getVariantClasses();
    const sizeClasses = getSizeClasses();
    const radiusClasses = getRadiusClasses();
    const widthClasses = fullWidth ? 'w-full' : '';

    return (
        <button
            className={`${baseClasses} ${variantClasses} ${sizeClasses} ${radiusClasses} ${widthClasses} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
}