import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Play, Volume2, VolumeX, Heart, Quote, ChevronDown, Sparkles, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import api from '../api/axios';

const HomePage = () => {
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
        video.muted = !video.muted;
        setIsMuted(video.muted);
        if (!video.muted) {
            video.play().catch(e => console.log("Audio play blocked", e));
        }
    }
  };

  const motto = "We turn your dreams into unforgettable memories";
  const characters = motto.split("");

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
            className="absolute inset-0 bg-viouler shadow-[0_0_10px_#9D8CCF]"
          />
        </div>
      </div>

      {/* Cinematic Video Scroll Section - First 400vh */}
      <VideoScrollSection 
        items={galleryItems} 
        progress={scrollYProgress} 
        isMuted={isMuted} 
        toggleSound={toggleSound} 
      />

      {/* Motto Reveal Section - Stabilized (250vh) */}
      <section className="relative h-[250vh] bg-[#0A0A0B]">
         <div className="sticky top-0 h-screen flex items-center justify-center px-6">
            <h2 className="text-3xl md:text-7xl font-serif text-center max-w-6xl leading-tight tracking-tight">
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

      {/* Services Section - Condensed (450vh) */}
      <PinnedServices progress={scrollYProgress} services={services} />

      {/* Final Section */}
      <section className="relative py-80 bg-[#0A0A0B] text-white text-center">
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
                  <span className="text-[9px] uppercase tracking-widest text-white/20 group-hover:text-white">Back to Top</span>
               </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

const VideoScrollSection = ({ items, progress, isMuted, toggleSound }) => {
  // Use first 0.3 of the total page scroll for the video scroll
  const activeIndex = useTransform(progress, [0, 0.1, 0.2, 0.3], [0, 1, 2, 3], { clamp: true });
  const [currentIdx, setCurrentIdx] = useState(0);

  useEffect(() => {
    const unsub = activeIndex.onChange(v => {
      const idx = Math.floor(v);
      if (idx !== currentIdx) setCurrentIdx(idx);
    });
    return () => unsub();
  }, [activeIndex, currentIdx]);

  if (items.length === 0) return null;
  const displayItems = items.slice(0, 4);

  return (
    <section className="relative h-[400vh] bg-black">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {displayItems.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: currentIdx === index ? 1 : 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <video 
              autoPlay 
              loop 
              muted={isMuted}
              playsInline
              key={item.video_url}
              className="w-full h-full object-cover brightness-[0.5] scale-105"
            >
              <source src={item.video_url} type="video/mp4" />
            </video>
          </motion.div>
        ))}

        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-[#0A0A0B] z-10" />

        <div className="relative z-20 h-full flex flex-col items-center justify-center text-center px-6">
          <motion.div 
             key={currentIdx}
             initial={{ opacity: 0, y: 30 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 1, ease: "easeOut" }}
          >
             <span className="text-[#E2CF7C] text-[10px] uppercase tracking-[1em] font-bold mb-8 block opacity-60">Amoria Wedding Cinematic</span>
             <h1 className="text-7xl md:text-[8rem] font-serif italic mb-6 tracking-tighter leading-none text-white drop-shadow-2xl">
               {displayItems[currentIdx]?.title || "The Celebration"}
             </h1>
          </motion.div>
          
          <button 
             onClick={toggleSound}
             className="mt-20 flex flex-col items-center gap-4 group"
           >
             <div className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center text-white backdrop-blur-2xl group-hover:bg-white/5 transition-all">
               {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
             </div>
             <span className="text-[8px] uppercase tracking-[0.4em] font-bold text-white/40 group-hover:text-white transition-all">
               {isMuted ? "Unmute Audio" : "Sound Enabled"}
             </span>
           </button>
        </div>

        <div className="absolute bottom-16 left-1/2 -translate-x-1/2 z-30 flex gap-4">
           {displayItems.map((_, i) => (
             <div key={i} className={`h-[1px] w-12 transition-all duration-700 ${currentIdx === i ? 'bg-viouler w-24' : 'bg-white/10'}`}></div>
           ))}
        </div>
      </div>
    </section>
  );
};

const MottoChar = ({ char, index, total, progress }) => {
  const start = 0.35 + (index / total) * 0.2; // Start after VideoScroll (0.35)
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
  const activeIndex = useTransform(progress, [0.6, 0.7, 0.8, 0.9], [0, 0, 1, 2]);
  const [currentIdx, setCurrentIdx] = useState(0);

  useEffect(() => {
    const unsubIdx = activeIndex.onChange(v => {
        const idx = Math.floor(v);
        if (idx !== currentIdx) setCurrentIdx(idx);
    });
    return () => unsubIdx();
  }, [activeIndex, currentIdx]);

  if (services.length === 0) return null;

  return (
    <section className="relative h-[450vh] bg-[#0A0A0B] border-y border-white/5">
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center px-6 overflow-hidden">
        <div className="relative w-full max-w-6xl text-center">
          <motion.div
            key={currentIdx + '-bg'}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 0.04, scale: 1 }}
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
