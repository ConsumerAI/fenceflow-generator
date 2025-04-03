import { useEffect, useCallback, useState, useRef } from 'react';
import { env } from '@/lib/env';

declare global {
  interface Window {
    grecaptcha: {
      ready: (callback: () => void) => void;
      execute: (siteKey: string, options: { action: string }) => Promise<string>;
      render: (element: string | HTMLElement, options: any) => number;
      getResponse: (widgetId?: number) => string;
      reset: (widgetId?: number) => void;
      enterprise?: any;
    };
    onRecaptchaLoad?: () => void;
  }
}

export function useRecaptcha() {
  const [v2WidgetId, setV2WidgetId] = useState<number | null>(null);
  const [showV2Captcha, setShowV2Captcha] = useState(false);
  const [isV3Loaded, setIsV3Loaded] = useState(false);
  const [isV2Loaded, setIsV2Loaded] = useState(false);
  const v3LoadPromiseRef = useRef<Promise<void>>();
  const v2LoadPromiseRef = useRef<Promise<void>>();

  // Load reCAPTCHA v3
  useEffect(() => {
    const loadV3 = async () => {
      if (v3LoadPromiseRef.current) return v3LoadPromiseRef.current;

      v3LoadPromiseRef.current = new Promise<void>((resolve, reject) => {
        try {
          // Remove any existing reCAPTCHA scripts
          document.head.querySelectorAll('script[src*="recaptcha"]').forEach(script => {
            document.head.removeChild(script);
          });

          // Create and append the script
          const script = document.createElement('script');
          script.src = `https://www.google.com/recaptcha/api.js?render=${env.VITE_RECAPTCHA_V3_SITE_KEY}`;
          script.async = true;
          script.defer = true;
          script.id = 'recaptcha-v3';

          script.onload = () => {
            window.grecaptcha?.ready(() => {
              console.log('reCAPTCHA v3 loaded successfully');
              setIsV3Loaded(true);
              resolve();
            });
          };

          script.onerror = (error) => {
            console.error('Failed to load reCAPTCHA v3:', error);
            reject(error);
          };

          document.head.appendChild(script);
        } catch (error) {
          console.error('Error in loadV3:', error);
          reject(error);
        }
      });

      return v3LoadPromiseRef.current;
    };

    loadV3().catch(console.error);

    return () => {
      const script = document.getElementById('recaptcha-v3');
      if (script) {
        document.head.removeChild(script);
      }
      setIsV3Loaded(false);
      v3LoadPromiseRef.current = undefined;
    };
  }, []);

  // Load reCAPTCHA v2
  useEffect(() => {
    const loadV2 = async () => {
      if (v2LoadPromiseRef.current) return v2LoadPromiseRef.current;

      v2LoadPromiseRef.current = new Promise<void>((resolve, reject) => {
        try {
          const script = document.createElement('script');
          script.src = 'https://www.google.com/recaptcha/api.js';
          script.async = true;
          script.defer = true;
          script.id = 'recaptcha-v2';

          script.onload = () => {
            console.log('reCAPTCHA v2 loaded successfully');
            setIsV2Loaded(true);
            resolve();
          };

          script.onerror = (error) => {
            console.error('Failed to load reCAPTCHA v2:', error);
            reject(error);
          };

          document.head.appendChild(script);
        } catch (error) {
          console.error('Error in loadV2:', error);
          reject(error);
        }
      });

      return v2LoadPromiseRef.current;
    };

    if (showV2Captcha) {
      loadV2().catch(console.error);
    }

    return () => {
      if (showV2Captcha) {
        const script = document.getElementById('recaptcha-v2');
        if (script) {
          document.head.removeChild(script);
        }
        setIsV2Loaded(false);
        v2LoadPromiseRef.current = undefined;
      }
    };
  }, [showV2Captcha]);

  const executeV3 = useCallback(async (action: string): Promise<{ token: string; score: number }> => {
    if (!isV3Loaded) {
      console.log('Waiting for reCAPTCHA v3 to load...');
      await v3LoadPromiseRef.current;
    }

    try {
      console.log('Executing reCAPTCHA v3...');
      const token = await window.grecaptcha.execute(env.VITE_RECAPTCHA_V3_SITE_KEY, { action });
      console.log('reCAPTCHA v3 execution successful');
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
      console.log('Initializing reCAPTCHA v2...');
      const widgetId = window.grecaptcha.render(containerId, {
        sitekey: env.VITE_RECAPTCHA_V2_SITE_KEY,
        callback: () => {
          console.log('reCAPTCHA v2 callback executed');
          setShowV2Captcha(false);
        }
      });
      setV2WidgetId(widgetId);
      console.log('reCAPTCHA v2 initialized successfully');
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
      const response = window.grecaptcha.getResponse(v2WidgetId);
      console.log('Got reCAPTCHA v2 response:', response ? 'success' : 'empty');
      return response;
    } catch (error) {
      console.error('Failed to get reCAPTCHA v2 response:', error);
      return null;
    }
  }, [isV2Loaded, v2WidgetId]);

  const resetV2 = useCallback(() => {
    if (!isV2Loaded || v2WidgetId === null) return;
    
    try {
      window.grecaptcha.reset(v2WidgetId);
      console.log('reCAPTCHA v2 reset successful');
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