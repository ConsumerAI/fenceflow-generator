
"use client";

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { services } from '@/lib/routes';
import { cn } from '@/lib/utils';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="fixed w-full bg-background/95 backdrop-blur-sm z-50 shadow-sm border-b">
      <div className="container mx-auto px-4 py-3 md:py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <span className="font-bold text-xl md:text-2xl text-texas-terracotta">Fences Texas</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-6 items-center">
            <Link to="/" className="text-foreground hover:text-texas-terracotta transition-colors">
              Home
            </Link>
            <div className="relative group">
              <button className="flex items-center gap-1 text-foreground hover:text-texas-terracotta transition-colors">
                Services
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 transition-transform group-hover:rotate-180"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className="absolute left-0 mt-2 w-56 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                <div className="bg-white rounded-md shadow-lg py-2 border border-border">
                  {services.map((service) => (
                    <Link
                      key={service}
                      to={`/${service.toLowerCase().replace(/\s+/g, '-')}`}
                      className="block px-4 py-2 text-sm text-foreground hover:bg-muted transition-colors"
                    >
                      {service}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            <Link to="/fence-companies-near-me" className="text-foreground hover:text-texas-terracotta transition-colors">
              Find Near Me
            </Link>
            <Link
              to="/#quote"
              className="bg-texas-terracotta text-white px-4 py-2 rounded-md hover:bg-texas-earth transition-colors"
            >
              Get a Quote
            </Link>
          </div>

          {/* Mobile menu button */}
          <button className="md:hidden text-foreground" onClick={toggleMenu}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={cn(
          "md:hidden bg-background border-t overflow-hidden transition-all duration-300",
          isMenuOpen ? "max-h-[500px] opacity-100 border-border" : "max-h-0 opacity-0 border-transparent"
        )}
      >
        <div className="container mx-auto px-4 py-4 space-y-4">
          <Link
            to="/"
            className="block text-foreground hover:text-texas-terracotta transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </Link>
          <div className="border-t border-border pt-4">
            <p className="text-sm text-muted-foreground mb-2">Services</p>
            <div className="space-y-2 pl-2">
              {services.map((service) => (
                <Link
                  key={service}
                  to={`/${service.toLowerCase().replace(/\s+/g, '-')}`}
                  className="block text-foreground hover:text-texas-terracotta transition-colors text-sm"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {service}
                </Link>
              ))}
            </div>
          </div>
          <Link
            to="/fence-companies-near-me"
            className="block text-foreground hover:text-texas-terracotta transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            Find Near Me
          </Link>
          <Link
            to="/#quote"
            className="block w-full bg-texas-terracotta text-white px-4 py-2 rounded-md text-center hover:bg-texas-earth transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            Get a Quote
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
