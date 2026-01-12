'use client';

import { use } from 'react';
import Image from 'next/image';
import { Container } from '@/components/layout/container';
import { useProduct } from '@/hooks/use-products';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { ShoppingCart, Star, Minus, Plus, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function ProductDetailPage({ params }: PageProps) {
  const { id } = use(params);
  const productId = parseInt(id);

  const { data, isLoading, error } = useProduct(productId);
  const product = data?.data;

  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  if (isLoading) {
    return (
      <div className="section-spacing">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-4">
              <Skeleton className="aspect-square w-full" />
              <div className="grid grid-cols-4 gap-4">
                {Array.from({ length: 4 }).map((_, i) => (
                  <Skeleton key={i} className="aspect-square" />
                ))}
              </div>
            </div>
            <div className="space-y-6">
              <Skeleton className="h-12 w-3/4" />
              <Skeleton className="h-6 w-1/4" />
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-12 w-32" />
            </div>
          </div>
        </Container>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="section-spacing">
        <Container>
          <div className="text-center py-12">
            <h1 className="text-2xl font-light mb-4">Product Not Found</h1>
            <Button asChild>
              <Link href="/products">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Products
              </Link>
            </Button>
          </div>
        </Container>
      </div>
    );
  }

  const discountedPrice =
    product.price - (product.price * product.discount_percentage) / 100;
  const hasDiscount = product.discount_percentage > 0;
  const images = [product.thumbnail, ...product.images].filter(Boolean);

  const handleQuantityChange = (change: number) => {
    setQuantity((prev) => Math.max(1, Math.min(product.stock, prev + change)));
  };

  return (
    <div className="section-spacing">
      <Container>
        {/* Breadcrumb */}
        <div className="mb-8">
          <Link
            href="/products"
            className="text-sm text-muted-foreground hover:text-foreground inline-flex items-center"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Products
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative aspect-square overflow-hidden rounded-lg bg-muted">
              {images[selectedImage] ? (
                <Image
                  src={images[selectedImage]}
                  alt={product.title}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              ) : (
                <div className="flex items-center justify-center h-full text-muted-foreground">
                  No Image
                </div>
              )}

              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {hasDiscount && (
                  <Badge variant="destructive" className="text-base">
                    -{product.discount_percentage}%
                  </Badge>
                )}
              </div>
            </div>

            {/* Thumbnail Gallery */}
            {images.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative aspect-square overflow-hidden rounded-lg border-2 transition-colors ${
                      selectedImage === index
                        ? 'border-primary'
                        : 'border-transparent hover:border-muted-foreground'
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`${product.title} - Image ${index + 1}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 25vw, 12vw"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Brand */}
            {product.brand && (
              <p className="text-sm text-muted-foreground uppercase tracking-wider">
                {product.brand}
              </p>
            )}

            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-light tracking-wide">
              {product.title}
            </h1>

            {/* Rating */}
            {product.rating > 0 && (
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.round(product.rating)
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-muted'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">
                  {product.rating.toFixed(1)} out of 5
                </span>
              </div>
            )}

            {/* Price */}
            <div className="flex items-center gap-3">
              <p className="text-3xl font-semibold">
                ${hasDiscount ? discountedPrice.toFixed(2) : product.price.toFixed(2)}
              </p>
              {hasDiscount && (
                <p className="text-xl text-muted-foreground line-through">
                  ${product.price.toFixed(2)}
                </p>
              )}
            </div>

            {/* Stock Status */}
            <div>
              {product.stock > 0 ? (
                <p className="text-sm text-muted-foreground">
                  {product.stock < 10 && (
                    <Badge variant="secondary" className="mr-2">
                      Only {product.stock} left
                    </Badge>
                  )}
                  In Stock
                </p>
              ) : (
                <Badge variant="destructive">Out of Stock</Badge>
              )}
            </div>

            {/* Description */}
            <div className="border-t pt-6">
              <h2 className="text-lg font-medium mb-2">Description</h2>
              <p className="text-muted-foreground leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Category */}
            {product.category && (
              <div>
                <p className="text-sm text-muted-foreground mb-2">Category</p>
                <Link href={`/categories/${product.category.id}`}>
                  <Badge variant="outline" className="cursor-pointer hover:bg-muted">
                    {product.category.name}
                  </Badge>
                </Link>
              </div>
            )}

            {/* Quantity Selector & Add to Cart */}
            <div className="space-y-4 pt-6 border-t">
              <div className="flex items-center gap-4">
                <p className="text-sm font-medium">Quantity:</p>
                <div className="flex items-center border rounded-lg">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleQuantityChange(-1)}
                    disabled={quantity <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="px-6 font-medium">{quantity}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleQuantityChange(1)}
                    disabled={quantity >= product.stock}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <Button
                size="lg"
                className="w-full"
                disabled={product.stock === 0}
                onClick={() => {
                  // Add to cart logic will be implemented
                  console.log('Add to cart:', product.id, 'quantity:', quantity);
                }}
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
