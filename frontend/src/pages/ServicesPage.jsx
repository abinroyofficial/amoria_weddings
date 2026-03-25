import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Sparkles, Heart, ArrowRight, Star } from 'lucide-react';
import decoImg from '../assets/decoration.png';
import floralImg from '../assets/floral.png';
import stageImg from '../assets/stage.png';
import planningImg from '../assets/planning.png';

const ServicesPage = () => {
  const services = [
    {
      title: 'Bespoke Decoration',
      img: decoImg,
      category: 'Art & Design',
      desc: 'We transform spaces into ethereal dreamscapes using custom-built installations, premium textiles, and immersive lighting.',
      features: ['Architectural Lighting', 'Custom Drapery', 'Set Design', 'Thematic Decor']
    },
    {
      title: 'Exquisite Florals',
      img: floralImg,
      category: 'Botanical Art',
      desc: 'Our master florists curate rare and exotic blooms to create living tapestries of color and scent.',
      features: ['Rare Bloom Sourcing', 'Sculptural Centerpieces', 'Floral Installations', 'Bouquet Artistry']
    },
    {
      title: 'Signature Stages',
      img: stageImg,
      category: 'Centerpiece',
      desc: 'Grand, high-impact stages designed with 3D visuals and bespoke furniture to anchor your celebration.',
      features: ['3D Visual Mapping', 'Kinetic Structures', 'Luxury Furniture', 'Integrated LED']
    },
    {
      title: 'Total Management',
      img: planningImg,
      category: 'Coordination',
      desc: 'End-to-end orchestration of your wedding journey, ensuring every detail is executed with silent precision.',
      features: ['Vendor Curation', 'Timeline Architecture', 'Concierge Service', 'Protocol Management']
    }
  ];

  return (
    <div className="bg-white min-h-screen pt-32 transition-colors duration-700">
      
      {/* Services Header */}
      <section className="max-w-7xl mx-auto px-6 mb-40 text-center">
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 1 }}
        >
           <span className="text-secondary font-bold tracking-[0.6em] text-[10px] uppercase mb-10 block">Our Capabilities</span>
           <h1 className="text-7xl md:text-[9rem] font-serif italic text-primary leading-tight mb-12">
             The Collection
           </h1>
           <div className="w-16 h-px bg-primary/20 mx-auto"></div>
        </motion.div>
      </section>

      {/* Services Grid */}
      <section className="max-w-7xl mx-auto px-6 pb-60">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-40">
           {services.map((service, idx) => (
             <motion.div
               key={idx}
               initial={{ opacity: 0, y: 60 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true, margin: "-100px" }}
               transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
               className="group"
             >
                <div className="relative aspect-[16/10] mb-12 rounded-[3.5rem] overflow-hidden shadow-premium group-hover:shadow-2xl transition-all duration-700">
                   <img src={service.img} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" alt="" />
                   <div className="absolute top-10 right-10 flex items-center gap-4 bg-white/80 backdrop-blur-md px-6 py-3 rounded-full shadow-lg">
                      <Star className="w-3 h-3 text-secondary fill-secondary" />
                      <span className="text-[10px] font-bold uppercase tracking-widest text-primary italic">{service.category}</span>
                   </div>
                </div>
                
                <div className="px-6 space-y-8">
                   <h3 className="text-4xl md:text-5xl font-serif italic text-primary">{service.title}</h3>
                   <p className="text-text-dim text-lg leading-relaxed max-w-md font-light">
                      {service.desc}
                   </p>
                   
                   <ul className="grid grid-cols-2 gap-4 pt-4">
                      {service.features.map((f, fi) => (
                        <li key={fi} className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-[0.2em] text-text-dim">
                           <div className="w-1.5 h-1.5 bg-secondary rounded-full"></div>
                           {f}
                        </li>
                      ))}
                   </ul>

                   <div className="pt-8">
                      <a href="/booking" className="inline-flex items-center gap-4 group/btn">
                         <span className="text-xs font-bold uppercase tracking-[0.3em] border-b-2 border-primary/10 pb-1 group-hover/btn:border-primary transition-all">Explore Philosophy</span>
                         <ArrowRight size={14} className="group-hover/btn:translate-x-2 transition-transform" />
                      </a>
                   </div>
                </div>
             </motion.div>
           ))}
        </div>
      </section>

      {/* Testimonial / Philosophy Footer */}
      <section className="py-60 bg-bg-soft text-center px-6">
         <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
         >
            <Sparkles className="text-primary w-12 h-12 mx-auto mb-16 opacity-30 animate-pulse" />
            <h2 className="text-4xl md:text-6xl font-serif italic text-primary leading-tight mb-16">
               "We orchestrate moments of <br/> profound elegance."
            </h2>
            <a href="/booking" className="btn-primary">Reserve Your Date</a>
         </motion.div>
      </section>

    </div>
  );
};

export default ServicesPage;
