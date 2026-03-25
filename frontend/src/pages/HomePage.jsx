import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { Play, Volume2, VolumeX, Heart, Quote, ChevronDown, Sparkles, ArrowRight, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import api from '../api/axios';

const HomePage = () => {
  const [galleryItems, setGalleryItems] = useState([]);
  const [heroVideo, setHeroVideo] = useState(null);
  const [nextVideo, setNextVideo] = useState(null);
  const [services, setServices] = useState([]);
  const [isMuted, setIsMuted] = useState(true);
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const galleryRes = await api.get('gallery/');
        setGalleryItems(galleryRes.data);
        const hero = galleryRes.data.find(item => item.is_hero) || galleryRes.data[0];
        const next = galleryRes.data.find(item => !item.is_hero) || galleryRes.data[1];
        setHeroVideo(hero);
        setNextVideo(next);

        const servicesRes = await api.get('services/');
        setServices(servicesRes.data.filter(s => s.is_featured).slice(0, 4));
      } catch (err) {
        console.error("Failed to fetch data:", err);
      }
    };
    fetchData();
  }, []);

  const toggleSound = () => {
    const video = document.querySelector('video');
    if (video) {
        video.muted = !video.muted;
        setIsMuted(video.muted);
        if (!video.muted) {
            video.play().catch(e => console.log("Audio play blocked", e));
        }
    }
  };

  const handleNextVideo = () => {
    if (!galleryItems.length) return;
    const currentIdx = galleryItems.findIndex(v => v.id === heroVideo?.id);
    const nextIdx = (currentIdx + 1) % galleryItems.length;
    const nextNextIdx = (currentIdx + 2) % galleryItems.length;
    setHeroVideo(galleryItems[nextIdx]);
    setNextVideo(galleryItems[nextNextIdx]);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div ref={containerRef} className="home-page relative bg-[#0A0A0B] text-white min-h-screen selection:bg-viouler/30 overflow-x-hidden">
      
      {/* Scroll Indicator (WAC Style) */}
      <div className="fixed left-8 top-1/2 -translate-y-1/2 z-50 hidden xl:flex flex-col items-center gap-4">
        <span className="text-[9px] uppercase tracking-[0.4em] font-bold vertical-text opacity-20">Scroll</span>
        <div className="w-[1px] h-32 bg-white/5 relative overflow-hidden">
          <motion.div 
            style={{ scaleY: smoothProgress, transformOrigin: 'top' }}
            className="absolute inset-0 bg-[#9D8CCF] shadow-[0_0_10px_#9D8CCF]"
          />
        </div>
      </div>

      {/* Video Reels Section (Hero Cinematic) */}
      <VideoReelSection 
        heroVideo={heroVideo}
        nextVideo={nextVideo}
        isMuted={isMuted}
        toggleSound={toggleSound}
        onNext={handleNextVideo}
      />

      {/* Motto Reveal Section (WAC Vision Style) - 200vh */}
      <WACVisionSection progress={scrollYProgress} />

      {/* Services Section (WAC Design Style) - 500vh */}
      <PinnedServices progress={scrollYProgress} services={services} />

      {/* Final Call to Action */}
      <section className="relative py-80 bg-[#0A0A0B] text-white text-center border-t border-white/5">
        <div className="max-w-3xl mx-auto px-6 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Sparkles className="w-16 h-16 text-[#E2CF7C] mx-auto mb-16 opacity-40 shrink-0" />
            <p className="text-5xl md:text-7xl font-serif italic leading-tight mb-20 text-white">
              Crafting Timeless <br /> Legacies Together.
            </p>
            <div className="flex flex-col items-center gap-12">
               <Link to="/booking" className="inline-block text-[11px] font-bold uppercase tracking-[0.8em] text-[#E2CF7C] border-b border-[#E2CF7C]/30 pb-4 hover:text-white hover:border-white transition-all">
                 The Journey Begins
               </Link>
               
               <button 
                 onClick={scrollToTop}
                 className="flex flex-col items-center gap-4 group mt-20"
               >
                  <div className="w-12 h-12 rounded-full border border-white/5 flex items-center justify-center group-hover:bg-white/5 transition-all">
                     <ChevronDown className="rotate-180 text-white/20 group-hover:text-white" size={20} />
                  </div>
                  <span className="text-[9px] uppercase tracking-widest text-white/20 group-hover:text-white font-bold">Back to Top</span>
               </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

const VideoReelSection = ({ heroVideo, nextVideo, isMuted, toggleSound, onNext }) => {
  return (
    <section className="relative h-[100vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.video 
            key={heroVideo?.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
            autoPlay 
            loop 
            muted={isMuted}
            playsInline
            className="w-full h-full object-cover brightness-[0.5] scale-105"
          >
            <source src={heroVideo?.video_url} type="video/mp4" />
          </motion.video>
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-[#0A0A0B]"></div>
      </div>
      
      <div className="relative z-10 text-center px-6">
         <motion.div 
           initial={{ opacity: 0, y: 30 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 2 }}
         >
            <h1 className="text-7xl md:text-[10rem] font-serif italic mb-6 tracking-tighter leading-none text-white drop-shadow-2xl">
              Amoria Weddings
            </h1>
            <p className="text-white/30 uppercase tracking-[1em] text-[10px] md:text-xs font-bold mb-16 max-w-xl mx-auto">
              Luxury Event Management
            </p>
         </motion.div>
      </div>

      {/* WAC Style Sound Toggle - Bottom Left */}
      <div className="absolute bottom-10 left-10 z-[60] flex flex-col items-center gap-4">
          <button 
              onClick={toggleSound}
              className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center text-white backdrop-blur-2xl hover:bg-white/5 transition-all group lg:pointer-events-auto"
          >
              {isMuted ? <VolumeX size={18} className="text-white/40 group-hover:text-white" /> : <Volume2 size={18} />}
          </button>
      </div>

      {/* WAC Next Video Box - Shifted Left of WhatsApp */}
      {nextVideo && (
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          className="absolute bottom-10 right-32 z-20 hidden md:block"
        >
          <div 
            onClick={onNext}
            className="glass-card !bg-black/90 !rounded-2xl p-4 flex items-center gap-5 border-white/10 hover:border-white/30 transition-all cursor-pointer group w-64 h-24 shadow-2xl"
          >
             <div className="w-14 h-14 rounded-xl overflow-hidden relative flex-shrink-0">
                <div className="absolute inset-0 bg-black/40 z-10 flex items-center justify-center">
                  <Play size={14} className="text-white fill-white" />
                </div>
                <video muted loop autoPlay className="w-full h-full object-cover">
                  <source src={nextVideo.video_url} type="video/mp4" />
                </video>
             </div>
             <div className="flex-grow">
                <span className="text-[8px] uppercase tracking-[0.3em] text-white/30 block mb-1">Next Reel</span>
                <p className="text-[11px] font-bold text-white uppercase tracking-wider line-clamp-2 leading-tight">Amoria Weddings</p>
             </div>
             <ArrowRight size={16} className="text-white/20 group-hover:text-white group-hover:translate-x-1 transition-all" />
          </div>
        </motion.div>
      )}
    </section>
  );
};

const WACVisionSection = ({ progress }) => {
  const line1 = "We believe in a world where".split(" ");
  const line2 = "love fosters your everyday".split(" ");
  const line3 = "experiences. And our mission is to".split(" ");
  const line4 = "make it happen!".split(" ");

  return (
    <section className="relative h-[250vh] bg-[#0A0A0B]">
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center px-10">
        <div className="max-w-7xl w-full text-center md:text-left">
           <div className="text-4xl md:text-6xl font-sans font-light leading-tight tracking-tight text-white space-y-4">
              {[line1, line2, line3, line4].map((words, lineIdx) => (
                <div key={lineIdx} className="overflow-hidden flex flex-wrap gap-x-4">
                   {words.map((word, wordIdx) => (
                     <VisionWord 
                       key={wordIdx} 
                       word={word} 
                       progress={progress} 
                       delay={lineIdx * 0.1 + wordIdx * 0.05} 
                     />
                   ))}
                </div>
              ))}
           </div>
        </div>
      </div>
    </section>
  );
};

const VisionWord = ({ word, progress, delay }) => {
  // Reveal between 0.2 and 0.4
  const start = 0.15 + (delay / 1.5);
  const end = start + 0.1;
  const color = useTransform(progress, [start, end], ["rgba(255,255,255,0.05)", "rgba(255,255,255,1)"]);
  const y = useTransform(progress, [start, end], [20, 0]);

  return (
    <motion.span style={{ color, y }} className="inline-block px-1">
      {word}
    </motion.span>
  );
};

const PinnedServices = ({ progress, services }) => {
  const activeIndex = useTransform(progress, [0.45, 0.6, 0.75, 0.9], [0, 1, 2, 3]);
  const [currentIdx, setCurrentIdx] = useState(0);

  useEffect(() => {
    const unsub = activeIndex.onChange(v => {
      let idx = Math.floor(v);
      idx = Math.max(0, Math.min(idx, services.length - 1));
      setCurrentIdx(idx);
    });
    return () => unsub();
  }, [activeIndex, services.length]);

  if (services.length === 0) return null;

  return (
    <section className="relative h-[500vh] bg-[#0A0A0B] border-y border-white/5">
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center px-6 overflow-hidden">
        <AnimatePresence mode="wait">
          {services.map((s, i) => (
            currentIdx === i && (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -100 }}
                transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1] }}
                className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center pointer-events-none"
              >
                {/* WAC Service Graphic (Butterfly Style) */}
                <motion.div 
                  initial={{ scale: 0.8, rotate: -10, opacity: 0 }}
                  animate={{ scale: 1, rotate: 0, opacity: 1 }}
                  transition={{ delay: 0.3, duration: 1 }}
                  className="mb-16 relative"
                >
                   <div className="w-32 h-32 md:w-48 md:h-48 rounded-full border border-white/5 flex items-center justify-center">
                     <Star size={48} className="text-[#9D8CCF] absolute opacity-20 blur-xl animate-pulse" />
                     <Star size={32} className="text-[#9D8CCF] relative z-10" />
                   </div>
                </motion.div>

                <h3 className="text-7xl md:text-[12rem] font-sans font-thin text-white tracking-tighter leading-none mb-12 pointer-events-auto relative z-20">
                   {s.name}
                </h3>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                  className="max-w-2xl pointer-events-auto relative z-20"
                >
                   <p className="text-white/40 text-lg md:text-2xl font-light tracking-wide leading-relaxed">
                     {s.description}
                   </p>
                   <Link to="/services" className="mt-12 inline-flex items-center gap-4 text-[11px] uppercase tracking-[0.6em] text-[#E2CF7C] border-b border-[#E2CF7C]/20 pb-2 hover:border-[#E2CF7C] transition-all group">
                     Explore More <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform" />
                   </Link>
                </motion.div>
              </motion.div>
            )
          ))}
        </AnimatePresence>

        {/* Subtle Background Text */}
        <AnimatePresence mode="wait">
           <motion.div
             key={currentIdx + '-bg'}
             initial={{ opacity: 0, scale: 0.9 }}
             animate={{ opacity: 0.03, scale: 1 }}
             exit={{ opacity: 0 }}
             className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[15vw] font-serif italic text-white pointer-events-none z-0"
           >
             {services[currentIdx]?.name.split(" ")[0]}
           </motion.div>
        </AnimatePresence>

        {/* Global Indicator for Services */}
        <div className="absolute bottom-20 flex gap-4">
          {services.map((_, i) => (
            <div key={i} className={`h-[1px] w-12 transition-all duration-700 ${currentIdx === i ? 'bg-[#9D8CCF] w-24' : 'bg-white/10'}`}></div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomePage;
