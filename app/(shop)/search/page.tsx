'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Container } from '@/components/layout/container';
import { ProductGrid } from '@/components/products/product-grid';
import { useProducts } from '@/hooks/use-products';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

function SearchContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') || '';

  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [debouncedQuery, setDebouncedQuery] = useState(initialQuery);
  const [page, setPage] = useState(1);
  const [limit] = useState(12);

  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
      setPage(1); // Reset to first page on new search
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const { data, isLoading } = useProducts({
    page,
    limit,
    search: debouncedQuery || undefined,
  });

  const products = data?.data || [];

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <div className="section-spacing">
      <Container>
        {/* Header */}
        <div className="mb-8 space-y-4">
          <h1 className="text-3xl md:text-4xl font-light tracking-[0.18em]">
            SEARCH PRODUCTS
          </h1>
          {debouncedQuery && (
            <p className="text-muted-foreground">
              {isLoading
                ? 'Searching...'
                : `Found ${products.length} ${
                    products.length === 1 ? 'result' : 'results'
                  } for "${debouncedQuery}"`}
            </p>
          )}
        </div>

        {/* Search Input */}
        <form onSubmit={handleSearch} className="mb-8">
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search for products..."
              className="pl-12 h-14 text-lg"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoFocus
            />
          </div>
        </form>

        {/* Results */}
        {!debouncedQuery ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              Enter a search term to find products
            </p>
          </div>
        ) : (
          <>
            <ProductGrid products={products} isLoading={isLoading} />

            {/* Pagination */}
            {products.length > 0 && products.length >= limit && (
              <div className="mt-12 flex justify-center gap-2">
                <Button
                  variant="outline"
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1 || isLoading}
                >
                  Previous
                </Button>
                <div className="flex items-center px-4">
                  <span className="text-sm text-muted-foreground">Page {page}</span>
                </div>
                <Button
                  variant="outline"
                  onClick={() => setPage((p) => p + 1)}
                  disabled={products.length < limit || isLoading}
                >
                  Next
                </Button>
              </div>
            )}
          </>
        )}
      </Container>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className="section-spacing">
          <Container>
            <div className="mb-8 space-y-4">
              <Skeleton className="h-12 w-64" />
              <Skeleton className="h-6 w-96" />
            </div>
            <Skeleton className="h-14 w-full max-w-2xl mx-auto mb-8" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="space-y-4">
                  <Skeleton className="aspect-square w-full" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              ))}
            </div>
          </Container>
        </div>
      }
    >
      <SearchContent />
    </Suspense>
  );
}
