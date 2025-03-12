
// This file exists to ensure compatibility with the index.html script tag
// The main application is served through Next.js from /app/page.tsx
console.log('Redirecting to Next.js application...');

// Force navigation to the Next.js root route if we're on a direct HTML page
if (window.location.pathname.includes('.html') || window.location.pathname === '/index') {
  window.location.href = '/';
}
