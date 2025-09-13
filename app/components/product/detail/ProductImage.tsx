const ProductImage = ({ imageUrl }: { imageUrl: string }) => {
    return (
        <div className="w-full aspect-square bg-gray-100 flex items-center justify-center">
            <img src={imageUrl} alt="Product Image" className="object-contain max-h-full max-w-full" />
        </div>
    )
}

export default ProductImage;