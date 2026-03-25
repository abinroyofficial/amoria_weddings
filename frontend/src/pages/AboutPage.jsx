import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Heart, Sparkles, Quote, ArrowRight, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';

const AboutPage = () => {
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <div ref={containerRef} className="bg-[#0A0A0B] min-h-screen text-white overflow-hidden selection:bg-[#9D8CCF]/30">
      
      {/* Cinematic Hero Header */}
      <section className="relative pt-40 pb-20 px-6 max-w-[100rem] mx-auto min-h-[70vh] flex flex-col justify-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="text-center md:text-left flex flex-col md:flex-row justify-between items-end gap-10"
        >
          <div className="text-left w-full">
            <span className="text-[#E2CF7C] font-bold tracking-[0.5em] text-[10px] uppercase mb-10 block">Our Essence</span>
            <h1 className="text-6xl md:text-[9rem] lg:text-[12rem] font-serif italic text-white leading-[0.9] tracking-tighter mix-blend-lighten">
              The Art of<br/> Celebration.
            </h1>
          </div>
          <div className="w-full md:w-1/3 text-left md:text-right pb-4">
            <p className="text-white/40 text-lg md:text-xl leading-relaxed font-light">
              Amoria was born from a simple belief: every union is a masterpiece waiting to be unveiled. We don't just plan events; we architect legacies.
            </p>
          </div>
        </motion.div>
      </section>

      {/* Hero Image Section - Wide & Elegant */}
      <section className="px-6 md:px-10 mb-40">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="relative h-[60vh] md:h-[85vh] w-full overflow-hidden"
        >
          <img 
            src="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=2669&auto=format&fit=crop" 
            className="w-full h-full object-cover brightness-[0.6] hover:brightness-[0.8] transition-all duration-1000 scale-105 hover:scale-100" 
            alt="The Amoria Vision" 
          />
        </motion.div>
      </section>

      {/* Core Philosophy Section */}
      <section className="max-w-[90rem] mx-auto px-6 py-32 grid grid-cols-1 md:grid-cols-2 gap-20 md:gap-32 items-center">
         <motion.div
           initial={{ opacity: 0, x: -50 }}
           whileInView={{ opacity: 1, x: 0 }}
           viewport={{ once: true, amount: 0.3 }}
           transition={{ duration: 1 }}
           className="space-y-16"
         >
            <h2 className="text-5xl md:text-7xl font-serif italic text-white leading-tight">
               Crafting magic <br/> through meticulous <br/> dedication.
            </h2>
            <p className="text-white/40 text-xl leading-relaxed font-light max-w-lg">
               Our approach combines the precision of architecture with the soul of a poet. Every texture, every light beam, and every floral choice is curated to evoke an atmosphere of pure enchantment.
            </p>
            <div className="pt-6 flex gap-16 border-t border-white/10 w-fit pr-10">
               <div className="space-y-4 pt-6">
                  <span className="text-white text-5xl md:text-6xl font-serif italic">12+</span>
                  <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#E2CF7C]">Global Awards</p>
               </div>
               <div className="space-y-4 pt-6">
                  <span className="text-white text-5xl md:text-6xl font-serif italic">500+</span>
                  <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#E2CF7C]">Love Stories</p>
               </div>
            </div>
         </motion.div>

         <div className="grid grid-cols-2 gap-6 h-full">
            <motion.div 
               initial={{ opacity: 0, y: 50 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 1 }}
               className="aspect-[3/4] overflow-hidden mt-20"
            >
               <img src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=2070&auto=format&fit=crop" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000 brightness-75 hover:brightness-100" alt="Floral Detail" />
            </motion.div>
            <motion.div 
               initial={{ opacity: 0, y: 50 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 1, delay: 0.2 }}
               className="aspect-[3/4] overflow-hidden"
            >
               <img src="https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?q=80&w=2070&auto=format&fit=crop" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000 brightness-75 hover:brightness-100" alt="Table Setting" />
            </motion.div>
         </div>
      </section>

      {/* Quote Section - Minimalist Dark */}
      <section className="py-40 md:py-60 text-center px-6 border-y border-white/5 bg-black/20">
         <motion.div
           initial={{ opacity: 0, scale: 0.95 }}
           whileInView={{ opacity: 1, scale: 1 }}
           transition={{ duration: 1.5 }}
           viewport={{ once: true, amount: 0.5 }}
           className="max-w-5xl mx-auto"
         >
            <Quote className="text-[#9D8CCF] w-12 h-12 mx-auto mb-16 opacity-30" />
            <p className="text-4xl md:text-6xl lg:text-7xl font-serif italic text-white leading-tight mb-16 tracking-wide drop-shadow-xl">
               "Elegance is not about being noticed, it's about being remembered."
            </p>
            <div className="w-24 h-px bg-white/20 mx-auto"></div>
         </motion.div>
      </section>

      {/* Footer CTA */}
      <section className="py-40 flex justify-center items-center text-center px-6">
         <motion.div
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           transition={{ duration: 1 }}
           viewport={{ once: true }}
           className="flex flex-col items-center gap-12"
         >
            <Sparkles className="w-12 h-12 text-[#E2CF7C] mx-auto opacity-30 shrink-0 mb-6" />
            <h2 className="text-6xl md:text-[8rem] font-serif italic text-white tracking-tighter leading-none mb-6">Begin Your<br/> Chapter.</h2>
            
            <Link to="/booking" className="mt-8 inline-flex items-center gap-4 text-[12px] uppercase tracking-[0.8em] text-[#E2CF7C] border-b border-[#E2CF7C]/30 pb-4 hover:border-white hover:text-white transition-all group">
               Start Planning <ArrowRight size={16} className="opacity-0 group-hover:opacity-100 group-hover:translate-x-3 transition-all duration-500" />
            </Link>
         </motion.div>
      </section>

    </div>
  );
};

export default AboutPage;
