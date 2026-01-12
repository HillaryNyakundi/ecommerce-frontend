'use client';

import { useState } from 'react';
import { Container } from '@/components/layout/container';
import { ProductGrid } from '@/components/products/product-grid';
import { useProducts } from '@/hooks/use-products';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, SlidersHorizontal } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [limit] = useState(12);

  const { data, isLoading, error } = useProducts({
    page,
    limit,
    search: searchQuery || undefined,
  });

  const products = data?.data || [];

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const query = formData.get('search') as string;
    setSearchQuery(query);
    setPage(1); // Reset to first page on new search
  };

  return (
    <div className="section-spacing">
      <Container>
        {/* Header */}
        <div className="mb-8 space-y-4">
          <h1 className="text-3xl md:text-4xl font-light tracking-[0.18em]">
            ALL PRODUCTS
          </h1>
          <p className="text-muted-foreground">
            Discover our complete collection of premium hair care products
          </p>
        </div>

        {/* Filters & Search */}
        <div className="mb-8 flex flex-col md:flex-row gap-4">
          {/* Search */}
          <form onSubmit={handleSearch} className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                name="search"
                type="search"
                placeholder="Search products..."
                className="pl-10"
                defaultValue={searchQuery}
              />
            </div>
          </form>

          {/* Sort */}
          <Select defaultValue="newest">
            <SelectTrigger className="w-full md:w-[200px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="popular">Most Popular</SelectItem>
              <SelectItem value="rating">Highest Rated</SelectItem>
            </SelectContent>
          </Select>

          {/* Filters Button (Mobile) */}
          <Button variant="outline" className="md:hidden">
            <SlidersHorizontal className="mr-2 h-4 w-4" />
            Filters
          </Button>
        </div>

        {/* Error State */}
        {error && (
          <div className="bg-destructive/10 text-destructive px-4 py-3 rounded-lg mb-8">
            <p>Error loading products. Please try again later.</p>
          </div>
        )}

        {/* Products Grid */}
        <ProductGrid products={products} isLoading={isLoading} />

        {/* Pagination */}
        {products.length > 0 && (
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
      </Container>
    </div>
  );
}
