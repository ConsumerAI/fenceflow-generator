
import Image from 'next/image';

const steps = [
  {
    title: "Free Consultation",
    description: "We start with a no-obligation consultation to understand your specific needs and property requirements.",
    icon: "📝"
  },
  {
    title: "Custom Design",
    description: "Our experts create a custom fence design tailored to your property's unique characteristics.",
    icon: "🏡"
  },
  {
    title: "Detailed Quote",
    description: "You'll receive a comprehensive quote with no hidden costs or surprises.",
    icon: "💰"
  },
  {
    title: "Permits & Preparation",
    description: "We handle all necessary permits and prepare your property for installation.",
    icon: "📋"
  },
  {
    title: "Expert Installation",
    description: "Our professional team installs your fence with precision and care to ensure longevity.",
    icon: "🔨"
  },
  {
    title: "Final Inspection",
    description: "We conduct a thorough inspection to ensure your fence meets our high standards of quality.",
    icon: "✅"
  }
];

const PlanToPickets = () => {
  return (
    <section className="py-16 md:py-24 texas-section bg-secondary/30">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">From Plan to Pickets: Our Process</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our streamlined fence installation process ensures a smooth experience from your initial consultation to the final inspection.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div 
              key={step.title}
              className="bg-background rounded-lg p-6 shadow-md border border-border hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-texas-terracotta/10 rounded-full flex items-center justify-center text-xl mr-3">
                  {step.icon}
                </div>
                <span className="text-sm font-medium text-muted-foreground">Step {index + 1}</span>
              </div>
              <h3 className="text-xl font-bold mb-2">{step.title}</h3>
              <p className="text-muted-foreground">{step.description}</p>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <div className="inline-block p-1 bg-secondary rounded-lg">
            <div className="relative h-[300px] md:h-[400px] w-[800px] max-w-full">
              <Image 
                src="https://images.squarespace-cdn.com/content/v1/60e487658384ee39ddeb139d/4d9c257b-d4c7-4206-8aa5-22623aa2f863/301399581_23852070435550391_1586117276639848672_n.jpg"
                alt="Fence installation process in Dallas"
                fill
                className="rounded-lg object-cover"
                sizes="(max-width: 800px) 100vw, 800px"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PlanToPickets;
