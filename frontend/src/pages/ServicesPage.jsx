import React from 'react';
import { motion } from 'framer-motion';
import decoImg from '../assets/decoration.png';
import floralImg from '../assets/floral.png';
import stageImg from '../assets/stage.png';
import planningImg from '../assets/planning.png';
import { CheckCircle, Sparkles, Heart } from 'lucide-react';

const ServicesPage = () => {
  const services = [
    {
      title: 'Bespoke Decoration',
      img: decoImg,
      category: 'Decoration',
      desc: 'Elegant themes tailored to your venue, incorporating premium fabrics, lighting, and custom props.',
      features: ['Theme Consultation', 'Lighting Design', 'Tableau Setup', 'Custom Drapery']
    },
    {
      title: 'Floral Artistry',
      img: floralImg,
      category: 'Florals',
      desc: 'Fresh and exotic floral arrangements that breathe life into your wedding ceremony and reception.',
      features: ['Bridal Bouquets', 'Mandap/Altar Florals', 'Centerpieces', 'Aisle Decoration']
    },
    {
      title: 'Signature Stages',
      img: stageImg,
      category: 'Signature',
      desc: 'Grand stage designs that serve as the perfect backdrop for your most precious photos.',
      features: ['3D Stage Visuals', 'LED Screens', 'Floral Backdrops', 'Furniture Selection']
    },
    {
      title: 'Full Event Management',
      img: planningImg,
      category: 'Management',
      desc: 'End-to-end wedding management so you can enjoy every moment without stress.',
      features: ['Vendor Management', 'Timeline Coordination', 'Guest Hospitality', 'Budget Control']
    }
  ];

  return (
    <div className="pt-48 pb-32 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-32"
        >
          <Sparkles className="text-secondary w-12 h-12 mx-auto mb-8 opacity-50" />
          <h1 className="text-6xl md:text-8xl font-serif text-primary mb-8 italic leading-tight">Exquisite Offerings</h1>
          <p className="text-text-main/40 max-w-2xl mx-auto uppercase tracking-[0.4em] text-xs font-bold">
            Curating every detail of your luxury wedding experience
          </p>
        </motion.div>

        <div className="space-y-48">
          {services.map((service, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 80 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className={`flex flex-col ${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-24 items-center`}
            >
              <div className="w-full md:w-3/5">
                <div className="group relative overflow-hidden rounded-[4rem] shadow-premium">
                  <div className="aspect-[16/10] overflow-hidden">
                     <img src={service.img} alt={service.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
                  </div>
                  <div className="absolute top-10 left-10 bg-white/90 backdrop-blur-md text-primary px-8 py-3 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-xl">
                    {service.category}
                  </div>
                </div>
              </div>
              
              <div className="w-full md:w-2/5 space-y-10">
                <Heart className="text-secondary w-8 h-8 opacity-30" />
                <h2 className="text-5xl font-serif text-primary tracking-tight leading-tight italic">{service.title}</h2>
                <p className="text-text-main/60 text-lg leading-relaxed font-light">
                  {service.desc}
                </p>
                
                <div className="grid grid-cols-1 gap-5">
                  {service.features.map((feature, fidx) => (
                    <div key={fidx} className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-text-main/40">
                      <div className="w-1.5 h-1.5 bg-secondary rounded-full"></div>
                      {feature}
                    </div>
                  ))}
                </div>
                
                <div className="pt-8">
                  <a href="/booking" className="btn-primary !px-16 !bg-transparent border-2 border-primary/20 !text-primary hover:!bg-primary hover:!text-white">
                    Inquire Now
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;
