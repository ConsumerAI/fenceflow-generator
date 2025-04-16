import { Button } from "@/components/ui/button"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { Helmet } from "react-helmet"

export default function CommercialFencing() {
  const scrollToQuote = () => {
    const quoteSection = document.getElementById('quote-form')
    if (quoteSection) {
      quoteSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <>
      <Helmet>
        <title>Commercial Fence Installation in Dallas/Fort Worth - FencesTexas</title>
        <meta name="description" content="Find your perfect commercial fence contractor in Dallas/Fort Worth. Expert installation for businesses, industrial sites, and commercial properties. Get matched with ONE verified pro." />
      </Helmet>

      <Navbar />

      <main>
        <section className="py-20 bg-secondary/10">
          <div className="container mx-auto px-4">
            <div className="inline-block px-4 py-1 bg-texas-terracotta/10 rounded-full text-texas-terracotta text-sm font-medium text-center mx-auto mb-4">
              DFW's #1 Commercial Fencing Contractor Network
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">
              Fast, Quality Commercial Fencing in DFW
            </h1>
            <h2 className="text-2xl md:text-3xl lg:text-4xl text-center text-muted-foreground mb-8">
              Your Hassle-Free Perfect Contractor Match
            </h2>
            <div className="max-w-4xl mx-auto">
              <p className="text-muted-foreground mb-6 text-lg text-justify">
                What if finding your ideal DFW commercial fencing contractor took less time than reading this paragraph? FencesTexas eliminates the frustrations business owners face—multiple contractor calls, conflicting quotes, and wasted hours.
              </p>
              <p className="text-muted-foreground mb-8 text-lg text-justify">
                Our proprietary matching algorithm identifies the single most qualified local specialist for your exact project needs. While others waste days comparison shopping, DFW businesses who use our 15-second matching service move directly to project execution, securing their properties faster and with complete confidence.
              </p>
            </div>
            <div className="flex justify-center mb-12">
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