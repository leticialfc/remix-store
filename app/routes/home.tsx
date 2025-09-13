import { getAllProducts } from "~/services/api.server";
import type { Route } from "./+types/home";
import { useState, useMemo } from "react";
import ProductGrid from "~/components/product/grid/ProductGrid";
import Pagination from "~/components/product/grid/Pagination";
import FilterSidebar from "~/components/product/grid/FilterSidebar";
import SortDropdown from "~/components/product/grid/SortDropdown";
import type { Product } from "~/services/api.server";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Simple Online Store" },
    { name: "description", content: "Browse our collection of products. View details and add items to your cart for a seamless shopping experience." },
  ];
}

export async function loader({ params }: Route.LoaderArgs) {
  const data = await getAllProducts();
  return { products: data.products, total: data.total };
}

export function HydrateFallback() {
  return (
    <div className="flex items-center justify-center min-h-64">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
        <p className="text-gray-600">Loading products...</p>
      </div>
    </div>
  );
}

const ITEMS_PER_PAGE = 9;

const sortOptions = [
  { value: 'title-asc', label: 'Title A-Z' },
  { value: 'title-desc', label: 'Title Z-A' },
  { value: 'price-asc', label: 'Price Low to High' },
  { value: 'price-desc', label: 'Price High to Low' },
  { value: 'rating-desc', label: 'Highest Rated' },
];

export default function Home({ loaderData }: Route.ComponentProps) {
  const { products, total } = loaderData;
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState('title-asc');

  // Get unique categories
  const categories = useMemo(() => {
    const uniqueCategories = [...new Set(products.map((p: Product) => p.category))];
    return uniqueCategories.sort();
  }, [products]);

  // Filter and sort products
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products;

    // Filter by categories
    if (selectedCategories.length > 0) {
      filtered = filtered.filter((product: Product) =>
        selectedCategories.includes(product.category)
      );
    }

    // Sort products
    const sorted = [...filtered].sort((a: Product, b: Product) => {
      switch (sortBy) {
        case 'title-asc':
          return a.title.localeCompare(b.title);
        case 'title-desc':
          return b.title.localeCompare(a.title);
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'rating-desc':
          return b.rating - a.rating;
        default:
          return 0;
      }
    });

    return sorted;
  }, [products, selectedCategories, sortBy]);

  // Paginate products
  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return filteredAndSortedProducts.slice(startIndex, endIndex);
  }, [filteredAndSortedProducts, currentPage]);

  const totalPages = Math.ceil(filteredAndSortedProducts.length / ITEMS_PER_PAGE);

  // Reset to page 1 when filters change
  const handleCategoryChange = (categories: string[]) => {
    setSelectedCategories(categories);
    setCurrentPage(1);
  };

  const handleSortChange = (value: string) => {
    setSortBy(value);
    setCurrentPage(1);
  };

  const startItem = (currentPage - 1) * ITEMS_PER_PAGE + 1;
  const endItem = Math.min(currentPage * ITEMS_PER_PAGE, filteredAndSortedProducts.length);

  return (
    <div className="w-full">
      {/* Main Content */}
      <div className="lg:grid lg:grid-cols-4 lg:gap-8">
        {/* Product Area - Contains Controls and Grid */}
        <div className="lg:col-span-3">
          {/* Controls Bar */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <SortDropdown
              options={sortOptions}
              value={sortBy}
              onChange={handleSortChange}
              className="w-full sm:w-auto min-w-[200px]"
            />

            <div className="text-sm text-gray-600">
              Showing {startItem}-{endItem} of {filteredAndSortedProducts.length}
            </div>
          </div>

          {/* Mobile Filter Button - Show only on mobile */}
          <div className="lg:hidden mb-6">
            <button
              className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
              onClick={() => {
                // Could implement a modal or drawer for mobile filters
                alert('Mobile filter modal would open here');
              }}
            >
              Filters {selectedCategories.length > 0 && `(${selectedCategories.length})`}
            </button>
          </div>

          {/* Product Grid */}
          {paginatedProducts.length > 0 ? (
            <>
              <ProductGrid
                products={paginatedProducts}
                className="mb-8"
              />

              {totalPages > 1 && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                  className="mt-8"
                />
              )}
            </>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg mb-4">
                No products found matching your criteria
              </p>
              <button
                onClick={() => {
                  setSelectedCategories([]);
                  setSortBy('title-asc');
                  setCurrentPage(1);
                }}
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>

        {/* Sidebar - Hidden on mobile, shown on desktop */}
        <div className="hidden lg:block lg:pl-2">
          <FilterSidebar
            categories={categories}
            selectedCategories={selectedCategories}
            onCategoryChange={handleCategoryChange}
            className="sticky top-8"
          />
        </div>
      </div>
    </div>
  );
}
