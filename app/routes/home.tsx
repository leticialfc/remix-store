import { getAllProducts } from "~/services/api.server";
import type { Route } from "./+types/home";
import { useState, useMemo, useEffect, useCallback } from "react";
import ProductGrid from "~/components/product/grid/ProductGrid";
import Pagination from "~/components/product/grid/Pagination";
import FilterSidebar from "~/components/product/grid/FilterSidebar";
import Dropdown from "~/components/ui/Dropdown";
import Button from "~/components/ui/Button";
import { ChevronUp } from "lucide-react";
import type { Product } from "~/services/api.server";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "The Online Store" },
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
  const { products } = loaderData;
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState('title-asc');
  const [isMobile, setIsMobile] = useState(false);
  const [isMediumScreen, setMediumScreen] = useState(false);
  const [loadedItems, setLoadedItems] = useState(ITEMS_PER_PAGE);
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024); // lg breakpoint
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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

  // Display products based on device type
  const displayedProducts = useMemo(() => {
    if (isMobile) {
      // On mobile: show first N products (infinite scroll)
      return filteredAndSortedProducts.slice(0, loadedItems);
    } else {
      // On desktop: use pagination
      const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
      const endIndex = startIndex + ITEMS_PER_PAGE;
      return filteredAndSortedProducts.slice(startIndex, endIndex);
    }
  }, [filteredAndSortedProducts, currentPage, loadedItems, isMobile]);

  const totalPages = Math.ceil(filteredAndSortedProducts.length / ITEMS_PER_PAGE);
  const hasMoreItems = loadedItems < filteredAndSortedProducts.length;

  // Load more items for mobile
  const loadMoreItems = useCallback(() => {
    setLoadedItems(prev => Math.min(prev + ITEMS_PER_PAGE, filteredAndSortedProducts.length));
  }, [filteredAndSortedProducts.length]);

  // Reset states when filters change
  const handleCategoryChange = (categories: string[]) => {
    setSelectedCategories(categories);
    setCurrentPage(1);
    setLoadedItems(ITEMS_PER_PAGE); // Reset loaded items for mobile
  };

  const handleSortChange = (value: string) => {
    setSortBy(value);
    setCurrentPage(1);
    setLoadedItems(ITEMS_PER_PAGE); // Reset loaded items for mobile
  };

  // Calculate display info
  const startItem = isMobile ? 1 : (currentPage - 1) * ITEMS_PER_PAGE + 1;
  const endItem = isMobile
    ? Math.min(loadedItems, filteredAndSortedProducts.length)
    : Math.min(currentPage * ITEMS_PER_PAGE, filteredAndSortedProducts.length);

  // Optional: Auto-load more items when user scrolls near bottom (infinite scroll)
  useEffect(() => {
    if (!isMobile || !hasMoreItems) return;

    const handleScroll = () => {
      const scrollY = window.scrollY;

      // Show back to top button after scrolling 300px
      setShowBackToTop(scrollY > 300);

      // Auto-load more items when near bottom
      if (scrollY + window.innerHeight >= document.body.offsetHeight - 1000) {
        loadMoreItems();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMobile, hasMoreItems, loadMoreItems]);

  // Back to top functionality
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className="w-full">
      {/* Main Content */}
      <div className="lg:grid lg:grid-cols-4 lg:gap-8">
        {/* Product Area - Contains Controls and Grid */}
        <div className="lg:col-span-3">
          {/* Controls Bar */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div className="flex gap-4 w-full">
              <Dropdown
                mode="single"
                title="Sort by"
                options={sortOptions}
                value={sortBy}
                onChange={handleSortChange}
              />

              {/* Category filter dropdown for mobile */}
              <div className="block lg:hidden">
                <Dropdown
                  mode="multi"
                  title="Categories"
                  options={categories.map(cat => ({ value: cat, label: cat.charAt(0).toUpperCase() + cat.slice(1) }))}
                  selectedValues={selectedCategories}
                  onChange={handleCategoryChange}
                />
              </div>
            </div>

            <div className="text-sm text-gray-600 whitespace-nowrap">
              Showing {startItem}-{endItem} of {filteredAndSortedProducts.length}
            </div>
          </div>

          {/* Product Grid */}
          {displayedProducts.length > 0 ? (
            <>
              <ProductGrid
                products={displayedProducts}
                className="mb-8"
              />

              {/* Desktop Pagination */}
              {!isMobile && totalPages > 1 && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                  className="mt-8"
                />
              )}

              {/* Mobile Load More Button */}
              {isMobile && hasMoreItems && (
                <div className="flex justify-center mt-8">
                  <Button
                    variant="outline"
                    onClick={loadMoreItems}
                    className="px-8 py-3"
                  >
                    Load More Products
                  </Button>
                </div>
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
                  setLoadedItems(ITEMS_PER_PAGE);
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

      {/* Back to Top Button - Mobile Only */}
      {isMobile && showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-40 p-3 bg-gray-900 hover:bg-black text-white rounded-full shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          aria-label="Go back to top"
        >
          <ChevronUp className="h-6 w-6" aria-hidden="true" />
        </button>
      )}
    </div>
  );
}
