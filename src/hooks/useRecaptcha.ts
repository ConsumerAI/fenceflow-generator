import { useEffect, useCallback, useState, useRef } from 'react';
import { env } from '@/lib/env';

// reCAPTCHA Enterprise keys
const RECAPTCHA_V2_KEY = '6LcFewkrAAAAAA_wOLvhaJDi81i_-Y6_-ONwIpnz';
const RECAPTCHA_V3_KEY = '6LeEdQkrAAAAAI1P7Tj_bNCck6aXpH9cZxFszIA2';

declare global {
  interface Window {
    grecaptcha: {
      enterprise: {
        ready: (callback: () => void) => void;
        execute: (siteKey: string, options: { action: string }) => Promise<string>;
        render: (element: string | HTMLElement, options: any) => number;
        getResponse: (widgetId?: number) => string;
        reset: (widgetId?: number) => void;
      };
    };
    onRecaptchaLoad?: () => void;
  }
}

export function useRecaptcha() {
  const [v2WidgetId, setV2WidgetId] = useState<number | null>(null);
  const [showV2Captcha, setShowV2Captcha] = useState(false);
  const [isV3Loaded, setIsV3Loaded] = useState(false);

  // Initialize Enterprise reCAPTCHA
  useEffect(() => {
    const checkV3Loaded = () => {
      if (window.grecaptcha?.enterprise) {
        window.grecaptcha.enterprise.ready(() => {
          console.log('reCAPTCHA Enterprise ready');
          setIsV3Loaded(true);
        });
      }
    };

    // Check immediately
    checkV3Loaded();

    // Also check after a short delay in case script is still loading
    const timeoutId = setTimeout(checkV3Loaded, 1000);

    return () => clearTimeout(timeoutId);
  }, []);

  const executeV3 = useCallback(async (action: string): Promise<{ token: string; score: number }> => {
    if (!window.grecaptcha?.enterprise) {
      throw new Error('reCAPTCHA Enterprise not loaded');
    }

    try {
      console.log('Executing reCAPTCHA v3 Enterprise...');
      const token = await window.grecaptcha.enterprise.execute(RECAPTCHA_V3_KEY, { action });
      console.log('reCAPTCHA v3 Enterprise execution successful');
      return { token, score: 0.9 }; // Score will be determined server-side
    } catch (error) {
      console.error('reCAPTCHA v3 Enterprise execution error:', error);
      throw new Error('Failed to execute reCAPTCHA v3');
    }
  }, []);

  const initV2 = useCallback((containerId: string) => {
    if (!window.grecaptcha?.enterprise) {
      console.error('reCAPTCHA Enterprise not loaded');
      return;
    }

    try {
      console.log('Initializing reCAPTCHA v2 Enterprise...');
      const widgetId = window.grecaptcha.enterprise.render(containerId, {
        sitekey: RECAPTCHA_V2_KEY,
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
  }, []);

  const getV2Response = useCallback((): string | null => {
    if (!window.grecaptcha?.enterprise || v2WidgetId === null) {
      console.error('reCAPTCHA v2 not initialized');
      return null;
    }

    try {
      const response = window.grecaptcha.enterprise.getResponse(v2WidgetId);
      console.log('Got reCAPTCHA v2 response:', response ? 'success' : 'empty');
      return response;
    } catch (error) {
      console.error('Failed to get reCAPTCHA v2 response:', error);
      return null;
    }
  }, [v2WidgetId]);

  const resetV2 = useCallback(() => {
    if (!window.grecaptcha?.enterprise || v2WidgetId === null) return;
    
    try {
      window.grecaptcha.enterprise.reset(v2WidgetId);
      console.log('reCAPTCHA v2 reset successful');
    } catch (error) {
      console.error('Failed to reset reCAPTCHA v2:', error);
    }
  }, [v2WidgetId]);

  return {
    executeV3,
    initV2,
    getV2Response,
    resetV2,
    showV2Captcha,
    setShowV2Captcha,
    isV3Loaded
  };
} 