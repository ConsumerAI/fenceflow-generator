import React from 'react';
import { Link } from 'react-router-dom';
import { cities, getCityUrl } from '@/lib/cities';
import { Mail, MapPin } from 'lucide-react';
import { getServiceUrl } from '@/lib/routes';

const Footer = () => {
  // Display only a subset of cities in the footer to avoid overwhelming it
  const featuredCities = cities.slice(0, 15);
  
  return (
    <footer className="bg-texas-earth text-white">
      <div className="container mx-auto px-4 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Information */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold">
              <span className="font-bold">Fences</span>
              <span className="text-texas-sand font-bold">Texas</span>
            </h3>
            <p className="text-texas-sand/90">DFW's Premier Fence Installation Experts</p>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Mail size={16} className="text-texas-sand" />
                <a href="mailto:info@fencestexas.com" className="hover:text-texas-sand transition-colors">info@fencestexas.com</a>
              </div>
              <div className="flex items-start gap-2">
                <MapPin size={16} className="text-texas-sand mt-1" />
                <span>Serving the entire Dallas/Fort Worth Metroplex</span>
              </div>
            </div>
          </div>
          
          {/* Services */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold">Services</h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  to={getServiceUrl("Residential Fencing")} 
                  className="hover:text-texas-sand transition-colors"
                >
                  Residential Fencing
                </Link>
              </li>
              <li>
                <Link 
                  to={getServiceUrl("Commercial Fencing")} 
                  className="hover:text-texas-sand transition-colors"
                >
                  Commercial Fencing
                </Link>
              </li>
              <li>
                <Link 
                  to={getServiceUrl("Sports Courts")} 
                  className="hover:text-texas-sand transition-colors"
                >
                  Sports Courts
                </Link>
              </li>
              <li>
                <Link 
                  to={getServiceUrl("Access Control")} 
                  className="hover:text-texas-sand transition-colors"
                >
                  Access Control
                </Link>
              </li>
              <li>
                <Link 
                  to={getServiceUrl("Automatic Gates")} 
                  className="hover:text-texas-sand transition-colors"
                >
                  Automatic Gates
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Featured Cities */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold">Featured Cities</h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2">
              {featuredCities.map((city) => (
                <li key={city}>
                  <Link 
                    to={getCityUrl(city)} 
                    className="hover:text-texas-sand transition-colors"
                  >
                    {city}
                  </Link>
                </li>
              ))}
              <li>
                <Link 
                  to="/" 
                  className="hover:text-texas-sand transition-colors font-medium"
                >
                  View All Cities →
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="hover:text-texas-sand transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/fence-companies-near-me" className="hover:text-texas-sand transition-colors">Fence Companies Near Me</Link>
              </li>
              <li>
                <a href="#quote" className="hover:text-texas-sand transition-colors">Get a Free Quote</a>
              </li>
              <li>
                <Link to="/privacy-policy" className="hover:text-texas-sand transition-colors">Privacy Policy</Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-white/20 text-center text-texas-sand/80 text-sm">
          <p>&copy; {new Date().getFullYear()} Fences Texas. All rights reserved.</p>
          <p className="mt-2">
            Serving high-quality fence installations throughout the Dallas/Fort Worth Metroplex. <br />
            <span className="font-semibold">Transform your space with a fence you'll love!</span>
          </p>
        </div>

        {/* Disclaimer Section */}
        <div className="mt-8 pt-8 border-t border-white/20 text-center text-texas-sand/80 text-sm">
          <p className="mb-4">
            Disclaimer: FencesTexas is a lead generation service, not a fence installation company. We connect homeowners with licensed contractors in your area, but we do not perform installations ourselves. The information on this site is for informational purposes only and does not guarantee services.
          </p>
          <p className="mb-4">
            This site is not a part of Google, Facebook, or YouTube websites and is not endorsed by them in any way. FACEBOOK is a trademark of Facebook, Inc., and YOUTUBE is a trademark of Google Inc..
          </p>
          <p>
            FencesTexas is not affiliated with any specific contractor or manufacturer. All trademarks and logos are the property of their respective owners.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
