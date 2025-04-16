import { Button } from "@/components/ui/button"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { Helmet } from "react-helmet"
import DynamicContent from "@/components/DynamicContent"
import { ServiceType } from "@/lib/types"
import SocialProof from "@/components/SocialProof"

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
            <div className="inline-block px-4 py-1 bg-texas-terracotta/10 rounded-full text-texas-terracotta text-sm font-medium text-center mx-auto mb-4">
              DFW's #1 Residential Fencing Contractor Network
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">
              Effortless Residential Fencing
            </h1>
            <h2 className="text-2xl md:text-3xl lg:text-4xl text-center text-muted-foreground mb-8">
              We Guarantee the Perfect Contractor for Your Project
            </h2>
            <div className="max-w-4xl mx-auto">
              <p className="text-muted-foreground mb-6 text-lg text-justify">
                Tired of the time-consuming hassle of researching countless residential fencing contractors in DFW, sifting through conflicting quotes, and wondering if you've made the right choice? FencesTexas eliminates that frustration.
              </p>
              <p className="text-muted-foreground mb-8 text-lg text-justify">
                Our revolutionary matching system does the heavy lifting, connecting you with the *single*, most qualified and specialized residential fence expert for your exact project needs in DFW – guaranteed. Say goodbye to wasted hours and hello to a seamless, confident path to the perfect fence for your home.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button 
                className="w-full sm:w-[240px] h-[48px] text-base bg-texas-terracotta text-white hover:bg-texas-earth transition-colors"
                onClick={scrollToQuote}
              >
                Get Your Perfect Fence Match™
              </Button>
              <SocialProof />
            </div>
          </div>
        </section>

        <DynamicContent cityName="Dallas" serviceName={ServiceType.ResidentialFencing} />

        <section className="py-16 bg-secondary/10">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-6">
              Find Your Perfect Residential Fence Contractor in Dallas/Fort Worth
            </h2>
            <p className="text-center text-muted-foreground mb-8">
              Take 15 seconds to tell us about your residential fence project. Our Perfect Match™ system will connect you with the ONE verified contractor who specializes in exactly what you need.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button 
                className="w-full sm:w-[240px] h-[48px] text-base bg-texas-terracotta text-white hover:bg-texas-earth transition-colors"
                onClick={scrollToQuote}
              >
                Get Your Perfect Fence Match™
              </Button>
              <SocialProof />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
} 