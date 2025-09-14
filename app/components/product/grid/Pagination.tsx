import { ChevronLeft, ChevronRight } from "lucide-react";
import Button from "~/components/ui/Button";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    className?: string;
}

const Pagination = ({
    currentPage,
    totalPages,
    onPageChange,
    className = ""
}: PaginationProps) => {
    const getVisiblePages = () => {
        const pages = [];
        const maxVisible = 5;

        if (totalPages <= maxVisible) {
            // Show all pages if total is 5 or less
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            // Calculate start and end of the 5-page window
            let start = Math.max(1, currentPage - 2);
            let end = Math.min(totalPages, start + maxVisible - 1);

            // Adjust start if we're near the end
            if (end - start < maxVisible - 1) {
                start = Math.max(1, end - maxVisible + 1);
            }

            // Add pages to the array
            for (let i = start; i <= end; i++) {
                pages.push(i);
            }
        }

        return pages;
    };

    const handlePrevious = () => {
        if (currentPage > 1) {
            onPageChange(currentPage - 1);
        }
    };

    const handleNext = () => {
        if (currentPage < totalPages) {
            onPageChange(currentPage + 1);
        }
    };

    if (totalPages <= 1) return null;

    return (
        <nav
            className={`flex items-center justify-end space-x-1 ${className}`}
            aria-label="Pagination navigation"
        >
            {/* Previous Button */}
            {currentPage > 1 &&
                <Button
                    variant="icon"
                    size="small"
                    onClick={handlePrevious}
                    disabled={currentPage === 1}
                    className="p-2"
                    aria-label="Go to previous page"
                >
                    <ChevronLeft className="h-4 w-4" />
                </Button>}

            {/* Page Numbers */}
            <div className="flex items-center space-x-1">
                {getVisiblePages().map((page, index) => {
                    const pageNumber = page as number;
                    const isActive = pageNumber === currentPage;

                    return (
                        <Button
                            key={pageNumber}
                            variant={isActive ? "outline" : "no-outline"}
                            size="small"
                            onClick={() => onPageChange(pageNumber)}
                            className="min-w-[40px] justify-center"
                            aria-label={`Go to page ${pageNumber}`}
                            aria-current={isActive ? "page" : undefined}
                        >
                            {pageNumber}
                        </Button>
                    );
                })}
            </div>

            {/* Next Button */}
            <Button
                variant="icon"
                size="small"
                onClick={handleNext}
                disabled={currentPage === totalPages}
                className="p-2"
                aria-label="Go to next page"
            >
                <ChevronRight className="h-4 w-4" />
            </Button>
        </nav>
    );
};

export default Pagination;
