type DividerProps = {
    className?: string;
    /** 
     * Color variant for the divider. Defaults to 'gray'.
     * - 'gray': Standard gray divider
     * - 'light': Light gray divider  
     * - 'dark': Dark gray/black divider
     * - 'blue': Blue divider
     * - 'green': Green divider
     * - 'red': Red divider
     * - 'custom': Use className prop for full customization
     */
    variant?: 'gray' | 'light' | 'dark' | 'blue' | 'green' | 'red' | 'custom';
    /**
     * Thickness of the divider. Defaults to 'thin'.
     */
    thickness?: 'thin' | 'medium' | 'thick';
    /**
     * Spacing around the divider. Defaults to 'medium'.
     */
    spacing?: 'none' | 'small' | 'medium' | 'large';
};

const Divider = ({
    className = "",
    variant = 'gray',
    thickness = 'thin',
    spacing = 'medium'
}: DividerProps) => {
    const getVariantClasses = () => {
        switch (variant) {
            case 'light':
                return 'border-gray-200';
            case 'dark':
                return 'border-gray-800';
            case 'blue':
                return 'border-blue-500';
            case 'green':
                return 'border-green-500';
            case 'red':
                return 'border-red-500';
            case 'custom':
                return ''; // Let className handle all styling
            case 'gray':
            default:
                return 'border-gray-300';
        }
    };

    const getThicknessClasses = () => {
        switch (thickness) {
            case 'medium':
                return 'border-t-2';
            case 'thick':
                return 'border-t-4';
            case 'thin':
            default:
                return 'border-t';
        }
    };

    const getSpacingClasses = () => {
        switch (spacing) {
            case 'none':
                return '';
            case 'small':
                return 'my-2';
            case 'large':
                return 'my-6';
            case 'medium':
            default:
                return 'my-4';
        }
    };

    const variantClasses = variant === 'custom' ? '' : getVariantClasses();
    const thicknessClasses = getThicknessClasses();
    const spacingClasses = getSpacingClasses();

    return (
        <hr className={`${variantClasses} ${thicknessClasses} ${spacingClasses} ${className}`} />
    );
};

export default Divider;