interface ProductImageProps {
    src: string;
    alt: string;
    size?: 'large' | 'medium' | 'small'
}

const ProductImage = ({ src, alt, size = 'large' }: ProductImageProps) => {
    const getSizeClasses = () => {
        switch (size) {
            case 'large':
                return 'w-full h-[32rem]';
            case 'medium':
                return 'h-96';
            case 'small':
                return 'w-40 h-40';

        }
    };

    const sizeClasses = getSizeClasses();

    return (
        <div className={`aspect-square bg-gray-100 flex items-center justify-center ${sizeClasses}`}>
            <img src={src} alt={alt} className="object-contain max-h-full max-w-full" />
        </div>
    )
}

export default ProductImage;