import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Instagram, Mail, Phone, Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-bg-soft text-text-main pt-24 pb-12 border-t border-primary/5">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
        <div className="col-span-1 md:col-span-1">
          <div className="flex items-center gap-3 mb-8">
            <Sparkles className="text-secondary w-10 h-10" />
            <span className="text-3xl font-serif font-bold tracking-tight text-primary italic">amoria</span>
          </div>
          <p className="text-text-main/50 leading-relaxed mb-8 text-sm">
            Curating timeless narratives of love and elegance. Your vision, our masterpiece.
          </p>
          <div className="flex gap-4">
            <a href="https://www.instagram.com/amoria_weddings?igsh=bm9odDJsdWRlemV4" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-primary/10 flex items-center justify-center hover:bg-primary hover:text-white transition-all"><Instagram size={18} /></a>
            <a href="https://wa.me/917025664051" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-primary/10 flex items-center justify-center hover:bg-primary hover:text-white transition-all"><Mail size={18} /></a>
          </div>
        </div>

        <div>
          <h4 className="text-xs uppercase tracking-[0.3em] font-bold mb-8 text-primary/40">The Experience</h4>
          <ul className="flex flex-col gap-4 text-sm font-medium text-text-main/60">
            <li><Link to="/" className="hover:text-primary transition-colors">Our Home</Link></li>
            <li><Link to="/about" className="hover:text-primary transition-colors">The Story</Link></li>
            <li><Link to="/services" className="hover:text-primary transition-colors">Offerings</Link></li>
            <li><Link to="/gallery" className="hover:text-primary transition-colors">Archive</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs uppercase tracking-[0.3em] font-bold mb-8 text-primary/40">Offerings</h4>
          <ul className="flex flex-col gap-4 text-sm font-medium text-text-main/60">
            <li>Bespoke Decoration</li>
            <li>Floral Artistry</li>
            <li>Signature Stages</li>
            <li>Full Management</li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs uppercase tracking-[0.3em] font-bold mb-8 text-primary/40">Inquiries</h4>
          <ul className="flex flex-col gap-4 text-sm font-medium text-text-main/60">
            <li className="flex items-center gap-4"><Phone size={16} className="text-secondary" /> +91 70256 64051</li>
            <li className="flex items-center gap-4"><Mail size={16} className="text-secondary" /> hello@amoria.com</li>
            <li className="mt-6">
              <Link to="/booking" className="btn-primary !py-3 !px-8 !text-[10px]">Start Planning</Link>
            </li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-6 pt-12 border-t border-primary/5 flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="text-text-main/30 text-[10px] uppercase tracking-widest">&copy; {new Date().getFullYear()} Amoria Weddings. Curating Bliss Globally.</p>
        <div className="flex items-center gap-2 text-primary/20">
           <Heart size={12} fill="currentColor" />
           <span className="text-[10px] uppercase font-bold tracking-[0.2em]">Designed for love</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
