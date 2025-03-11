
import React from 'react';
import { Link } from 'react-router-dom';
import { cities, getCityUrl } from '@/lib/cities';
import { Phone, Mail, MapPin } from 'lucide-react';

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
                <Phone size={16} className="text-texas-sand" />
                <a href="tel:555-123-4567" className="hover:text-texas-sand transition-colors">555-123-4567</a>
              </div>
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
                <a href="#residential" className="hover:text-texas-sand transition-colors">Residential Fencing</a>
              </li>
              <li>
                <a href="#commercial" className="hover:text-texas-sand transition-colors">Commercial Fencing</a>
              </li>
              <li>
                <a href="#sports" className="hover:text-texas-sand transition-colors">Sports Courts</a>
              </li>
              <li>
                <a href="#access" className="hover:text-texas-sand transition-colors">Access Control</a>
              </li>
              <li>
                <a href="#gates" className="hover:text-texas-sand transition-colors">Automatic Gates</a>
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
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-white/20 text-center text-texas-sand/80 text-sm">
          <p>&copy; {new Date().getFullYear()} Fences Texas. All rights reserved.</p>
          <p className="mt-2">
            Serving new fence installations throughout the Dallas/Fort Worth Metroplex. <br />
            <span className="font-semibold">We specialize in new installations only - no repairs.</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
