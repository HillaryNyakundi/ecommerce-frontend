'use client';

import { use, useState } from 'react';
import { Container } from '@/components/layout/container';
import { ProductGrid } from '@/components/products/product-grid';
import { useCategory } from '@/hooks/use-categories';
import { useProducts } from '@/hooks/use-products';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Skeleton } from '@/components/ui/skeleton';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function CategoryPage({ params }: PageProps) {
  const { id } = use(params);
  const categoryId = parseInt(id);

  const [page, setPage] = useState(1);
  const [limit] = useState(12);

  const { data: categoryData, isLoading: categoryLoading } = useCategory(categoryId);
  const { data: productsData, isLoading: productsLoading } = useProducts({
    page,
    limit,
  });

  const category = categoryData?.data;
  const allProducts = productsData?.data || [];

  // Filter products by category
  const products = allProducts.filter((p) => p.category_id === categoryId);

  const isLoading = categoryLoading || productsLoading;

  if (isLoading) {
    return (
      <div className="section-spacing">
        <Container>
          <Skeleton className="h-12 w-64 mb-8" />
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
    );
  }

  if (!category) {
    return (
      <div className="section-spacing">
        <Container>
          <div className="text-center py-12">
            <h1 className="text-2xl font-light mb-4">Category Not Found</h1>
            <Button asChild>
              <Link href="/categories">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Categories
              </Link>
            </Button>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="section-spacing">
      <Container>
        {/* Breadcrumb */}
        <div className="mb-8">
          <Link
            href="/categories"
            className="text-sm text-muted-foreground hover:text-foreground inline-flex items-center"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Categories
          </Link>
        </div>

        {/* Header */}
        <div className="mb-12 text-center space-y-4">
          <h1 className="text-3xl md:text-4xl font-light tracking-[0.18em]">
            {category.name.toUpperCase()}
          </h1>
          <p className="text-muted-foreground">
            {products.length} {products.length === 1 ? 'product' : 'products'} in this
            category
          </p>
        </div>

        {/* Products Grid */}
        <ProductGrid products={products} isLoading={false} />

        {/* Pagination */}
        {products.length > 0 && products.length >= limit && (
          <div className="mt-12 flex justify-center gap-2">
            <Button
              variant="outline"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
            >
              Previous
            </Button>
            <div className="flex items-center px-4">
              <span className="text-sm text-muted-foreground">Page {page}</span>
            </div>
            <Button
              variant="outline"
              onClick={() => setPage((p) => p + 1)}
              disabled={products.length < limit}
            >
              Next
            </Button>
          </div>
        )}
      </Container>
    </div>
  );
}
