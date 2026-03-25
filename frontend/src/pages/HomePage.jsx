import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence, useMotionValueEvent } from 'framer-motion';
import { Play, Volume2, VolumeX, Heart, Quote, ChevronDown, Sparkles, ArrowRight, Star, Camera } from 'lucide-react';
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

      {/* Services Section (WAC Design Style) */}
      <PinnedServices progress={scrollYProgress} services={services} />

      {/* Design / Gallery Section (Stacking Cards) */}
      <WACGallerySection items={galleryItems.filter(item => !item.is_hero).slice(0, 4)} />

      {/* Final Call to Action */}
      <section className="sticky top-0 h-screen w-full bg-[#0A0A0B] flex flex-col items-center justify-center p-6 text-center overflow-hidden z-30">
        <div className="relative z-20 flex flex-col items-center justify-center max-w-4xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ amount: 0.5 }}
          >
            <Sparkles className="w-12 h-12 text-[#9D8CCF] mx-auto mb-12 opacity-80 shrink-0" />
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-serif italic text-white leading-tight mb-16 tracking-wide drop-shadow-xl">
              Crafting Timeless <br /> Legacies Together.
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            viewport={{ amount: 0.8 }}
            className="flex flex-col items-center gap-16"
          >
            <Link to="/booking" className="inline-block text-[12px] font-bold uppercase tracking-[0.8em] text-[#E2CF7C] border-b border-[#E2CF7C]/30 pb-4 hover:text-white hover:border-white transition-all group">
              The Journey Begins <ArrowRight size={14} className="inline ml-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-500" />
            </Link>

            <button
              onClick={scrollToTop}
              className="flex flex-col items-center gap-4 group cursor-pointer"
            >
              <div className="w-12 h-12 rounded-full border border-white/5 flex items-center justify-center group-hover:bg-white/5 transition-all">
                <ChevronDown className="rotate-180 text-white/30 group-hover:text-white transition-all" size={20} />
              </div>
              <span className="text-[9px] uppercase tracking-widest text-white/30 group-hover:text-white font-bold transition-all">Back to Top</span>
            </button>
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
          <p className="text-white/50 uppercase tracking-[1em] text-[10px] md:text-xs font-bold mb-16 max-w-xl mx-auto">
            Event Management
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

const WACVisionSection = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const quote = "Dreams into Unforgettable Memories…".split(" ");

  return (
    <section ref={containerRef} className="relative h-[150vh] bg-[#0A0A0B]">
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center px-6 md:px-10">
        <motion.div className="max-w-7xl w-full text-center">
          <div className="text-3xl md:text-5xl lg:text-7xl font-serif italic leading-[1.4] tracking-wide text-white flex flex-wrap justify-center gap-x-3 md:gap-x-5">
            {quote.map((word, wordIdx) => (
              <VisionWord
                key={wordIdx}
                word={word}
                progress={scrollYProgress}
                delay={wordIdx * 0.1}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const VisionWord = ({ word, progress, delay }) => {
  // Highlight words faster: start = 0, 0.1, 0.2, 0.3. End = start + 0.3
  const start = delay;
  const end = start + 0.3;
  const color = useTransform(progress, [start, end], ["rgba(255,255,255,0.25)", "rgba(255,255,255,1)"]);

  return (
    <motion.span style={{ color }} className="inline-block">
      {word}
    </motion.span>
  );
};

const PinnedServices = ({ services }) => {
  if (services.length === 0) return null;

  return (
    <div className="relative w-full">
      {services.map((s, i) => (
        <section key={i} className="sticky top-0 h-screen w-full bg-[#0A0A0B] flex flex-col items-center justify-center p-6 text-center overflow-hidden z-20">

          {/* Subtle Background Text */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 0.03, scale: 1 }}
            transition={{ duration: 1 }}
            viewport={{ amount: 0.5 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[15vw] font-serif italic text-white pointer-events-none z-0"
          >
            {s.name.split(" ")[0]}
          </motion.div>

          <div className="relative z-20 flex flex-col items-center justify-center max-w-4xl">
            <motion.h3
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ amount: 0.8 }}
              className="text-6xl md:text-[8rem] lg:text-[10rem] font-sans font-thin text-white tracking-tighter leading-[0.9] mb-8"
            >
              {s.name}
            </motion.h3>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              viewport={{ amount: 0.8 }}
              className="max-w-xl"
            >
              <p className="text-white/40 text-base md:text-xl font-light tracking-wide leading-relaxed">
                {s.description}
              </p>
              <Link to="/services" className="mt-8 inline-flex items-center gap-4 text-[10px] uppercase tracking-[0.5em] text-[#E2CF7C] border-b border-[#E2CF7C]/20 pb-2 hover:border-[#E2CF7C] transition-all group">
                Explore More <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform" />
              </Link>
            </motion.div>
          </div>

        </section>
      ))}
    </div>
  );
};

const WACGallerySection = ({ items }) => {
  if (items.length === 0) return null;

  return (
    <div className="relative w-full">
      <div className="h-40 bg-[#0A0A0B] flex items-center justify-center">
        <div className="flex items-center gap-6">
          <div className="w-12 h-[1px] bg-white/10"></div>
          <span className="text-[10px] uppercase tracking-[0.6em] text-white/40 font-bold">Curated Designs</span>
          <div className="w-12 h-[1px] bg-white/10"></div>
        </div>
      </div>
      
      {items.map((item, i) => (
        <section key={i} className="sticky top-0 h-screen w-full bg-[#0A0A0B] flex flex-col items-center justify-center p-6 text-center overflow-hidden z-25 border-t border-white/5">
          
          {/* Background Image with Parallax / Scale */}
          <motion.div
             initial={{ scale: 1.1, opacity: 0 }}
             whileInView={{ scale: 1, opacity: 0.15 }}
             transition={{ duration: 2, ease: "easeOut" }}
             className="absolute inset-0 z-0"
          >
             <img src={item.image} className="w-full h-full object-cover grayscale" alt="" />
          </motion.div>

          <div className="relative z-20 flex flex-col items-center justify-center max-w-5xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              className="mb-12"
            >
               <Camera size={40} className="text-[#9D8CCF] opacity-40 mx-auto" />
            </motion.div>

            <motion.h3
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-6xl md:text-[9rem] font-serif italic text-white leading-none tracking-tighter mb-10"
            >
              {item.title}
            </motion.h3>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              <span className="text-[10px] uppercase tracking-[0.4em] text-[#E2CF7C] font-bold border border-[#E2CF7C]/20 px-8 py-3 rounded-full bg-black/40 backdrop-blur-md">
                {item.tag}
              </span>
            </motion.div>
          </div>
        </section>
      ))}
    </div>
  );
};

export default HomePage;
