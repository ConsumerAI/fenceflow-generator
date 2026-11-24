import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import './App.css';
import AppRoutes from './AppRoutes';

/**
 * Browser entry: the route tree lives in AppRoutes.tsx so the build-time
 * prerenderer (entry-server.tsx) can render the exact same routes with a
 * StaticRouter.
 */
function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
