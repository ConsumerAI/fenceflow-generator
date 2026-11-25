import React, { useEffect, useState } from 'react';
import { trackEvent } from '@/lib/analytics';

// Sticky mobile estimate bar (conversion round 2, Nov 25, 2026).
//
// Rendered once per rebuilt wave page by the hero LeadForm instance. On
// mobile viewports only (md:hidden), it keeps the page's estimate CTA one
// tap away at any scroll depth. Behavior rules:
// - Hidden while ANY lead form on the page is in view (the hero form or
//   the closing form), so it never covers the form it points at. Wave
//   pages carry two LeadForm instances; both tag their card with
//   data-lead-form and this bar watches all of them.
// - Hidden until the visitor has scrolled a little, so it never flashes
//   over the hero on load.
// - A tap fires estimate_bar_tap, smooth-scrolls to the form this bar
//   belongs to, and focuses the form's first field (the footage input on
//   residential pages, the ZIP input where there is no calculator).
// - Carries no copy beyond the page's own locked CTA label, so it adds
//   zero new claims.
// During prerendering it renders translated off screen; the
// IntersectionObserver takes over on the client.

interface StickyEstimateBarProps {
  label: string;
  city: string;
  formRef: { current: HTMLDivElement | null };
}

const StickyEstimateBar = ({ label, city, formRef }: StickyEstimateBarProps) => {
  const [anyFormVisible, setAnyFormVisible] = useState(true);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const forms = Array.from(document.querySelectorAll('[data-lead-form]'));
    const visible = new Set<Element>();
    let observer: IntersectionObserver | null = null;
    if (forms.length > 0 && typeof IntersectionObserver !== 'undefined') {
      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              visible.add(entry.target);
            } else {
              visible.delete(entry.target);
            }
          }
          setAnyFormVisible(visible.size > 0);
        },
        { rootMargin: '-6% 0px -6% 0px', threshold: 0 }
      );
      forms.forEach((form) => observer?.observe(form));
    } else {
      setAnyFormVisible(false);
    }
    const onScroll = () => setScrolled(window.scrollY > 160);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      observer?.disconnect();
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  const show = scrolled && !anyFormVisible;

  const handleTap = () => {
    trackEvent('estimate_bar_tap', { city });
    const form = formRef.current;
    if (!form) return;
    form.scrollIntoView({ behavior: 'smooth', block: 'start' });
    window.setTimeout(() => {
      // The honeypot input carries tabIndex -1 and is excluded; the first
      // real field of the current step gets focus.
      const field = form.querySelector<HTMLElement>('input:not([tabindex="-1"]), textarea');
      field?.focus({ preventScroll: true });
    }, 650);
  };

  return (
    <div
      aria-hidden={!show}
      className={`md:hidden fixed inset-x-0 bottom-0 z-50 transition-transform duration-300 ${
        show ? 'translate-y-0' : 'translate-y-full pointer-events-none'
      }`}
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <div className="bg-white/95 backdrop-blur-sm border-t border-secondary shadow-[0_-4px_16px_rgba(0,0,0,0.12)] px-4 py-3">
        <button
          type="button"
          onClick={handleTap}
          tabIndex={show ? 0 : -1}
          className="w-full h-[48px] rounded-md bg-texas-terracotta hover:bg-texas-earth text-white font-medium flex items-center justify-center transition-colors"
        >
          {label}
        </button>
      </div>
    </div>
  );
};

export default StickyEstimateBar;
