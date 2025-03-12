
"use client";

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const images = [
  {
    src: "https://images.squarespace-cdn.com/content/v1/60e487658384ee39ddeb139d/6d4752ad-e781-4bec-92ec-b07a9dc74a07/Board+on+Board+with+Trim+and+Cap.jpg",
    alt: "Board on Board fence with trim and cap in Dallas"
  },
  {
    src: "https://images.squarespace-cdn.com/content/v1/60e487658384ee39ddeb139d/4d9c257b-d4c7-4206-8aa5-22623aa2f863/301399581_23852070435550391_1586117276639848672_n.jpg",
    alt: "Commercial fencing project in Fort Worth"
  },
  {
    src: "https://images.squarespace-cdn.com/content/v1/60e487658384ee39ddeb139d/1709258995381-OZJ85PI1IF9KHG170S1W/GettyImages-145988391.jpg",
    alt: "Sports court fencing installation in Plano"
  },
  {
    src: "/lovable-uploads/223b3ff5-7edb-4b9f-8993-449414f2518b.png",
    alt: "Custom gate and access control solution in Arlington"
  },
  {
    src: "https://images.squarespace-cdn.com/content/v1/60e487658384ee39ddeb139d/7426f5b7-ded7-4a47-bc45-c4cb46fec966/star+gate.jpg",
    alt: "Automatic gate installation in Frisco"
  }
];

const ImageCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  // Minimum swipe distance (in px)
  const minSwipeDistance = 50;

  const nextSlide = useCallback(() => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
    
    setTimeout(() => {
      setIsAnimating(false);
    }, 500); // Match this with the transition duration
  }, [isAnimating]);

  const prevSlide = useCallback(() => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
    
    setTimeout(() => {
      setIsAnimating(false);
    }, 500); // Match this with the transition duration
  }, [isAnimating]);

  // Auto-advance slides
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    
    return () => clearInterval(interval);
  }, [nextSlide]);

  // Touch event handlers
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isSwipeLeft = distance > minSwipeDistance;
    const isSwipeRight = distance < -minSwipeDistance;
    
    if (isSwipeLeft) {
      nextSlide();
    }
    
    if (isSwipeRight) {
      prevSlide();
    }
  };

  return (
    <div className="relative overflow-hidden rounded-xl shadow-md">
      {/* Main Image Container */}
      <div 
        className="relative w-full h-[300px] md:h-[500px]"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {images.map((image, index) => (
          <div
            key={index}
            className={cn(
              "absolute top-0 left-0 w-full h-full opacity-0 transition-opacity duration-500",
              { "opacity-100": index === currentIndex }
            )}
          >
            <div style={{ display: index === currentIndex ? 'block' : 'none', width: '100%', height: '100%', position: 'relative' }}>
              <Image
                src={image.src}
                alt={image.alt}
                fill
                priority={index === 0}
                sizes="(max-width: 768px) 100vw, 80vw"
                style={{ objectFit: 'cover' }}
              />
            </div>
          </div>
        ))}
        
        {/* Navigation buttons */}
        <Button
          onClick={prevSlide}
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full p-2 w-10 h-10"
          aria-label="Previous image"
          variant="ghost"
        >
          <ChevronLeft size={24} />
        </Button>
        
        <Button
          onClick={nextSlide}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full p-2 w-10 h-10"
          aria-label="Next image"
          variant="ghost"
        >
          <ChevronRight size={24} />
        </Button>
      </div>
      
      {/* Thumbnail Navigation */}
      <div className="flex justify-center gap-2 mt-4 px-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              if (!isAnimating) {
                setIsAnimating(true);
                setCurrentIndex(index);
                setTimeout(() => setIsAnimating(false), 500);
              }
            }}
            className={cn(
              "w-2 h-2 rounded-full transition-all",
              index === currentIndex
                ? "bg-texas-terracotta w-4"
                : "bg-gray-300 hover:bg-gray-400"
            )}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageCarousel;
