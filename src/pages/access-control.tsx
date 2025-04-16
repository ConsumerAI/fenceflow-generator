import { Button } from "@/components/ui/button"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { Helmet } from "react-helmet"

export default function AccessControl() {
  const scrollToQuote = () => {
    const quoteSection = document.getElementById('quote-form')
    if (quoteSection) {
      quoteSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <>
      <Helmet>
        <title>Access Control Installation in Dallas/Fort Worth - FencesTexas</title>
        <meta name="description" content="Find your perfect access control contractor in Dallas/Fort Worth. Expert installation of gates, keypads, and security systems. Get matched with ONE verified pro." />
      </Helmet>

      <Navbar />

      <main>
        <section className="py-20 bg-secondary/10">
          <div className="container mx-auto px-4">
            <div className="inline-block px-4 py-1 bg-texas-terracotta/10 rounded-full text-texas-terracotta text-sm font-medium text-center mx-auto mb-4">
              DFW's #1 Access Control Contractor Network
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">
              Top-Rated Access Control Installation in DFW
            </h1>
            <h2 className="text-2xl md:text-3xl lg:text-4xl text-center text-muted-foreground mb-8">
              Fast, Precise Matching to Your Ideal Security Specialist
            </h2>
            <div className="max-w-4xl mx-auto">
              <p className="text-muted-foreground mb-6 text-lg text-justify">
                Finding the right access control specialist in DFW shouldn't be a security risk itself. Our Perfect Match system connects you with the single most qualified expert for your needs.
              </p>
              <p className="text-muted-foreground mb-8 text-lg text-justify">
                Don't compromise on security. While others are collecting quotes from random contractors, you'll be one step closer to a secure property. Get matched with your perfect pro today.
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