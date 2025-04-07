import { Button } from "@/components/ui/button"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { Helmet } from "react-helmet"

export default function ResidentialFencing() {
  const scrollToQuote = () => {
    const quoteSection = document.getElementById('quote-form')
    if (quoteSection) {
      quoteSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <>
      <Helmet>
        <title>Residential Fence Installation in Dallas/Fort Worth - FencesTexas</title>
        <meta name="description" content="Find your perfect residential fence contractor in Dallas/Fort Worth. Expert installation of wood, iron, vinyl, and chain link fences. Get matched with ONE verified pro." />
      </Helmet>

      <Navbar />

      <main>
        <section className="py-20 bg-secondary/10">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">
              Residential Fence Installation in Dallas/Fort Worth: Find Your Perfect Match Today
            </h1>
            <h2 className="text-xl md:text-2xl text-center text-muted-foreground mb-8">
              Skip the contractor nightmares. We'll match you with ONE verified residential fence expert who specializes in your exact project.
            </h2>
            <div className="flex justify-center mb-12">
              <Button 
                className="w-full sm:w-[240px] h-[48px] text-base bg-texas-terracotta text-white hover:bg-texas-earth transition-colors"
                onClick={scrollToQuote}
              >
                Get Your Perfect Fence Match™
              </Button>
            </div>
            <div className="max-w-4xl mx-auto">
              <p className="text-muted-foreground mb-6 text-lg">
                Dallas/Fort Worth homeowners face unique challenges when installing residential fencing. From strict HOA regulations to challenging soil conditions and extreme weather, your fence project requires specialized expertise.
              </p>
              <p className="text-muted-foreground text-lg">
                At <strong>FencesTexas</strong>, we've streamlined the process of finding your perfect residential fence contractor. Our proprietary Perfect Match™ system connects you with ONE verified expert who specializes in your specific residential fence type, location, and requirements.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h3 className="text-2xl font-bold mb-6">Why Dallas/Fort Worth homeowners choose FencesTexas:</h3>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-12">
              <li>Connect with ONE contractor perfectly matched to your project - no multiple calls or sales pressure</li>
              <li>All contractors pass our rigorous 27-point verification process (81% of local fence companies fail)</li>
              <li>Save 15-22% compared to contractor direct pricing</li>
              <li>Enjoy faster installation timelines with pre-vetted professionals</li>
            </ul>

            <h2 className="text-3xl font-bold mb-8">Our Residential Fencing Options</h2>

            <div className="space-y-12">
              <div>
                <h3 className="text-2xl font-bold mb-4">Wood Fences in Dallas/Fort Worth</h3>
                <p className="text-muted-foreground">
                  The timeless appeal of wood fencing enhances any Dallas/Fort Worth property with natural beauty and security. Our network of verified wood fence contractors specializes in cedar, pine, redwood, and composite materials designed to withstand local weather conditions. From classic picket fences to modern horizontal designs, your matched contractor will deliver exceptional craftsmanship tailored to your home's aesthetic.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-bold mb-4">Ornamental Iron Fencing</h3>
                <p className="text-muted-foreground">
                  Add elegance and security with our custom ornamental iron fences. These sophisticated fences combine beauty with strength and are perfect for defining boundaries while maintaining visibility. Your matched Dallas/Fort Worth specialist creates stunning custom designs that balance security with sophisticated aesthetics. Perfect for estate properties, pool enclosures, and garden boundaries that make a lasting impression.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-bold mb-4">Vinyl Fences in Dallas/Fort Worth</h3>
                <p className="text-muted-foreground">
                  Low-maintenance vinyl fencing provides Dallas/Fort Worth homeowners with decades of beauty without the upkeep. Your matched vinyl fence specialist will help you select the perfect style and grade to complement your home while withstanding local environmental challenges. Explore privacy, semi-privacy, picket, and ranch rail options in multiple colors and textures.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-bold mb-4">Chain Link Fences in Dallas/Fort Worth</h3>
                <p className="text-muted-foreground">
                  Affordable and durable, chain link fencing remains a practical solution for Dallas/Fort Worth properties requiring security without sacrificing visibility. Your matched chain link specialist offers residential-grade options including vinyl-coated, galvanized, and decorative designs perfect for pet containment, pool safety, and property demarcation.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-bold mb-4">Custom Gates</h3>
                <p className="text-muted-foreground">
                  Enhance your fence with custom-designed gates from our verified Dallas/Fort Worth contractors. From simple garden gates to elaborate driveway entrances, your matched specialist will create beautiful, functional gates that complement your fence and provide convenient access to your property.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-bold mb-4">Custom & Specialty Fences in Dallas/Fort Worth</h3>
                <p className="text-muted-foreground">
                  Unique properties deserve distinctive fencing solutions. Your matched specialty fence contractor brings expertise in bamboo, stone/brick combinations, louvered designs, and custom fabrications that set your Dallas/Fort Worth property apart. Discover innovative solutions for challenging landscapes, unusual property lines, or one-of-a-kind design visions.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-secondary/10">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8">Why Choose FencesTexas for Your Residential Fencing?</h2>
            <ul className="space-y-4 text-muted-foreground mb-12">
              <li className="flex gap-2">
                <strong>Perfect Matching:</strong> Unlike services that sell your information to multiple companies, we connect you with just ONE perfect contractor for your specific project
              </li>
              <li className="flex gap-2">
                <strong>Quality Verification:</strong> All contractors in our network pass our rigorous 27-point verification process (81% of local fence companies fail)
              </li>
              <li className="flex gap-2">
                <strong>Local Expertise:</strong> Your matched contractor brings deep understanding of Dallas/Fort Worth's unique soil conditions, weather challenges, and local regulations
              </li>
              <li className="flex gap-2">
                <strong>No Sales Pressure:</strong> You'll never be bombarded with calls from competing contractors - just one perfect match
              </li>
              <li className="flex gap-2">
                <strong>Time & Money Savings:</strong> Skip the research and avoid the common pitfalls of hiring the wrong contractor
              </li>
            </ul>

            <h2 className="text-3xl font-bold text-center mb-6">
              Find Your Perfect Residential Fence Contractor in Dallas/Fort Worth
            </h2>
            <p className="text-center text-muted-foreground mb-8">
              Take 15 seconds to tell us about your residential fence project. Our Perfect Match™ system will connect you with the ONE verified contractor who specializes in exactly what you need.
            </p>
            <div className="flex justify-center">
              <Button 
                className="w-full sm:w-[240px] h-[48px] text-base bg-texas-terracotta text-white hover:bg-texas-earth transition-colors"
                onClick={scrollToQuote}
              >
                Get Your Perfect Fence Match™
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
} 