
// This file exists to ensure compatibility with the index.html script tag
// The main application is served through Next.js from /app/page.tsx
console.log('Initializing application...');

// Redirect to the proper Next.js route if needed
if (window.location.pathname === '/index' || window.location.pathname === '/index.html') {
  window.location.replace('/');
}
