import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles, Award, Users, Quote, ArrowRight } from 'lucide-react';
import heroImg from '../assets/hero_wedding.png';

const AboutPage = () => {
  return (
    <div className="bg-white min-h-screen pt-32 transition-colors duration-700">
      
      {/* Minimalist Header */}
      <section className="max-w-7xl mx-auto px-6 mb-40">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-center"
        >
          <span className="text-secondary font-bold tracking-[0.5em] text-[10px] uppercase mb-10 block">Our Essence</span>
          <h1 className="text-7xl md:text-[8rem] font-serif italic text-primary leading-none mb-12">
            The Art of <br/> Celebration
          </h1>
          <div className="w-16 h-px bg-primary/20 mx-auto mb-12"></div>
          <p className="text-text-dim text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed font-light">
            Amoria was born from a simple belief: that every union is a masterpiece waiting to be unveiled. We don't just plan events; we architect legacies.
          </p>
        </motion.div>
      </section>

      {/* Hero Image Section - Wide & Elegant */}
      <section className="mx-6 md:mx-20 mb-40">
        <motion.div 
          initial={{ opacity: 0, clipPath: 'inset(0 50% 0 50%)' }}
          whileInView={{ opacity: 1, clipPath: 'inset(0 0% 0 0%)' }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="relative h-[80vh] rounded-[4rem] overflow-hidden shadow-premium"
        >
          <img src={heroImg} className="w-full h-full object-cover" alt="The Amoria Vision" />
          <div className="absolute inset-0 bg-primary/5"></div>
        </motion.div>
      </section>

      {/* Core Philosophy Section */}
      <section className="max-w-7xl mx-auto px-6 py-40 grid grid-cols-1 md:grid-cols-2 gap-32 items-center">
         <motion.div
           initial={{ opacity: 0, x: -50 }}
           whileInView={{ opacity: 1, x: 0 }}
           viewport={{ once: true }}
           className="space-y-12"
         >
            <h2 className="text-5xl font-serif italic text-primary leading-tight">
               Crafting magic <br/> through meticulous <br/> dedication.
            </h2>
            <p className="text-text-dim text-lg leading-relaxed">
               Our approach combines the precision of architecture with the soul of a poet. Every texture, every light beam, and every floral choice is curated to evoke an atmosphere of pure enchantment.
            </p>
            <div className="pt-10 flex gap-16">
               <div className="space-y-4">
                  <span className="text-primary text-4xl font-serif italic">12+</span>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-text-dim">Global Awards</p>
               </div>
               <div className="space-y-4">
                  <span className="text-primary text-4xl font-serif italic">500+</span>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-text-dim">Love Stories</p>
               </div>
            </div>
         </motion.div>

         <div className="grid grid-cols-2 gap-8">
            <motion.div 
               whileHover={{ scale: 1.02 }}
               className="aspect-[3/4] rounded-3xl overflow-hidden shadow-lg mt-20"
            >
               <img src="https://picsum.photos/600/800?random=1" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000" alt="" />
            </motion.div>
            <motion.div 
               whileHover={{ scale: 1.02 }}
               className="aspect-[3/4] rounded-3xl overflow-hidden shadow-lg"
            >
               <img src="https://picsum.photos/600/800?random=2" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000" alt="" />
            </motion.div>
         </div>
      </section>

      {/* Quote Section - Minimalist White */}
      <section className="py-60 bg-bg-soft text-center px-6">
         <motion.div
           initial={{ opacity: 0 }}
           whileInView={{ opacity: 1 }}
           viewport={{ once: true }}
           className="max-w-4xl mx-auto"
         >
            <Quote className="text-primary w-12 h-12 mx-auto mb-16 opacity-20" />
            <p className="text-3xl md:text-5xl font-serif italic text-primary leading-relaxed mb-16">
               "Elegance is not about being noticed, it's about being remembered."
            </p>
            <div className="w-16 h-px bg-primary/20 mx-auto"></div>
         </motion.div>
      </section>

      {/* Footer CTA */}
      <section className="py-40 text-center">
         <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
         >
            <Heart className="w-10 h-10 text-secondary mx-auto mb-10 opacity-40" />
            <h2 className="text-5xl font-serif italic text-primary mb-12">Begin Your Chapter</h2>
            <a href="/booking" className="btn-primary flex items-center gap-4 mx-auto w-fit">
               Start Planning <ArrowRight size={16} />
            </a>
         </motion.div>
      </section>

    </div>
  );
};

export default AboutPage;
