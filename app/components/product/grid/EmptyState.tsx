interface EmptyStateProps {
    onClearFilters: () => void;
}

export default function EmptyState({ onClearFilters }: EmptyStateProps) {
    return (
        <div className="text-center py-12">
            <p className="text-gray-500 text-lg mb-4">
                No products found matching your criteria
            </p>
            <button
                onClick={onClearFilters}
                className="text-blue-600 hover:text-blue-700 font-medium"
            >
                Clear all filters
            </button>
        </div>
    );
}