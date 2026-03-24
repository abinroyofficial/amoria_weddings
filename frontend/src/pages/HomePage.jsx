import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Calendar, Heart, ArrowRight, Play, Quote } from 'lucide-react';
import { Link } from 'react-router-dom';
import decoImg from '../assets/decoration.png';
import floralImg from '../assets/floral.png';
import stageImg from '../assets/stage.png';

const HomePage = () => {
  const services = [
    { title: 'Bespoke Decoration', img: decoImg, desc: 'Tailored themes that reflect your unique love story.' },
    { title: 'Exquisite Florals', img: floralImg, desc: 'Fresh, vibrant arrangements curated by master florists.' },
    { title: 'Signature Stages', img: stageImg, desc: 'Grand setups designed to be the centerpiece of your day.' },
  ];

  const revealVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <div className="overflow-hidden bg-white">
      {/* Hero Section with Video */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          {/* High-quality wedding video placeholder */}
          <video 
            autoPlay 
            loop 
            muted 
            playsInline
            className="w-full h-full object-cover scale-105 brightness-75"
          >
            <source src="https://assets.mixkit.co/videos/preview/mixkit-wedding-rings-on-a-table-41614-large.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/10 to-white/95"></div>
        </div>
        
        <div className="relative z-10 text-center px-6 max-w-5xl">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="flex justify-center mb-8"
            >
              <Sparkles className="text-secondary w-20 h-20 animate-spin-slow text-viouler drop-shadow-[0_0_15px_rgba(122,101,177,0.5)]" />
            </motion.div>
            
            <h1 className="text-6xl md:text-8xl font-sans font-extrabold mb-6 tracking-tight text-white leading-[1.1]">
              Crafting <span className="italic font-serif font-light text-secondary">Memories</span>, <br/> 
              Celebrating Love.
            </h1>
            
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="flex items-center gap-4 justify-center mb-10"
            >
              <div className="h-[1px] w-12 bg-white/30"></div>
              <span className="text-xs font-bold uppercase tracking-[0.4em] text-white/70">Luxury Event Management</span>
              <div className="h-[1px] w-12 bg-white/30"></div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="flex flex-col md:flex-row gap-8 justify-center items-center"
            >
              <Link to="/booking" className="btn-gold !px-12 !py-5 shadow-2xl hover:bg-white hover:text-primary min-w-[200px]">
                Plan Your Wedding
              </Link>
              <Link to="/gallery" className="btn-outline !text-white !border-white/40 hover:!bg-white hover:!text-primary transition-all">
                Explore Portfolio
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Story Reel Overlay - WAC Inspired */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-12 right-12 z-20 hidden lg:flex items-center gap-6 bg-black/20 backdrop-blur-xl p-4 rounded-3xl border border-white/10 group cursor-pointer hover:bg-black/40 transition-all shadow-2xl"
        >
          <div className="relative w-24 h-16 rounded-xl overflow-hidden shadow-premium">
            <img src="https://picsum.photos/400/300?wedding=1" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="Reel" />
            <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
              <Play fill="white" size={16} className="text-white" />
            </div>
          </div>
          <div className="pr-6">
            <span className="block text-[10px] uppercase tracking-widest text-white/50 mb-1">Next Up</span>
            <h4 className="text-sm font-bold text-white mb-2">Signature Story Reel</h4>
            <div className="w-32 h-0.5 bg-white/10 rounded-full overflow-hidden">
               <motion.div 
                 animate={{ width: ["0%", "100%"] }} 
                 transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                 className="h-full bg-secondary"
               />
            </div>
          </div>
        </motion.div>

        {/* Floating Scroll Indicator */}
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50 flex flex-col items-center gap-2"
        >
          <span className="text-[10px] uppercase tracking-widest font-bold">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-white to-transparent"></div>
        </motion.div>
      </section>

      {/* Services Overview with Staggered Entrance */}
      <motion.section 
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="py-32 bg-white"
      >
        <div className="max-w-7xl mx-auto px-6">
          <motion.div variants={revealVariants} className="text-center mb-24">
            <h2 className="section-title">Our Exquisite Offerings</h2>
            <div className="w-24 h-1 bg-secondary mx-auto mb-8 rounded-full"></div>
            <p className="text-text-main/40 max-w-2xl mx-auto text-lg uppercase tracking-[0.2em] font-medium">
              Curating every detail of your luxury wedding experience
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            {services.map((service, idx) => (
              <motion.div
                key={idx}
                variants={revealVariants}
                className="group relative"
              >
                <div className="aspect-[3/4] overflow-hidden rounded-[3rem] shadow-premium mb-8 relative">
                  <img src={service.img} alt={service.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                  <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="w-20 h-20 bg-white/30 backdrop-blur-md rounded-full flex items-center justify-center text-white scale-75 group-hover:scale-100 transition-transform duration-500">
                       <Play fill="white" size={24} />
                    </div>
                  </div>
                </div>
                <div className="text-center">
                  <h3 className="text-3xl font-serif mb-4 tracking-tight text-primary italic">{service.title}</h3>
                  <p className="text-text-main/50 text-sm mb-6 leading-relaxed px-4">{service.desc}</p>
                  <Link to="/services" className="inline-block border-b-2 border-secondary/30 pb-1 text-xs font-bold uppercase tracking-widest hover:border-secondary transition-all">
                    Explore Details
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Immersive Video Session Section */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <video 
            autoPlay 
            loop 
            muted 
            playsInline
            className="w-full h-full object-cover brightness-50"
          >
            <source src="https://assets.mixkit.co/videos/preview/mixkit-beautiful-wedding-rings-with-diamonds-41619-large.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-primary/10 mix-blend-overlay"></div>
        </div>
        
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="glass-card !bg-white/5 !backdrop-blur-3xl !border-white/10 p-16 md:p-24"
          >
            <Sparkles className="w-16 h-16 text-secondary mx-auto mb-10 animate-glow-pulse" />
            <h2 className="text-4xl md:text-6xl font-serif italic text-white mb-10 leading-tight">
              Where your <span className="text-secondary">ever after</span> begins with elegance.
            </h2>
            <Link to="/about" className="btn-primary !bg-white !text-primary hover:!bg-secondary hover:!text-white">
              Discover Our Story
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Stats Section - Premium Light Look */}
      <section className="py-32 bg-bg-soft relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full -mr-48 -mt-48 blur-3xl"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10 grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
          {[
            { label: 'Weddings', val: '500+' },
            { label: 'Exotic Locales', val: '24' },
            { label: 'Awards', val: '12' },
            { label: 'Guests Served', val: '10k+' }
          ].map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-8 glass-card !rounded-[2.5rem]"
            >
              <span className="text-5xl font-serif block mb-3 text-primary italic">{stat.val}</span>
              <span className="text-text-main/40 uppercase tracking-widest text-[10px] font-bold">{stat.label}</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Featured Gallery - WAC Inspired Mosaic */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <motion.div variants={revealVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
               <h2 className="text-6xl font-serif text-primary italic leading-tight">Witness the <br/> Amoria Magic</h2>
            </motion.div>
            <Link to="/gallery" className="btn-primary !bg-white !text-primary border border-primary/10 hover:!bg-primary hover:!text-white mb-4">
               View Full Archive
            </Link>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[1,2,3,4,5,6,7,8].map(i => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className={`group relative overflow-hidden rounded-[2rem] shadow-lg ${
                  i === 2 || i === 5 ? 'md:row-span-2 aspect-[4/5]' : 'aspect-square'
                }`}
              >
                <img src={`https://picsum.photos/800/800?random=${i+20}`} alt="wedding" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-6 text-white">
                    <span className="text-[10px] uppercase font-bold tracking-widest text-secondary mb-1">Elegance</span>
                    <h4 className="font-serif italic text-lg leading-tight">Moment of Bliss</h4>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy / Quote Section */}
      <section className="py-40 bg-primary text-white text-center relative overflow-hidden">
        <Quote className="absolute top-1/2 left-10 -translate-y-1/2 w-96 h-96 opacity-5 rotate-12" />
        <div className="max-w-4xl mx-auto px-6 relative z-10">
           <motion.div
             initial={{ opacity: 0, y: 30 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
           >
             <Heart className="text-secondary w-16 h-16 mx-auto mb-12 opacity-50" />
             <p className="text-4xl md:text-6xl font-serif italic leading-tight mb-12">
               "We don't just plan weddings; we curate the first chapter of your legacy."
             </p>
             <div className="w-20 h-0.5 bg-secondary mx-auto mb-8"></div>
             <h4 className="font-bold tracking-[0.4em] uppercase text-xs text-white/60">The Amoria Philosophy</h4>
           </motion.div>
        </div>
      </section>

      {/* Testimonials - Premium Carousel Look */}
      <section className="py-32 bg-white">
        <div className="max-w-4xl mx-auto px-6 overflow-hidden">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-4 mb-12 py-2 px-6 rounded-full bg-bg-soft border border-primary/5">
               <div className="flex -space-x-3">
                  {[1,2,3].map(i => <img key={i} src={`https://i.pravatar.cc/100?img=${i+10}`} className="w-10 h-10 rounded-full border-2 border-white shadow-sm" alt="" />)}
               </div>
               <span className="text-[10px] font-bold uppercase tracking-widest text-text-main/60">Loved by 500+ Couples</span>
            </div>
            
            <div className="relative">
               <p className="text-3xl md:text-4xl font-serif text-primary italic leading-relaxed mb-12">
                 "Every petal, every light, every smile... Amoria made our day transcend reality. It was more than a wedding; it was a cosmic celebration of our love."
               </p>
               <h4 className="text-text-main font-bold tracking-widest uppercase text-sm">— Sophia & Alessandro</h4>
               <span className="text-text-main/40 text-xs">Umaid Bhawan Palace, Jodhpur</span>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
