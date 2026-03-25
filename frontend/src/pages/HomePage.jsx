import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Play, Volume2, VolumeX, Heart, Quote, ChevronDown, Sparkles, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import api from '../api/axios';

const HomePage = () => {
  const [heroVideo, setHeroVideo] = useState(null);
  const [nextVideo, setNextVideo] = useState(null);
  const [galleryItems, setGalleryItems] = useState([]);
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
        setServices(servicesRes.data.filter(s => s.is_featured).slice(0, 3));
      } catch (err) {
        console.error("Failed to fetch data:", err);
      }
    };
    fetchData();
  }, []);

  const toggleSound = () => {
    const video = document.querySelector('video');
    if (video) {
      if (isMuted) {
        video.muted = false;
        video.play().catch(e => console.log("Audio play blocked", e));
      } else {
        video.muted = true;
      }
    }
    setIsMuted(!isMuted);
  };

  const motto = "We turn your dreams into unforgettable memories";
  const characters = motto.split("");

  const handleNextVideo = () => {
    if (!galleryItems.length) return;
    const currentIdx = galleryItems.findIndex(v => v.id === heroVideo?.id);
    const nextIdx = (currentIdx + 1) % galleryItems.length;
    const nextNextIdx = (currentIdx + 2) % galleryItems.length;
    setHeroVideo(galleryItems[nextIdx]);
    setNextVideo(galleryItems[nextNextIdx]);
  };

  return (
    <div ref={containerRef} className="home-page relative bg-[#0A0A0B] text-white min-h-screen selection:bg-viouler/30 overflow-x-hidden">

      {/* Scroll Indicator (WAC Style) */}
      <div className="fixed left-8 top-1/2 -translate-y-1/2 z-50 hidden xl:flex flex-col items-center gap-4">
        <span className="text-[9px] uppercase tracking-[0.4em] font-bold vertical-text opacity-20">Scroll</span>
        <div className="w-[1px] h-32 bg-white/5 relative overflow-hidden">
          <motion.div
            style={{ scaleY: smoothProgress, transformOrigin: 'top' }}
            className="absolute inset-0 bg-viouler shadow-[0_0_10px_#9D8CCF]"
          />
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative h-[100vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            loop
            muted={isMuted}
            playsInline
            key={heroVideo?.video_url}
            className="w-full h-full object-cover brightness-[0.5] scale-105"
          >
            <source src={heroVideo?.video_url || "https://cdn.pixabay.com/video/2024/03/20/204803-925552205_large.mp4"} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-[#0A0A0B]"></div>
        </div>

        <div className="relative z-10 text-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1 className="text-7xl md:text-[10rem] font-serif italic mb-6 tracking-tighter leading-none text-white drop-shadow-2xl">
              Amoria Weddings
            </h1>
            <p className="text-white/30 uppercase tracking-[1em] text-[10px] md:text-xs font-bold mb-16 max-w-xl mx-auto">
              Architects of Timeless Celebration
            </p>

            <div className="flex flex-col items-center gap-8">
              <button
                onClick={toggleSound}
                className="flex flex-col items-center gap-4 group"
              >
                <div className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center text-white backdrop-blur-2xl group-hover:bg-white/5 transition-all">
                  {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                </div>
                  <span className="text-[9px] uppercase tracking-[0.4em] font-bold text-white/40 group-hover:text-white transition-all">
                    {isMuted ? "Unmute Audio" : "Sound Enabled"}
                  </span>
              </button>
            </div>
          </motion.div>
        </div>

        {/* WAC Next Video Box */}
        {nextVideo && (
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="absolute bottom-10 right-32 z-20 hidden md:block"
          >
            <div
              onClick={handleNextVideo}
              className="glass-card !bg-black/60 !rounded-xl p-4 flex items-center gap-5 border-white/10 hover:border-white/30 transition-all cursor-pointer group w-64 h-20"
            >
              <div className="w-12 h-12 rounded-lg overflow-hidden relative flex-shrink-0">
                <div className="absolute inset-0 bg-black/40 z-10 flex items-center justify-center">
                  <Play size={12} className="text-white fill-white" />
                </div>
                <video muted loop autoPlay className="w-full h-full object-cover">
                  <source src={nextVideo.video_url} type="video/mp4" />
                </video>
              </div>
              <div className="flex-grow">
                <span className="text-[8px] uppercase tracking-widest text-white/30 block mb-0.5">Next Reel</span>
                <p className="text-[10px] font-bold text-white uppercase tracking-wider line-clamp-1">{nextVideo.title}</p>
              </div>
              <ArrowRight size={14} className="text-white/20 group-hover:text-white group-hover:translate-x-1 transition-all" />
            </div>
          </motion.div>
        )}

        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/10"
        >
          <ChevronDown size={28} />
        </motion.div>
      </section>

      {/* Motto Reveal Section - Stabilized (250vh) */}
      <section className="relative h-[250vh] bg-[#0A0A0B]">
        <div className="sticky top-0 h-screen flex items-center justify-center px-6">
          <h2 className="text-3xl md:text-6xl font-serif text-center max-w-5xl leading-tight tracking-tight">
            {characters.map((char, i) => (
              <MottoChar
                key={i}
                char={char}
                index={i}
                total={characters.length}
                progress={scrollYProgress}
              />
            ))}
          </h2>
        </div>
      </section>

      {/* Services Section - Stabilized (400vh) */}
      <PinnedServices progress={scrollYProgress} services={services} />

      {/* Final Section */}
      <section className="relative py-60 bg-[#0A0A0B] text-white text-center">
        <div className="max-w-3xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Sparkles className="w-12 h-12 text-[#E2CF7C] mx-auto mb-12 opacity-30" />
            <p className="text-4xl md:text-5xl font-serif italic leading-tight mb-16 text-white/90">
              Crafting Timeless <br /> Legacies Together.
            </p>
            <Link to="/booking" className="inline-block text-[10px] font-bold uppercase tracking-[0.6em] text-[#E2CF7C] border-b border-[#E2CF7C]/30 pb-3 hover:text-white transition-all">
              The Journey Begins
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

const MottoChar = ({ char, index, total, progress }) => {
  // Balanced range (0.15 to 0.35) for a ~1000vh page
  const start = 0.1 + (index / total) * 0.2;
  const end = start + 0.03;
  const color = useTransform(progress, [start, end], ["#FFFFFF", "#9D8CCF"]);
  const y = useTransform(progress, [start, end], [10, 0]);
  const opacity = useTransform(progress, [start, end], [0.2, 1]);

  return (
    <motion.span style={{ color, y, opacity }} className="inline-block">
      {char === " " ? "\u00A0" : char}
    </motion.span>
  );
};

const PinnedServices = ({ progress, services }) => {
  // Mega-range for granular steps [0.4, 0.95]
  // Indices mapping based on progress
  const activeIndex = useTransform(progress, [0.35, 0.5, 0.65, 0.8], [0, 0, 1, 2]);
  
  const [currentIdx, setCurrentIdx] = useState(0);

  useEffect(() => {
    const unsubIdx = activeIndex.onChange(v => setCurrentIdx(Math.floor(v)));
    return () => unsubIdx();
  }, [activeIndex]);

  if (services.length === 0) return null;

  return (
    <section className="relative h-[450vh] bg-[#0A0A0B] border-y border-white/5">
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center px-6 overflow-hidden">
        
        <div className="relative w-full max-w-6xl text-center">
          <motion.div
            key={currentIdx + '-bg'}
            initial={{ opacity: 0, scale: 0.9, filter: 'blur(50px)' }}
            animate={{ opacity: 0.04, scale: 1, filter: 'blur(0px)' }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[15vw] font-serif italic text-white/5 pointer-events-none whitespace-nowrap"
          >
            {services[currentIdx].name.split(" ")[0]}
          </motion.div>

          <div className="relative z-10 flex flex-col items-center">
            <div className="relative h-[400px] flex items-center justify-center w-full">
              {services.map((s, i) => (
                <div key={i} className="absolute inset-0 flex flex-col items-center justify-center p-4">
                  <motion.h3
                    initial={{ opacity: 0, y: 30 }}
                    animate={{
                      opacity: currentIdx === i ? 1 : 0,
                      y: currentIdx === i ? 0 : 30,
                      scale: currentIdx === i ? 1 : 0.95,
                    }}
                    transition={{ duration: 0.8 }}
                    className="text-6xl md:text-9xl font-serif italic text-white mb-10 tracking-tighter leading-none"
                  >
                    {s.name}
                  </motion.h3>

                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{
                      opacity: currentIdx === i ? 1 : 0,
                      y: currentIdx === i ? 0 : 20,
                    }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-white/50 text-base md:text-xl font-light tracking-wide max-w-2xl mx-auto leading-relaxed"
                  >
                    {s.description}
                  </motion.p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Indicator Lines */}
        <div className="absolute bottom-16 flex gap-4">
          {services.map((_, i) => (
            <div key={i} className={`h-[1px] w-16 transition-all duration-700 ${currentIdx === i ? 'bg-[#E2CF7C] w-32' : 'bg-white/10'}`}></div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomePage;
