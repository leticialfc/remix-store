import { useState } from "react";
import Divider from "~/components/ui/Divider";
import { capitalize } from "~/utils/capitalize";

interface FilterSidebarProps {
    categories: string[];
    selectedCategories: string[];
    onCategoryChange: (categories: string[]) => void;
    className?: string;
}

const FilterSidebar = ({
    categories,
    selectedCategories,
    onCategoryChange,
    className = ""
}: FilterSidebarProps) => {
    const handleCategoryToggle = (category: string) => {
        const isSelected = selectedCategories.includes(category);
        let newCategories;

        if (isSelected) {
            newCategories = selectedCategories.filter(c => c !== category);
        } else {
            newCategories = [...selectedCategories, category];
        }

        onCategoryChange(newCategories);
    };

    return (
        <aside
            className={`bg-white ${className}`}
            aria-label="Product filters"
        >
            <div className="space-y-6">
                <div>
                    <h2 className="text-sm text-gray-950 mb-4">
                        Categories
                    </h2>
                    <div className="space-y-2">
                        {categories.map((category) => {
                            const isSelected = selectedCategories.includes(category);
                            const checkboxId = `category-${category.replace(/\s+/g, '-').toLowerCase()}`;

                            return (
                                <div key={category} className={`flex items-center rounded-md`}>
                                    <input
                                        id={checkboxId}
                                        type="checkbox"
                                        checked={isSelected}
                                        onChange={() => handleCategoryToggle(category)}
                                        className="h-4 w-4 text-blue-600  border-gray-300 rounded"
                                        aria-describedby={`${checkboxId}-description`}
                                    />
                                    <label
                                        htmlFor={checkboxId}
                                        className="ml-3 text-sm text-gray-700 cursor-pointer"
                                    >
                                        {capitalize(category)}
                                    </label>
                                </div>
                            );
                        })}
                    </div>
                    <Divider thickness="thin" spacing="large" />
                </div>
            </div>
        </aside>
    );
};

export default FilterSidebar;