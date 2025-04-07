import { Button } from "@/components/ui/button"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import Head from "next/head"

export default function AboutUs() {
  const scrollToQuote = () => {
    const quoteSection = document.getElementById('quote-form')
    if (quoteSection) {
      quoteSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <>
      <Head>
        <title>About Us - FencesTexas</title>
        <meta name="description" content="Learn about FencesTexas and our mission to connect homeowners with the perfect fence contractor through our proprietary Perfect Match™ system." />
      </Head>

      <Navbar />

      <main>
        <section className="py-20 bg-secondary/10">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold text-center mb-8">About FencesTexas</h1>
            <div className="max-w-4xl mx-auto">
              <p className="text-muted-foreground mb-6 text-lg">
                FencesTexas takes the guesswork out of finding the right fence contractor in Dallas/Fort Worth. Unlike other services that sell your information to multiple companies, we use our proprietary Perfect Match™ system to connect you with just ONE contractor - the ideal professional for your specific project.
              </p>
              <p className="text-muted-foreground mb-6 text-lg">
                Our rigorous 27-point verification process eliminates 81% of local fence companies, ensuring you're only matched with contractors who deliver exceptional quality, reliability, and value. We understand the unique challenges of Texas fence installation - from soil conditions to HOA requirements to withstanding extreme weather.
              </p>
              <p className="text-muted-foreground mb-8 text-lg">
                When you use FencesTexas, you'll never be bombarded with calls from competing contractors. Your information is treated with respect, and you're matched with a single pre-screened expert who specializes in exactly what you need.
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
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-8">Our Plans to Picket Process</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-12 h-12 bg-texas-terracotta rounded-full flex items-center justify-center text-white text-xl font-bold mx-auto mb-4">1</div>
                <h3 className="font-semibold mb-2">Tell us about your project</h3>
                <p className="text-muted-foreground">Location, fence type, and timeline</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-texas-terracotta rounded-full flex items-center justify-center text-white text-xl font-bold mx-auto mb-4">2</div>
                <h3 className="font-semibold mb-2">Perfect Match™ System</h3>
                <p className="text-muted-foreground">Our Perfect Match™ system identifies the one contractor who's ideal for your specific needs</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-texas-terracotta rounded-full flex items-center justify-center text-white text-xl font-bold mx-auto mb-4">3</div>
                <h3 className="font-semibold mb-2">Direct Connection</h3>
                <p className="text-muted-foreground">You'll be connected directly with your matched contractor</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-texas-terracotta rounded-full flex items-center justify-center text-white text-xl font-bold mx-auto mb-4">4</div>
                <h3 className="font-semibold mb-2">Expert Installation</h3>
                <p className="text-muted-foreground">Get your fence installed by a verified expert who specializes in your project type</p>
              </div>
            </div>
            <p className="text-center text-muted-foreground mt-8 max-w-2xl mx-auto">
              Our matching service is 100% free, with no obligation. We never share your information with multiple contractors, eliminating the hassle of filtering through competing bids.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
} 