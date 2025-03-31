
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import LeadForm from '@/components/LeadForm';
import { Separator } from '@/components/ui/separator';
import { services } from '@/lib/routes';
import { supabase } from '@/integrations/supabase/client';

const SportsCourtContent: React.FC = () => {
  const [content, setContent] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        setIsLoading(true);
        // Use the client.functions.invoke method from the imported Supabase client
        const { data, error } = await supabase.functions.invoke('generate-city-content', {
          body: {
            cityName: "Dallas",
            serviceName: "Athletic Courts and Sports Facilities",
            prompt: "Write comprehensive content about athletic courts and sports facilities installation services, focusing on tennis courts, basketball courts, pickleball courts, and multi-sport facilities. Include information about surfacing options, equipment, lighting, and fencing specific to athletic courts."
          }
        });

        if (error) {
          console.error("Error fetching content:", error);
          return;
        }

        if (data?.content) {
          setContent(data.content);
        }
      } catch (error) {
        console.error("Error in content fetch:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchContent();
  }, []);

  return (
    <main className="flex-1 container mx-auto py-10 px-4 md:px-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2">
          <h1 className="text-4xl font-bold tracking-tight">Professional Athletic Courts & Sports Facilities</h1>
          <p className="mt-4 text-xl text-gray-600">
            Expert installation of high-performance athletic courts and sports facilities throughout the Dallas-Fort Worth metroplex
          </p>

          <div className="mt-8 prose prose-blue max-w-none">
            {isLoading ? (
              <div className="flex flex-col items-center py-10">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                <p className="mt-4 text-sm text-gray-500">Generating comprehensive court information...</p>
              </div>
            ) : (
              <div dangerouslySetInnerHTML={{ __html: content }} />
            )}

            <div className="mt-8">
              <h2 className="text-2xl font-bold">Our Athletic Court & Sports Facility Services</h2>
              <ul className="mt-4 space-y-4">
                <li className="flex gap-2">
                  <span className="text-primary font-bold">✓</span>
                  <span>Tennis court construction and resurfacing</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary font-bold">✓</span>
                  <span>Basketball court installation (indoor & outdoor)</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary font-bold">✓</span>
                  <span>Pickleball court construction</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary font-bold">✓</span>
                  <span>Multi-sport facility development</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary font-bold">✓</span>
                  <span>Sports field fencing & windscreens</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary font-bold">✓</span>
                  <span>Court lighting & electrical</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary font-bold">✓</span>
                  <span>Drainage solutions & site preparation</span>
                </li>
              </ul>
            </div>

            <div className="mt-8">
              <h2 className="text-2xl font-bold">Why Choose Our Athletic Court Construction Team?</h2>
              <p className="mt-3">
                With decades of specialized experience in athletic court construction throughout Dallas-Fort Worth, our team brings unmatched expertise to every project. We understand the unique requirements of various sports surfaces and build facilities that deliver optimal performance, safety, and durability in the Texas climate.
              </p>
              <p className="mt-3">
                Whether you're building a residential tennis court, a commercial pickleball facility, or a multi-sport complex for a school or park, our end-to-end solutions ensure your project is completed on time, within budget, and built to professional standards.
              </p>
            </div>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">Get Your Free Quote</Button>
            <Button size="lg" variant="outline">Explore Our Projects</Button>
          </div>
        </div>

        <div>
          <Card className="sticky top-20">
            <CardContent className="pt-6">
              <h3 className="text-xl font-bold mb-4">Request a Free Consultation</h3>
              <p className="text-sm text-gray-600 mb-4">
                Fill out the form below to discuss your athletic court or sports facility project with our specialists.
              </p>
              {/* Fix: Use 'city' prop instead of 'serviceType' to match LeadFormProps */}
              <LeadForm city="Dallas" />
            </CardContent>
          </Card>
        </div>
      </div>

      <Separator className="my-12" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        <div className="p-6 border rounded-lg">
          <h3 className="font-bold text-lg mb-3">Tennis Court Construction</h3>
          <p className="text-gray-600">
            Professional-grade tennis courts built to USTA specifications with high-performance surfaces designed for the Texas climate.
          </p>
        </div>
        <div className="p-6 border rounded-lg">
          <h3 className="font-bold text-lg mb-3">Pickleball Courts</h3>
          <p className="text-gray-600">
            Custom pickleball court installations with proper dimensioning, specialized surfaces, and competition-grade equipment.
          </p>
        </div>
        <div className="p-6 border rounded-lg">
          <h3 className="font-bold text-lg mb-3">Basketball Courts</h3>
          <p className="text-gray-600">
            Indoor and outdoor basketball courts featuring premium surfacing options, regulation markings, and professional equipment.
          </p>
        </div>
        <div className="p-6 border rounded-lg">
          <h3 className="font-bold text-lg mb-3">Multi-Sport Facilities</h3>
          <p className="text-gray-600">
            Versatile athletic spaces designed to accommodate multiple sports with adaptable layouts and durable all-purpose surfacing.
          </p>
        </div>
        <div className="p-6 border rounded-lg">
          <h3 className="font-bold text-lg mb-3">Athletic Court Fencing</h3>
          <p className="text-gray-600">
            Specialized sports fencing solutions including ball containment systems, windscreens, and protective barriers.
          </p>
        </div>
        <div className="p-6 border rounded-lg">
          <h3 className="font-bold text-lg mb-3">Court Resurfacing</h3>
          <p className="text-gray-600">
            Extend the life of your athletic court with professional resurfacing, crack repair, and surface restoration services.
          </p>
        </div>
      </div>
    </main>
  );
};

export default SportsCourtContent;
