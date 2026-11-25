import React from 'react';
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { AspectRatio } from "@/components/ui/aspect-ratio";

// Self-hosted partner photos (wave 1 photo library). Captions stay
// descriptive: no location or job claim attaches to a photo until the
// partner confirms which job it depicts.
const images = [
  {
    src: "/images/pickleball-complex.jpg",
    alt: "Pickleball court complex with blue playing surfaces, black chain-link enclosures, and LED court lighting"
  },
  {
    src: "/images/residential-board-on-board.jpg",
    alt: "Board-on-board cedar privacy fence with trim and cap rail on a stone base in a suburban backyard"
  },
  {
    src: "/images/automatic-gate-star.jpg",
    alt: "Black wrought-iron double swing driveway gate with Texas star medallions"
  },
  {
    src: "/images/commercial-fencing.jpg",
    alt: "Black ornamental steel picket fence enclosing a playground in front of a brick institutional building"
  },
  {
    src: "/images/tennis-court.jpg",
    alt: "Tennis court with blue surface and pickleball lines, chain-link fencing with windscreens"
  },
];

const ImageCarousel = () => {
  return (
    <div className="relative overflow-hidden">
      <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory">
        {images.map((image, index) => (
          <div 
            key={index}
            className="flex-none w-full md:w-1/2 lg:w-1/3 snap-center"
          >
            <img
              src={image.src}
              alt={image.alt}
              loading="lazy"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="w-full h-64 object-cover rounded-lg shadow-md"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageCarousel;
