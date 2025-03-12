
// This file exists to ensure compatibility with the index.html script tag
// The main application is served through Next.js from /app/page.tsx
console.log('Initializing application...');

// Prevent redirect loops by checking if we're already on the right path
if ((window.location.pathname.includes('.html') || window.location.pathname === '/index') 
    && window.location.search !== '?redirected=true') {
  window.location.href = '/?redirected=true';
}
