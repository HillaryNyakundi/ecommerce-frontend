import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/layout/container';

export default function HomePage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="section-spacing bg-muted/40">
        <Container>
          <div className="flex flex-col items-center justify-center text-center space-y-6 py-12 md:py-20">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-light tracking-[0.18em]">
              ELEVATE YOUR HAIR CARE
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl">
              Discover premium hair care products designed to nourish, protect,
              and enhance your natural beauty
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <Button size="lg" asChild>
                <Link href="/products">Shop Now</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/about">Learn More</Link>
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* Featured Categories */}
      <section className="section-spacing">
        <Container>
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl md:text-4xl font-light tracking-[0.18em]">
              SHOP BY CATEGORY
            </h2>
            <p className="text-muted-foreground">
              Find the perfect products for your hair type
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Category cards will be populated dynamically */}
            <Link
              href="/products?category=shampoo"
              className="group relative aspect-square overflow-hidden rounded-lg bg-muted"
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <h3 className="text-2xl font-light tracking-[0.18em] group-hover:text-primary transition-colors">
                  SHAMPOO
                </h3>
              </div>
            </Link>
            <Link
              href="/products?category=conditioner"
              className="group relative aspect-square overflow-hidden rounded-lg bg-muted"
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <h3 className="text-2xl font-light tracking-[0.18em] group-hover:text-primary transition-colors">
                  CONDITIONER
                </h3>
              </div>
            </Link>
            <Link
              href="/products?category=treatment"
              className="group relative aspect-square overflow-hidden rounded-lg bg-muted"
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <h3 className="text-2xl font-light tracking-[0.18em] group-hover:text-primary transition-colors">
                  TREATMENT
                </h3>
              </div>
            </Link>
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="section-spacing bg-primary/10">
        <Container>
          <div className="text-center space-y-6 py-12">
            <h2 className="text-3xl md:text-4xl font-light tracking-[0.18em]">
              JOIN OUR COMMUNITY
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Subscribe to our newsletter for exclusive offers, hair care tips,
              and new product launches
            </p>
            <Button size="lg" asChild>
              <Link href="/newsletter">Subscribe Now</Link>
            </Button>
          </div>
        </Container>
      </section>
    </div>
  );
}
