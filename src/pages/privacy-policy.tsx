import React from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const PrivacyPolicyPage = () => {
  return (
    <>
      <Helmet>
        <title>Privacy Policy | Fences Texas</title>
        <meta 
          name="description" 
          content="Learn about how Fences Texas collects, uses, and protects your personal information. Our privacy policy explains our data practices and your rights."
        />
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <Navbar />
        
        <main className="flex-grow">
          <section className="py-16 md:py-24">
            <div className="container mx-auto px-4 md:px-8">
              <div className="max-w-3xl mx-auto">
                <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
                <div className="prose prose-lg max-w-none">
                  <p className="text-muted-foreground mb-8">Last updated: {new Date().toLocaleDateString()}</p>

                  <h2 className="text-2xl font-bold mt-8 mb-4">Introduction</h2>
                  <p>
                    At Fences Texas, we take your privacy seriously. This Privacy Policy explains how we collect, use, 
                    disclose, and safeguard your information when you visit our website or use our services.
                  </p>

                  <h2 className="text-2xl font-bold mt-8 mb-4">Information We Collect</h2>
                  <h3 className="text-xl font-bold mt-6 mb-3">Personal Information</h3>
                  <p>We collect personal information that you voluntarily provide to us when you:</p>
                  <ul className="list-disc pl-6 mb-6">
                    <li>Fill out our contact or quote request forms</li>
                    <li>Sign up for our newsletter</li>
                    <li>Contact us through our website</li>
                    <li>Participate in our surveys or promotions</li>
                  </ul>
                  <p>The personal information we collect may include:</p>
                  <ul className="list-disc pl-6 mb-6">
                    <li>Name and contact information (email address, phone number, physical address)</li>
                    <li>Property details and project requirements</li>
                    <li>Communication preferences</li>
                    <li>Any other information you choose to provide</li>
                  </ul>

                  <h3 className="text-xl font-bold mt-6 mb-3">Automatically Collected Information</h3>
                  <p>When you visit our website, we automatically collect certain information about your device, including:</p>
                  <ul className="list-disc pl-6 mb-6">
                    <li>IP address</li>
                    <li>Browser type and version</li>
                    <li>Operating system</li>
                    <li>Pages visited and time spent on our website</li>
                    <li>Referring website</li>
                  </ul>

                  <h2 className="text-2xl font-bold mt-8 mb-4">How We Use Your Information</h2>
                  <p>We use the information we collect to:</p>
                  <ul className="list-disc pl-6 mb-6">
                    <li>Provide and maintain our services</li>
                    <li>Process your quote requests and connect you with contractors</li>
                    <li>Communicate with you about our services</li>
                    <li>Improve our website and user experience</li>
                    <li>Send you marketing communications (with your consent)</li>
                    <li>Comply with legal obligations</li>
                  </ul>

                  <h2 className="text-2xl font-bold mt-8 mb-4">Information Sharing</h2>
                  <p>We may share your information with:</p>
                  <ul className="list-disc pl-6 mb-6">
                    <li>Licensed contractors in your area to fulfill your quote requests</li>
                    <li>Service providers who assist in our operations</li>
                    <li>Law enforcement when required by law</li>
                    <li>Other parties with your consent</li>
                  </ul>

                  <h2 className="text-2xl font-bold mt-8 mb-4">Data Security</h2>
                  <p>
                    We implement appropriate security measures to protect your personal information. However, 
                    no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.
                  </p>

                  <h2 className="text-2xl font-bold mt-8 mb-4">Your Rights</h2>
                  <p>You have the right to:</p>
                  <ul className="list-disc pl-6 mb-6">
                    <li>Access your personal information</li>
                    <li>Correct inaccurate information</li>
                    <li>Request deletion of your information</li>
                    <li>Opt-out of marketing communications</li>
                    <li>Withdraw consent at any time</li>
                  </ul>

                  <h2 className="text-2xl font-bold mt-8 mb-4">Cookies and Tracking</h2>
                  <p>
                    We use cookies and similar tracking technologies to track activity on our website and 
                    hold certain information. You can instruct your browser to refuse all cookies or to indicate 
                    when a cookie is being sent.
                  </p>

                  <h2 className="text-2xl font-bold mt-8 mb-4">Third-Party Services</h2>
                  <p>
                    Our website may contain links to third-party websites. We are not responsible for the 
                    privacy practices of these external sites. We encourage you to read the privacy policies 
                    of any third-party websites you visit.
                  </p>

                  <h2 className="text-2xl font-bold mt-8 mb-4">Changes to This Policy</h2>
                  <p>
                    We may update our Privacy Policy from time to time. We will notify you of any changes by 
                    posting the new Privacy Policy on this page and updating the "Last updated" date.
                  </p>

                  <h2 className="text-2xl font-bold mt-8 mb-4">Contact Us</h2>
                  <p>
                    If you have any questions about this Privacy Policy, please contact us at:
                  </p>
                  <p className="mt-2">
                    Email: info@fencestexas.com<br />
                    Address: Serving the Dallas/Fort Worth Metroplex
                  </p>
                </div>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default PrivacyPolicyPage; 