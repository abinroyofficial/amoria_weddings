import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Heart, Sparkles, Quote, ArrowRight, ChevronDown, Camera, Star, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';

const AboutPage = () => {
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div ref={containerRef} className="bg-[#0A0A0B] min-h-screen text-white overflow-x-hidden selection:bg-[#9D8CCF]/30 font-sans">
      
      {/* Dynamic Scroll Progress Indicator */}
      <div className="fixed right-10 top-1/2 -translate-y-1/2 z-50 h-40 w-[2px] bg-white/5 hidden md:block">
         <motion.div 
            style={{ scaleY: smoothProgress, transformOrigin: 'top' }}
            className="w-full h-full bg-[#E2CF7C] shadow-[0_0_15px_#E2CF7C]"
         />
      </div>

      {/* 1. CINEMATIC HERO: STAGGERED REVEAL */}
      <section className="relative h-screen flex flex-col justify-center px-8 md:px-24 bg-gradient-to-b from-[#0A0A0B] to-black">
        <div className="max-w-[100rem] mx-auto w-full">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 2 }}
                className="mb-12"
            >
                <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-[1px] bg-[#E2CF7C]"></div>
                    <span className="text-[#E2CF7C] font-bold tracking-[0.6em] text-[10px] uppercase">The Amoria Philosophy</span>
                </div>
            </motion.div>

            <h1 className="text-7xl md:text-[11rem] lg:text-[14rem] font-serif italic text-white leading-[0.85] tracking-tighter mb-16">
                <motion.span initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1.2, delay: 0.3 }} className="block">Pure Art.</motion.span>
                <motion.span initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1.2, delay: 0.6 }} className="block text-right">Infinite Love.</motion.span>
            </h1>

            <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 1 }}
                className="flex flex-col md:flex-row justify-between items-end border-t border-white/5 pt-12 gap-10"
            >
                <div className="max-w-xl">
                    <p className="text-white/40 text-lg md:text-2xl leading-relaxed font-light font-serif italic">
                        "Elegance is not about standing out, but about being remembered forever."
                    </p>
                </div>
                <div className="flex gap-16 items-center">
                    <div className="text-center group cursor-default">
                        <span className="text-4xl md:text-5xl font-serif italic block text-white group-hover:text-[#E2CF7C] transition-colors">150+</span>
                        <span className="text-[9px] uppercase tracking-widest text-white/30 font-bold">Curated Unions</span>
                    </div>
                </div>
            </motion.div>
        </div>
      </section>

      {/* 2. THE VISION IMAGE: PARALLAX STACK */}
      <section className="relative h-[120vh] px-8 md:px-24">
         <div className="sticky top-20 h-[80vh] w-full rounded-[4rem] overflow-hidden shadow-3xl border border-white/5">
            <motion.div style={{ y: useTransform(scrollYProgress, [0.1, 0.4], [0, -200]) }} className="h-[120%] w-full">
                <img 
                    src="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=2669&auto=format&fit=crop" 
                    className="w-full h-full object-cover brightness-[0.7] contrast-[1.1]" 
                    alt="Bespoke Luxury Ceremony" 
                />
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
            <div className="absolute bottom-20 left-20">
                <h2 className="text-5xl md:text-8xl font-serif italic text-white leading-none">Architecting <br/> the Ethereal.</h2>
            </div>
         </div>
      </section>

      {/* 3. EXPERIENCE TILES: STAGGERED CARDS */}
      <section className="py-60 px-8 md:px-24 bg-black">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ margin: "-100px" }}
                transition={{ duration: 1 }}
                className="space-y-16"
            >
                <div className="flex items-center gap-6">
                    <Camera className="text-[#9D8CCF] w-8 h-8 opacity-40" />
                    <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-[#9D8CCF]">The Curator's Eye</span>
                </div>
                <h2 className="text-5xl md:text-8xl font-serif italic text-white leading-[1.1]">
                    Meticulous in <br/> every stitch.
                </h2>
                <p className="text-white/40 text-xl md:text-2xl leading-[1.8] font-light max-w-xl">
                    We source the world for the rare, the exotic, and the unseen. Our mission is to bridge the gap between imagination and reality, ensuring your celebration is a unique fingerprint of your story.
                </p>
                
                <div className="grid grid-cols-2 gap-12 pt-10 border-t border-white/5">
                    <div className="space-y-4">
                        <Star className="text-[#E2CF7C] w-6 h-6 shrink-0" fill="currentColor" />
                        <h4 className="text-lg font-bold uppercase tracking-widest text-white">Award Winning</h4>
                        <p className="text-xs text-white/30 leading-relaxed uppercase tracking-wider">Recognized globally for excellence in luxury event design.</p>
                    </div>
                    <div className="space-y-4">
                        <Globe className="text-[#9D8CCF] w-6 h-6 shrink-0" />
                        <h4 className="text-lg font-bold uppercase tracking-widest text-white">Bespoke Travel</h4>
                        <p className="text-xs text-white/30 leading-relaxed uppercase tracking-wider">Destination orchestration across the most iconic landscapes.</p>
                    </div>
                </div>
            </motion.div>

            <div className="relative aspect-[3/4] rounded-[5rem] overflow-hidden shadow-2xl group border border-white/5">
                <motion.img 
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 1.5 }}
                    src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=2070&auto=format&fit=crop" 
                    className="w-full h-full object-cover grayscale brightness-75 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-1000" 
                    alt="Floral Detail" 
                />
                <div className="absolute inset-x-0 bottom-0 p-16 bg-gradient-to-t from-black via-black/20 to-transparent">
                    <span className="text-[10px] uppercase tracking-[0.6em] text-[#E2CF7C] font-bold mb-4 block">Detail Curation</span>
                    <p className="text-white/40 text-sm font-light leading-relaxed italic">"The small things are the only things."</p>
                </div>
            </div>
        </div>
      </section>

      {/* 4. PINNED QUOTE: IMMERSIVE OVERLAY */}
      <section className="relative h-screen bg-black flex items-center justify-center text-center px-6 overflow-hidden">
         <motion.div 
            style={{ 
                opacity: useTransform(scrollYProgress, [0.7, 0.85, 0.95], [0, 1, 0]),
                scale: useTransform(scrollYProgress, [0.7, 0.85, 0.95], [0.8, 1, 1.1])
            }}
            className="max-w-6xl z-20"
         >
            <Quote className="text-[#9D8CCF] w-16 h-16 mx-auto mb-20 opacity-20" />
            <h2 className="text-5xl md:text-8xl lg:text-[10rem] font-serif italic text-white leading-[1] tracking-tighter mb-16 px-4">
               "Your legacy, <br/> meticulously <br/> celebrated."
            </h2>
            <div className="w-32 h-[1px] bg-[#E2CF7C]/30 mx-auto"></div>
         </motion.div>
         {/* Background Decoration */}
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] border border-white/5 rounded-full opacity-20"></div>
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] border border-white/5 rounded-full opacity-10 rotate-45"></div>
      </section>

      {/* 5. FOOTER CALL TO ACTION */}
      <section className="py-80 bg-[#0A0A0B] flex flex-col items-center justify-center text-center px-6">
         <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="flex flex-col items-center gap-16"
         >
            <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center border border-white/10">
                <Sparkles className="w-10 h-10 text-[#E2CF7C] animate-pulse" />
            </div>
            <h2 className="text-6xl md:text-[10rem] font-serif italic text-white leading-none tracking-tighter">Enter the <br/> Atmosphere.</h2>
            
            <Link to="/booking" className="mt-12 inline-flex items-center gap-6 text-[14px] font-bold uppercase tracking-[1em] text-[#E2CF7C] border-b-2 border-[#E2CF7C]/20 pb-6 hover:border-white hover:text-white transition-all group scale-110">
               Start Planning <ArrowRight size={20} className="opacity-0 group-hover:opacity-100 group-hover:translate-x-6 transition-all duration-700" />
            </Link>
         </motion.div>
      </section>

    </div>
  );
};

export default AboutPage;
