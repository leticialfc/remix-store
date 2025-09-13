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
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            if (currentPage <= 3) {
                for (let i = 1; i <= 4; i++) {
                    pages.push(i);
                }
                pages.push('...');
                pages.push(totalPages);
            } else if (currentPage >= totalPages - 2) {
                pages.push(1);
                pages.push('...');
                for (let i = totalPages - 3; i <= totalPages; i++) {
                    pages.push(i);
                }
            } else {
                pages.push(1);
                pages.push('...');
                for (let i = currentPage - 1; i <= currentPage + 1; i++) {
                    pages.push(i);
                }
                pages.push('...');
                pages.push(totalPages);
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
            className={`flex items-center justify-center space-x-1 ${className}`}
            aria-label="Pagination navigation"
        >
            {/* Previous Button */}
            <Button
                variant="white"
                size="medium"
                onClick={handlePrevious}
                disabled={currentPage === 1}
                className="p-2"
                aria-label="Go to previous page"
            >
                <ChevronLeft className="h-4 w-4" />
            </Button>

            {/* Page Numbers */}
            <div className="flex items-center space-x-1">
                {getVisiblePages().map((page, index) => {
                    if (page === '...') {
                        return (
                            <span
                                key={`ellipsis-${index}`}
                                className="px-3 py-2 text-gray-500"
                                aria-hidden="true"
                            >
                                ...
                            </span>
                        );
                    }

                    const pageNumber = page as number;
                    const isActive = pageNumber === currentPage;

                    return (
                        <Button
                            key={pageNumber}
                            variant={isActive ? "dark" : "white"}
                            size="medium"
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
                variant="white"
                size="medium"
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
