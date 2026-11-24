import React from 'react';
import { renderToPipeableStream } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { HelmetProvider } from 'react-helmet-async';
import { Writable } from 'node:stream';
import AppRoutes from './AppRoutes';

/**
 * Server-render entry used only by scripts/prerender.mjs at build time.
 * Renders a route to full HTML (waiting for all Suspense boundaries, so
 * lazy-loaded sections are included) and returns the react-helmet-async
 * head state for the prerenderer to merge into the page <head>.
 */
export function render(url: string): Promise<{ html: string; helmet: any }> {
  const helmetContext: { helmet?: any } = {};

  const jsx = (
    <HelmetProvider context={helmetContext}>
      <StaticRouter location={url}>
        <AppRoutes />
      </StaticRouter>
    </HelmetProvider>
  );

  return new Promise((resolve, reject) => {
    let html = '';
    const sink = new Writable({
      write(chunk, _encoding, callback) {
        html += chunk.toString();
        callback();
      },
    });
    sink.on('finish', () => resolve({ html, helmet: helmetContext.helmet }));
    sink.on('error', reject);

    const { pipe } = renderToPipeableStream(jsx, {
      onAllReady() {
        pipe(sink);
      },
      onShellError(error) {
        reject(error);
      },
      onError(error) {
        console.error(`[entry-server] render error for ${url}:`, error);
      },
    });
  });
}
