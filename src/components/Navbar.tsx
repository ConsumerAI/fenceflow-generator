
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { services, getServiceUrl } from '@/lib/routes';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/90 backdrop-blur-md shadow-md py-2' : 'bg-transparent py-4'
    }`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="text-texas-earth font-bold text-xl sm:text-2xl" onClick={closeMenu}>
              <span className="font-bold">Fences</span>
              <span className="text-texas-terracotta font-bold">Texas</span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-foreground hover:text-texas-terracotta transition-colors">
              Home
            </Link>
            {services.map((service) => (
              <Link 
                key={service}
                to={getServiceUrl(service)} 
                className="text-foreground hover:text-texas-terracotta transition-colors"
              >
                {service}
              </Link>
            ))}
            <Link 
              to="/fence-companies-near-me" 
              className="text-foreground hover:text-texas-terracotta transition-colors"
            >
              Near Me
            </Link>
            <a 
              href="#quote" 
              className="bg-texas-terracotta text-white px-4 py-2 rounded hover:bg-texas-earth transition-colors"
            >
              Get a Free Quote
            </a>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 animate-fade-in">
            <div className="flex flex-col space-y-4">
              <Link to="/" className="text-foreground hover:text-texas-terracotta px-4 py-2 rounded-md transition-colors" onClick={closeMenu}>
                Home
              </Link>
              {services.map((service) => (
                <Link 
                  key={service}
                  to={getServiceUrl(service)} 
                  className="text-foreground hover:text-texas-terracotta px-4 py-2 rounded-md transition-colors"
                  onClick={closeMenu}
                >
                  {service}
                </Link>
              ))}
              <Link 
                to="/fence-companies-near-me" 
                className="text-foreground hover:text-texas-terracotta px-4 py-2 rounded-md transition-colors"
                onClick={closeMenu}
              >
                Near Me
              </Link>
              <Button asChild variant="default" className="bg-texas-terracotta hover:bg-texas-earth transition-colors">
                <a href="#quote" className="flex items-center justify-center">
                  Get a Free Quote
                </a>
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
