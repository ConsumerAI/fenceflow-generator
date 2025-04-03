import { useEffect, useCallback, useState } from 'react';
import { env } from '@/lib/env';

declare global {
  interface Window {
    grecaptcha: {
      ready: (callback: () => void) => void;
      execute: (siteKey: string, options: { action: string }) => Promise<string>;
      render: (element: string | HTMLElement, options: any) => number;
      getResponse: (widgetId?: number) => string;
      reset: (widgetId?: number) => void;
    };
  }
}

export function useRecaptcha() {
  const [v2WidgetId, setV2WidgetId] = useState<number | null>(null);
  const [showV2Captcha, setShowV2Captcha] = useState(false);
  const [isV3Loaded, setIsV3Loaded] = useState(false);
  const [isV2Loaded, setIsV2Loaded] = useState(false);

  useEffect(() => {
    // Load reCAPTCHA v3
    const loadV3 = async () => {
      try {
        await new Promise<void>((resolve, reject) => {
          const script = document.createElement('script');
          script.src = `https://www.google.com/recaptcha/api.js?render=${env.VITE_RECAPTCHA_V3_SITE_KEY}`;
          script.async = true;
          script.defer = true;
          script.onload = () => {
            window.grecaptcha?.ready(() => {
              setIsV3Loaded(true);
              resolve();
            });
          };
          script.onerror = (error) => reject(error);
          document.head.appendChild(script);
        });
      } catch (error) {
        console.error('Failed to load reCAPTCHA v3:', error);
      }
    };

    // Load reCAPTCHA v2
    const loadV2 = async () => {
      try {
        await new Promise<void>((resolve, reject) => {
          const script = document.createElement('script');
          script.src = 'https://www.google.com/recaptcha/api.js';
          script.async = true;
          script.defer = true;
          script.onload = () => {
            setIsV2Loaded(true);
            resolve();
          };
          script.onerror = (error) => reject(error);
          document.head.appendChild(script);
        });
      } catch (error) {
        console.error('Failed to load reCAPTCHA v2:', error);
      }
    };

    loadV3();
    loadV2();

    return () => {
      // Cleanup scripts on unmount
      document.head.querySelectorAll('script[src*="recaptcha"]').forEach(script => {
        document.head.removeChild(script);
      });
      setIsV3Loaded(false);
      setIsV2Loaded(false);
    };
  }, []);

  const executeV3 = useCallback(async (action: string): Promise<{ token: string; score: number }> => {
    if (!isV3Loaded) {
      throw new Error('reCAPTCHA v3 not loaded');
    }

    try {
      const token = await window.grecaptcha.execute(env.VITE_RECAPTCHA_V3_SITE_KEY, { action });
      return { token, score: 0.9 }; // Score will be determined server-side
    } catch (error) {
      console.error('reCAPTCHA v3 execution error:', error);
      throw new Error('Failed to execute reCAPTCHA v3');
    }
  }, [isV3Loaded]);

  const initV2 = useCallback((containerId: string) => {
    if (!isV2Loaded || !window.grecaptcha?.render) {
      console.error('reCAPTCHA v2 not loaded');
      return;
    }

    try {
      const widgetId = window.grecaptcha.render(containerId, {
        sitekey: env.VITE_RECAPTCHA_V2_SITE_KEY,
        callback: () => {
          setShowV2Captcha(false);
        }
      });
      setV2WidgetId(widgetId);
    } catch (error) {
      console.error('Failed to initialize reCAPTCHA v2:', error);
    }
  }, [isV2Loaded]);

  const getV2Response = useCallback((): string | null => {
    if (!isV2Loaded || v2WidgetId === null) {
      console.error('reCAPTCHA v2 not initialized');
      return null;
    }

    try {
      return window.grecaptcha.getResponse(v2WidgetId);
    } catch (error) {
      console.error('Failed to get reCAPTCHA v2 response:', error);
      return null;
    }
  }, [isV2Loaded, v2WidgetId]);

  const resetV2 = useCallback(() => {
    if (!isV2Loaded || v2WidgetId === null) return;
    
    try {
      window.grecaptcha.reset(v2WidgetId);
    } catch (error) {
      console.error('Failed to reset reCAPTCHA v2:', error);
    }
  }, [isV2Loaded, v2WidgetId]);

  return {
    executeV3,
    initV2,
    getV2Response,
    resetV2,
    showV2Captcha,
    setShowV2Captcha,
    isV3Loaded,
    isV2Loaded
  };
} 