
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4">
      <h1 className="text-4xl md:text-5xl font-bold mb-4">Page Not Found</h1>
      <p className="text-lg text-muted-foreground mb-8">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link 
        href="/"
        className="bg-texas-terracotta text-white px-6 py-3 rounded-md font-medium hover:bg-texas-earth transition-colors"
      >
        Return Home
      </Link>
    </div>
  );
}
