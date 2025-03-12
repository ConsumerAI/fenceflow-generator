
import React, { useEffect, useState } from 'react';
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { AspectRatio } from "@/components/ui/aspect-ratio";

const images = [
  { src: "star gate.jpg", alt: "Star Gate" },
  { src: "board on board with cap (1).jpg", alt: "Board on Board with Cap" },
  { src: "301399581_23852070435550391_1586117276639848672_n.jpg", alt: "Custom Fence Installation" },
  { src: "250653744_409090014266043_3222627914167174656_n.jpg", alt: "Premium Fencing" },
  { src: "swing gate.jpg", alt: "Swing Gate" },
  { src: "chain link.jpg", alt: "Chain Link Fence" },
  { src: "arch gate.jpg", alt: "Arch Gate" },
  { src: "premium gate.jpg", alt: "Premium Gate" },
  { src: "6 ft iron fence.jpg", alt: "6ft Iron Fence" },
  { src: "big arch.jpg", alt: "Big Arch" },
  // Add more images as needed
];

const ImageCarousel = () => {
  return (
    <Carousel
      opts={{
        align: "start",
        loop: true,
      }}
      className="w-full max-w-7xl mx-auto"
    >
      <CarouselContent className="-ml-2 md:-ml-4">
        {images.map((image, index) => (
          <CarouselItem key={index} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
            <div className="rounded-xl overflow-hidden">
              <AspectRatio ratio={4/3}>
                <img
                  src={image.src}
                  alt={image.alt}
                  className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
                />
              </AspectRatio>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className="hidden md:flex">
        <CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2" />
        <CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2" />
      </div>
    </Carousel>
  );
};

export default ImageCarousel;
