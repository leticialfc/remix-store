import Dropdown from "~/components/ui/Dropdown";
import { capitalize } from "~/utils/capitalize";

interface ControlsBarProps {
    sortBy: string;
    onSortChange: (value: string) => void;
    categories: string[];
    selectedCategories: string[];
    onCategoryChange: (categories: string[]) => void;
    isMobile: boolean;
    startItem: number;
    endItem: number;
    totalItems: number;
}

const sortOptions = [
    { value: 'title-asc', label: 'Title A-Z' },
    { value: 'title-desc', label: 'Title Z-A' },
    { value: 'price-asc', label: 'Price Low to High' },
    { value: 'price-desc', label: 'Price High to Low' },
    { value: 'rating-desc', label: 'Highest Rated' },
];

export default function ControlsBar({
    sortBy,
    onSortChange,
    categories,
    selectedCategories,
    onCategoryChange,
    isMobile,
    startItem,
    endItem,
    totalItems,
}: ControlsBarProps) {
    return (
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div className="flex gap-4 w-full">
                <Dropdown
                    mode="single"
                    title="Sort by"
                    options={sortOptions}
                    value={sortBy}
                    onChange={onSortChange}
                />

                {/* Category filter dropdown for mobile */}
                <div className="block lg:hidden">
                    <Dropdown
                        mode="multi"
                        title="Categories"
                        options={categories.map(cat => ({ value: cat, label: capitalize(cat) }))}
                        selectedValues={selectedCategories}
                        onChange={onCategoryChange}
                    />
                </div>
            </div>

            <div className="text-sm text-gray-500 whitespace-nowrap">
                Showing {startItem}-{endItem} of {totalItems}
            </div>
        </div>
    );
}