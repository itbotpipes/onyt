import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';

export default function NotFound() {
  return (
    <>
      <Nav />
      <main className="min-h-[70vh] flex flex-col items-center justify-center text-center px-6 py-24">
        <h1 className="text-7xl font-bold tracking-tight mb-4 text-[var(--fg)]">404</h1>
        <h2 className="text-2xl font-semibold mb-4 text-[var(--fg)]">Page Not Found</h2>
        <p className="text-[var(--mu)] max-w-md mb-8">
          The page you are looking for doesn’t exist or has been moved.
        </p>
        <Link
          href="/"
          className="btn inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[var(--ac)] text-black font-semibold hover:opacity-90 transition-opacity"
        >
          Return Home
        </Link>
      </main>
      <Footer />
    </>
  );
}
