import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { services, getServiceUrl } from '@/lib/routes';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

interface NavbarProps {
  transparent?: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ transparent = false }) => {
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
  
  const scrollToQuote = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    closeMenu();
    
    const quoteElement = document.getElementById('quote');
    
    if (quoteElement) {
      window.location.hash = 'quote';
      
      quoteElement.scrollIntoView({ 
        behavior: 'smooth',
        block: 'center'
      });
      
      quoteElement.classList.add('animate-shake');
      setTimeout(() => {
        quoteElement.classList.remove('animate-shake');
      }, 2000);
    }
  };

  const navigation = [
    {
      name: "Residential Fencing",
      href: "/residential-fencing",
    },
    {
      name: "Commercial Fencing",
      href: "/commercial-fencing",
    },
    {
      name: "Athletic Courts and Sports Facilities",
      href: "/athletic-courts-and-sports-facilities",
    },
    {
      name: "Access Control",
      href: "/access-control",
    },
    {
      name: "Automatic Gates",
      href: "/automatic-gates",
    },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/90 backdrop-blur-md shadow-md py-2' : 'bg-transparent py-4'
    }`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="flex items-center font-bold text-xl sm:text-2xl" onClick={closeMenu}>
              <span className="text-texas-earth font-bold">Fences</span>
              <span className="text-texas-terracotta font-bold">Texas</span>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            {services.map((service) => (
              <Link 
                key={service}
                to={getServiceUrl(service)} 
                className="text-foreground hover:text-texas-terracotta transition-colors"
              >
                {service}
              </Link>
            ))}
            <Link to="/commercial-fencing">
              <span className="text-muted-foreground hover:text-foreground transition-colors">
                Commercial Fencing
              </span>
            </Link>
            <Button
              className="bg-texas-terracotta text-white hover:bg-texas-earth transition-colors"
              onClick={scrollToQuote}
            >
              Get Your Perfect Fence Match™
            </Button>
          </div>
          
          <div className="md:hidden flex items-center">
            <Sheet open={isMenuOpen} onOpenChange={toggleMenu}>
              <SheetTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  aria-label="Toggle menu"
                >
                  {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </Button>
              </SheetTrigger>
              <SheetContent>
                <div className="flex flex-col space-y-4 mt-8">
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
                  <Link to="/commercial-fencing">
                    <span className="text-foreground hover:text-foreground px-4 py-2 rounded-md transition-colors block" onClick={closeMenu}>
                      Commercial Fencing
                    </span>
                  </Link>
                  <Button
                    onClick={scrollToQuote}
                    className="w-full bg-texas-terracotta text-white hover:bg-texas-earth transition-colors"
                  >
                    Get Your Perfect Fence Match™
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
