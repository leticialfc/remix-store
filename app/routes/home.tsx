import { getAllProducts } from "~/services/api.server";
import type { Route } from "./+types/home";
import { useState, useMemo, useEffect, useCallback } from "react";
import FilterSidebar from "~/components/product/grid/FilterSidebar";
import ControlsBar from "~/components/product/grid/ControlsBar";
import ProductDisplay from "~/components/product/grid/ProductDisplay";
import EmptyState from "~/components/product/grid/EmptyState";
import BackToTopButton from "~/components/common/BackToTopButton";
import LoadingFallback from "~/components/common/LoadingFallback";
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
  return <LoadingFallback />;
}

const ITEMS_PER_PAGE = 9;

export default function Home({ loaderData }: Route.ComponentProps) {
  const { products } = loaderData;
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState('title-asc');
  const [isMobile, setIsMobile] = useState(false);
  const [loadedItems, setLoadedItems] = useState(ITEMS_PER_PAGE);
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const checkDesktopLayout = () => {
      setIsMobile(window.innerWidth < 1024); // lg breakpoint
    };

    checkDesktopLayout();
    window.addEventListener('resize', checkDesktopLayout);
    return () => window.removeEventListener('resize', checkDesktopLayout);
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

  // Infinite scroll
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
          <ControlsBar
            sortBy={sortBy}
            onSortChange={handleSortChange}
            categories={categories}
            selectedCategories={selectedCategories}
            onCategoryChange={handleCategoryChange}
            isMobile={isMobile}
            startItem={startItem}
            endItem={endItem}
            totalItems={filteredAndSortedProducts.length}
          />

          {/* Product Grid */}
          {displayedProducts.length > 0 ? (
            <ProductDisplay
              products={displayedProducts}
              isMobile={isMobile}
              currentPage={currentPage}
              totalPages={totalPages}
              hasMoreItems={hasMoreItems}
              onPageChange={setCurrentPage}
              onLoadMore={loadMoreItems}
            />
          ) : (
            <EmptyState
              onClearFilters={() => {
                setSelectedCategories([]);
                setSortBy('title-asc');
                setCurrentPage(1);
                setLoadedItems(ITEMS_PER_PAGE);
              }}
            />
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
      <BackToTopButton
        isVisible={isMobile && showBackToTop}
        onClick={scrollToTop}
      />
    </div>
  );
}
