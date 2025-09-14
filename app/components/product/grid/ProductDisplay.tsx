import ProductGrid from "~/components/product/grid/ProductGrid";
import Pagination from "~/components/product/grid/Pagination";
import Button from "~/components/ui/Button";
import type { Product } from "~/services/api.server";

interface ProductDisplayProps {
    products: Product[];
    isMobile: boolean;
    currentPage: number;
    totalPages: number;
    hasMoreItems: boolean;
    onPageChange: (page: number) => void;
    onLoadMore: () => void;
}

export default function ProductDisplay({
    products,
    isMobile,
    currentPage,
    totalPages,
    hasMoreItems,
    onPageChange,
    onLoadMore,
}: ProductDisplayProps) {
    return (
        <>
            <ProductGrid
                products={products}
                className="mb-8"
            />

            {/* Desktop Pagination */}
            {!isMobile && totalPages > 1 && (
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={onPageChange}
                    className="mt-8"
                />
            )}

            {/* Mobile Load More Button */}
            {isMobile && hasMoreItems && (
                <div className="flex justify-center mt-8">
                    <Button
                        variant="outline"
                        onClick={onLoadMore}
                        className="px-8 py-3"
                    >
                        Load More Products
                    </Button>
                </div>
            )}
        </>
    );
}