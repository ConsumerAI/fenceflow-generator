import { Button } from "@/components/ui/button"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { Helmet } from "react-helmet"

export default function SportsCourts() {
  const scrollToQuote = () => {
    const quoteSection = document.getElementById('quote-form')
    if (quoteSection) {
      quoteSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <>
      <Helmet>
        <title>Athletic Courts and Sports Facilities in Dallas/Fort Worth - FencesTexas</title>
        <meta name="description" content="Find your perfect sports court contractor in Dallas/Fort Worth. Expert construction of tennis courts, basketball courts, and more. Get matched with ONE verified pro." />
      </Helmet>

      <Navbar />

      <main>
        <section className="py-20 bg-secondary/10">
          <div className="container mx-auto px-4">
            <div className="inline-block px-4 py-1 bg-texas-terracotta/10 rounded-full text-texas-terracotta text-sm font-medium text-center mx-auto mb-4">
              DFW's #1 Sports Court Contractor Network
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">
              Stop Planning, Start Playing
            </h1>
            <h2 className="text-2xl md:text-3xl lg:text-4xl text-center text-muted-foreground mb-8">
              Your Dedicated Sports Facility Expert in DFW - Built for Performance
            </h2>
            <div className="max-w-4xl mx-auto">
              <p className="text-muted-foreground mb-6 text-lg text-justify">
                Ready to transform your DFW property with a professional athletic court? Skip the endless contractor search. Our network includes only the most qualified sports facility specialists.
              </p>
              <p className="text-muted-foreground mb-8 text-lg text-justify">
                From tennis courts to pickleball facilities, we match you with the top contractor who understands the unique requirements of athletic court construction. Get started on your dream court today.
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
