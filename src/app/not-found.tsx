
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center p-8 bg-white shadow-lg rounded-lg max-w-md w-full">
        <h1 className="text-5xl font-bold text-texas-terracotta mb-4">404</h1>
        <h2 className="text-2xl font-semibold mb-4">Page Not Found</h2>
        <p className="text-muted-foreground mb-6">
          We couldn't find the page you're looking for. It might have been moved or doesn't exist.
        </p>
        <Link 
          href="/" 
          className="inline-block bg-texas-terracotta text-white px-6 py-3 rounded-md hover:bg-texas-earth transition-colors"
        >
          Return to Home
        </Link>
      </div>
    </div>
  );
}
