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

  useEffect(() => {
    // Load both reCAPTCHA scripts
    const loadScript = (src: string): Promise<void> => {
      return new Promise((resolve) => {
        const script = document.createElement('script');
        script.src = src;
        script.async = true;
        script.onload = () => resolve();
        document.head.appendChild(script);
      });
    };

    // Load v3 first
    loadScript(`https://www.google.com/recaptcha/api.js?render=${env.VITE_RECAPTCHA_V3_SITE_KEY}`);
    
    // Load v2
    loadScript('https://www.google.com/recaptcha/api.js');

    return () => {
      // Cleanup scripts on unmount
      document.head.querySelectorAll('script[src*="recaptcha"]').forEach(script => {
        document.head.removeChild(script);
      });
    };
  }, []);

  const executeV3 = useCallback(async (action: string): Promise<{ token: string; score: number }> => {
    try {
      await new Promise((resolve) => window.grecaptcha.ready(resolve));
      const token = await window.grecaptcha.execute(env.VITE_RECAPTCHA_V3_SITE_KEY, { action });
      
      // In production, you would verify the token server-side and get the actual score
      // For now, we'll simulate a score
      const simulatedScore = Math.random(); // Replace with actual score from backend

      return { token, score: simulatedScore };
    } catch (error) {
      console.error('reCAPTCHA v3 error:', error);
      throw new Error('Failed to verify reCAPTCHA v3');
    }
  }, []);

  const initV2 = useCallback((containerId: string) => {
    if (!window.grecaptcha?.render) return;

    const widgetId = window.grecaptcha.render(containerId, {
      sitekey: env.VITE_RECAPTCHA_V2_SITE_KEY,
      callback: () => {
        setShowV2Captcha(false);
      }
    });
    setV2WidgetId(widgetId);
  }, []);

  const getV2Response = useCallback((): string | null => {
    if (v2WidgetId === null) return null;
    try {
      return window.grecaptcha.getResponse(v2WidgetId);
    } catch (error) {
      console.error('Failed to get reCAPTCHA v2 response:', error);
      return null;
    }
  }, [v2WidgetId]);

  const resetV2 = useCallback(() => {
    if (v2WidgetId !== null) {
      window.grecaptcha.reset(v2WidgetId);
    }
  }, [v2WidgetId]);

  return {
    executeV3,
    initV2,
    getV2Response,
    resetV2,
    showV2Captcha,
    setShowV2Captcha
  };
} 