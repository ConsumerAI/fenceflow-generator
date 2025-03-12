
import React from 'react';
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { AspectRatio } from "@/components/ui/aspect-ratio";

const images = [
  { 
    src: "https://images.squarespace-cdn.com/content/v1/60e487658384ee39ddeb139d/7426f5b7-ded7-4a47-bc45-c4cb46fec966/star+gate.jpg", 
    alt: "Star Gate" 
  },
  { 
    src: "https://images.squarespace-cdn.com/content/v1/60e487658384ee39ddeb139d/eb1f813d-4dfc-49b4-815b-a591105baf91/board+on+board+with+cap+%281%29.jpg", 
    alt: "Board on Board with Cap" 
  },
  { 
    src: "https://images.squarespace-cdn.com/content/v1/60e487658384ee39ddeb139d/4d9c257b-d4c7-4206-8aa5-22623aa2f863/301399581_23852070435550391_1586117276639848672_n.jpg", 
    alt: "Custom Fence Installation" 
  },
  { 
    src: "https://images.squarespace-cdn.com/content/v1/60e487658384ee39ddeb139d/41047f74-e589-4e47-9901-0a42f44cf93e/250653744_409090014266043_3222627914167174656_n.jpg", 
    alt: "Premium Fencing" 
  },
  { 
    src: "https://images.squarespace-cdn.com/content/v1/60e487658384ee39ddeb139d/d468e42c-458e-47dd-b7ab-30ce2f609f24/swing+gate.jpg", 
    alt: "Swing Gate" 
  },
  { 
    src: "https://images.squarespace-cdn.com/content/v1/60e487658384ee39ddeb139d/6008a1af-90e3-4b28-97c1-17a54f240651/chain+link.jpg", 
    alt: "Chain Link Fence" 
  },
  { 
    src: "https://images.squarespace-cdn.com/content/v1/60e487658384ee39ddeb139d/482972a7-42a0-46aa-956c-1610c7cb1287/arch+gate.jpg", 
    alt: "Arch Gate" 
  },
  { 
    src: "https://images.squarespace-cdn.com/content/v1/60e487658384ee39ddeb139d/c68b069f-67ff-4fef-8914-750c9061a801/premium+gate.jpg", 
    alt: "Premium Gate" 
  },
  { 
    src: "https://images.squarespace-cdn.com/content/v1/60e487658384ee39ddeb139d/abab1f98-b203-4580-a915-4ac500816c25/6+ft+iron+fence.jpg", 
    alt: "6ft Iron Fence" 
  },
  { 
    src: "https://images.squarespace-cdn.com/content/v1/60e487658384ee39ddeb139d/9cc9545f-ef7d-4c00-96c1-506775f0923f/big+arch.jpg", 
    alt: "Big Arch" 
  },
  { 
    src: "https://images.squarespace-cdn.com/content/v1/60e487658384ee39ddeb139d/4e99ff68-71da-479b-bb08-ae22e7ba19fa/large+gate.jpg", 
    alt: "Large Gate" 
  },
  { 
    src: "https://images.squarespace-cdn.com/content/v1/60e487658384ee39ddeb139d/88cece56-6000-41dc-9d24-a59ae99ed945/horizontal+gate.jpg", 
    alt: "Horizontal Gate" 
  },
  { 
    src: "https://images.squarespace-cdn.com/content/v1/60e487658384ee39ddeb139d/4faaee65-1898-4b8d-84d8-7f308a9711c3/8%27+Board+on+Board+Cedar+with+trim.jpg", 
    alt: "8' Board on Board Cedar with Trim" 
  },
  { 
    src: "https://images.squarespace-cdn.com/content/v1/60e487658384ee39ddeb139d/1657241663603-W8HVZPIEH5JRXAZI6HHU/EcoStone_hero_c_1200x460_0_0.jpg", 
    alt: "EcoStone Fencing" 
  },
  { 
    src: "https://images.squarespace-cdn.com/content/v1/60e487658384ee39ddeb139d/bdc09f0d-bc47-40f7-a7f4-7d3ff5e4afe8/Fence+around+pool.jpg", 
    alt: "Fence Around Pool" 
  },
  { 
    src: "https://images.squarespace-cdn.com/content/v1/60e487658384ee39ddeb139d/ccdfc14a-648c-4bf4-96e6-f3afc8185472/6+horizontal.jpg", 
    alt: "6 Horizontal" 
  },
  { 
    src: "https://images.squarespace-cdn.com/content/v1/60e487658384ee39ddeb139d/f060df17-22b9-4bc4-a738-d160ed76f293/186558373_1101474877008078_2902719414127967136_n.jpg", 
    alt: "Quality Fence Installation" 
  },
  { 
    src: "https://images.squarespace-cdn.com/content/v1/60e487658384ee39ddeb139d/ca51a2bf-e6b2-47ba-a5d7-629528fa2916/swing+gate+with+walk+gate.jpg", 
    alt: "Swing Gate with Walk Gate" 
  },
  { 
    src: "https://images.squarespace-cdn.com/content/v1/60e487658384ee39ddeb139d/0703cd8d-7a41-49b1-a2ae-edac114974af/244665094_391493876025657_560613680195607283_n.jpg", 
    alt: "Custom Gate Installation" 
  },
  { 
    src: "https://images.squarespace-cdn.com/content/v1/60e487658384ee39ddeb139d/37e9bdb4-ac7f-44f4-83d1-1e74efb5cc84/pool+fence+3.jpg", 
    alt: "Pool Fence" 
  },
  { 
    src: "https://images.squarespace-cdn.com/content/v1/60e487658384ee39ddeb139d/5a400be2-a8ad-40a6-bd20-71ec802a5553/arched.jpg", 
    alt: "Arched Fence" 
  },
  { 
    src: "https://images.squarespace-cdn.com/content/v1/60e487658384ee39ddeb139d/9f9d658b-4134-4e4a-aa12-e03ccf6e1d71/230039936_346631083845270_8462481018940726110_n.jpg", 
    alt: "Custom Residential Fence" 
  },
  { 
    src: "https://images.squarespace-cdn.com/content/v1/60e487658384ee39ddeb139d/1657247463640-TY95FYCBL8KG1TOUKVPG/Commercial+Vinyl+Prefab.jpg", 
    alt: "Commercial Vinyl Prefab" 
  },
  { 
    src: "https://images.squarespace-cdn.com/content/v1/60e487658384ee39ddeb139d/1657248837834-QXYKG93WEDKWL5TG5C0W/Fence+Fanatics+Board+on+Board+Cedar+Wood+Fence+with+Metal+Poles+6-ft+by+Pool+Flower+Mound+Texas.JPG", 
    alt: "Board on Board Cedar Wood Fence with Metal Poles" 
  },
  { 
    src: "https://images.squarespace-cdn.com/content/v1/60e487658384ee39ddeb139d/6d4752ad-e781-4bec-92ec-b07a9dc74a07/Board+on+Board+with+Trim+and+Cap.jpg", 
    alt: "Board on Board with Trim and Cap" 
  },
  { 
    src: "https://images.squarespace-cdn.com/content/v1/60e487658384ee39ddeb139d/c7b1c87f-56ac-4c57-a034-ceb18cbaeb3d/Untitled.jpg", 
    alt: "Custom Fence Design" 
  },
  { 
    src: "https://images.squarespace-cdn.com/content/v1/60e487658384ee39ddeb139d/1657242783431-8WWI5UKICD473Y96967H/Metal+Gate.jpg", 
    alt: "Metal Gate" 
  },
  { 
    src: "https://images.squarespace-cdn.com/content/v1/60e487658384ee39ddeb139d/ee6356dc-781e-460b-a39a-ff68a8b8518e/20221104_163952622_iOS.jpg", 
    alt: "Premium Fence Installation" 
  },
  { 
    src: "https://images.squarespace-cdn.com/content/v1/60e487658384ee39ddeb139d/0962f678-44b7-4ae9-992d-acf0e0460ebf/340955818_176308655288066_7935929201646776783_n.jpg", 
    alt: "Contemporary Fence Design" 
  },
  { 
    src: "https://images.squarespace-cdn.com/content/v1/60e487658384ee39ddeb139d/d00b3924-8e2a-433d-9505-c5c1f2420c4d/338017952_6031171583637290_363539705782710292_n.jpg", 
    alt: "Decorative Gate" 
  },
  { 
    src: "https://images.squarespace-cdn.com/content/v1/60e487658384ee39ddeb139d/5e4d1974-ced4-4cab-a50e-bf9d7ce5d05b/343601946_258141836577061_8442533529579760942_n.jpg", 
    alt: "Cedar Fence Installation" 
  },
  { 
    src: "https://images.squarespace-cdn.com/content/v1/60e487658384ee39ddeb139d/97427ea3-d8dc-41f1-9d17-aa7ab3317537/343608917_254594463803609_6781424198442925830_n.jpg", 
    alt: "Quality Fence Craftsmanship" 
  },
  { 
    src: "https://images.squarespace-cdn.com/content/v1/60e487658384ee39ddeb139d/61716ed1-f956-4014-be85-00af7d465322/346825346_253923387170950_3597103436662455732_n.jpg", 
    alt: "Modern Fence Design" 
  },
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
