import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Sparkles, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Gallery', path: '/gallery' },
  ];

  const isDark = location.pathname === '/' && !scrolled;

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 ${
      scrolled 
      ? 'py-4 bg-white/80 backdrop-blur-2xl shadow-premium border-b border-primary/10' 
      : 'py-8 bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Custom 3-Star Logo - 2 Small Left, 1 Big Right, Rotating, Viouler */}
        <Link to="/" className="flex items-center group">
          <div className="flex items-center gap-1.5 px-3 py-2 transition-all duration-500">
            <div className="flex flex-col items-end gap-1">
              <Sparkles className="w-2.5 h-2.5 text-viouler animate-float-fast opacity-40 group-hover:opacity-100 group-hover:text-white transition-all shadow-none" />
              <Sparkles className="w-4 h-4 text-viouler animate-float-slow opacity-60 group-hover:opacity-100 group-hover:text-white transition-all shadow-none" />
            </div>
            <motion.div
              animate={{ 
                filter: ["drop-shadow(0 0 5px rgba(124,102,185,0.1))", "drop-shadow(0 0.1px 8px rgba(124,102,185,0.3))", "drop-shadow(0 0 5px rgba(124,102,185,0.1))"]
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <Sparkles className="w-10 h-10 text-viouler animate-spin-slow group-hover:text-white transition-all drop-shadow-none" />
            </motion.div>
          </div>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              to={link.path} 
              className={`nav-link !transition-all duration-500 ${
                scrolled ? 'text-primary' : 'text-primary/90'
              } hover:!text-viouler`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden p-2 rounded-xl bg-primary/10"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className={scrolled ? 'text-primary' : 'text-white'} /> : <Menu className={scrolled ? 'text-primary' : 'text-white'} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white/95 backdrop-blur-xl border-b border-primary/10 overflow-hidden"
          >
            <div className="flex flex-col p-8 gap-6">
              {navLinks.map((link) => (
                <Link 
                  key={link.name} 
                  to={link.path} 
                  className="text-xl font-serif text-primary italic"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
