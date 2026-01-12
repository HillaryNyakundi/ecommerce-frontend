import { redirect } from 'next/navigation';

export default function Home() {
  // Redirect root to products page
  redirect('/products');
}
