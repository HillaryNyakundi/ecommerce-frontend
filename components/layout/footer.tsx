'use client';

import Link from 'next/link';
import { Container } from './container';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Instagram, Facebook, Twitter } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t bg-muted/40">
      <Container>
        <div className="py-12 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold tracking-wider">HAIR HAVEN</h3>
              <p className="text-sm text-muted-foreground">
                Premium hair care products for beautiful, healthy hair.
              </p>
              <div className="flex space-x-4">
                <Link
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <Instagram className="h-5 w-5" />
                  <span className="sr-only">Instagram</span>
                </Link>
                <Link
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <Facebook className="h-5 w-5" />
                  <span className="sr-only">Facebook</span>
                </Link>
                <Link
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <Twitter className="h-5 w-5" />
                  <span className="sr-only">Twitter</span>
                </Link>
              </div>
            </div>

            {/* Shop */}
            <div className="space-y-4">
              <h4 className="text-sm font-semibold uppercase tracking-wider">Shop</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="/products"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    All Products
                  </Link>
                </li>
                <li>
                  <Link
                    href="/categories"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Categories
                  </Link>
                </li>
                <li>
                  <Link
                    href="/products?sort=new"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    New Arrivals
                  </Link>
                </li>
                <li>
                  <Link
                    href="/products?sale=true"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Sale
                  </Link>
                </li>
              </ul>
            </div>

            {/* Info */}
            <div className="space-y-4">
              <h4 className="text-sm font-semibold uppercase tracking-wider">Info</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="/about"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Contact
                  </Link>
                </li>
                <li>
                  <Link
                    href="/shipping"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Shipping & Returns
                  </Link>
                </li>
                <li>
                  <Link
                    href="/faq"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>

            {/* Newsletter */}
            <div className="space-y-4">
              <h4 className="text-sm font-semibold uppercase tracking-wider">
                Newsletter
              </h4>
              <p className="text-sm text-muted-foreground">
                Subscribe to get updates on new products and exclusive offers.
              </p>
              <form className="space-y-2" onSubmit={(e) => e.preventDefault()}>
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="bg-background"
                />
                <Button type="submit" className="w-full">
                  Subscribe
                </Button>
              </form>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-12 pt-8 border-t">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <p className="text-sm text-muted-foreground">
                © {new Date().getFullYear()} Hair Haven. All rights reserved.
              </p>
              <div className="flex space-x-6 text-sm">
                <Link
                  href="/privacy"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Privacy Policy
                </Link>
                <Link
                  href="/terms"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Terms of Service
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}
