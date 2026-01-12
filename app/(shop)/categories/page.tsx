'use client';

import { Container } from '@/components/layout/container';
import { useCategories } from '@/hooks/use-categories';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

export default function CategoriesPage() {
  const { data, isLoading, error } = useCategories({ limit: 100 });
  const categories = data?.data || [];

  if (isLoading) {
    return (
      <div className="section-spacing">
        <Container>
          <Skeleton className="h-12 w-64 mb-8" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-32" />
            ))}
          </div>
        </Container>
      </div>
    );
  }

  if (error) {
    return (
      <div className="section-spacing">
        <Container>
          <div className="text-center py-12">
            <p className="text-destructive">Error loading categories</p>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="section-spacing">
      <Container>
        {/* Header */}
        <div className="mb-12 text-center space-y-4">
          <h1 className="text-3xl md:text-4xl font-light tracking-[0.18em]">
            SHOP BY CATEGORY
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Browse our curated collection of hair care products organized by category
          </p>
        </div>

        {/* Categories Grid */}
        {categories.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No categories available</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/categories/${category.id}`}
                className="group"
              >
                <Card className="hover:shadow-lg transition-shadow h-full">
                  <CardContent className="p-6 flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-light uppercase tracking-wider group-hover:text-primary transition-colors">
                        {category.name}
                      </h3>
                    </div>
                    <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </Container>
    </div>
  );
}
