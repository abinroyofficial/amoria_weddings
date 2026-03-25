import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../api/axios';
import { Sparkles, Camera, Heart } from 'lucide-react';

const GalleryPage = () => {
  const [items, setItems] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  const categories = ['all', 'decoration', 'floral', 'stage', 'planning'];

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const res = await api.get('gallery/');
        setItems(res.data);
      } catch (err) {
        setItems([
          { id: 1, tag: 'decoration', title: 'Grand Reception', image: 'https://picsum.photos/1000/1200?random=41' },
          { id: 2, tag: 'floral', title: 'Orchid Arch', image: 'https://picsum.photos/1000/1000?random=42' },
          { id: 3, tag: 'stage', title: 'Golden Throne', image: 'https://picsum.photos/1000/1400?random=43' },
          { id: 4, tag: 'planning', title: 'Table Setting', image: 'https://picsum.photos/1000/1100?random=44' },
          { id: 5, tag: 'decoration', title: 'Outdoor Ceremony', image: 'https://picsum.photos/1000/1000?random=45' },
          { id: 6, tag: 'floral', title: 'Bridal Bouquet', image: 'https://picsum.photos/1000/1500?random=46' },
          { id: 7, tag: 'stage', title: 'Royal Setup', image: 'https://picsum.photos/1000/1200?random=47' },
          { id: 8, tag: 'planning', title: 'Modern Minimal', image: 'https://picsum.photos/1000/1000?random=48' },
        ]);
      } finally {
        setLoading(false);
      }
    };
    fetchGallery();
  }, []);

  const filteredItems = filter === 'all' ? items : items.filter(item => item.tag === filter);

  return (
    <div className="pt-48 pb-32 bg-[#0A0A0B] min-h-screen text-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-24">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex justify-center mb-8"
          >
            <Camera className="text-[#9D8CCF] w-12 h-12 opacity-30" />
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-7xl md:text-8xl font-serif text-white mb-10 italic leading-tight"
          >
            The Gallery of Bliss
          </motion.h1>
          <div className="flex flex-wrap justify-center gap-6 mt-12">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-10 py-3 rounded-full border transition-all uppercase tracking-[0.2em] text-[10px] font-bold ${
                  filter === cat 
                  ? 'bg-white border-white text-black shadow-2xl scale-110' 
                  : 'bg-black/20 border-white/10 text-white/50 hover:border-white/40 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          <AnimatePresence mode="popLayout">
            {filteredItems.map(item => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="group relative rounded-[2.5rem] overflow-hidden shadow-[0_0_30px_rgba(255,255,255,0.02)] bg-black/40 border border-white/5"
              >
                <div className="aspect-[4/5] overflow-hidden">
                   <img 
                    src={item.image?.startsWith('http') ? item.image : `http://localhost:8000${item.image}`} 
                    alt={item.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 brightness-75 group-hover:brightness-100" 
                   />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-10 text-white">
                  <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <Heart className="text-[#E2CF7C] mb-4 w-6 h-6" fill="currentColor" />
                    <h3 className="text-3xl font-serif italic mb-2 tracking-tight">{item.title}</h3>
                    <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#E2CF7C]">{item.tag}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
        
        {loading && (
           <div className="flex justify-center py-40">
              <div className="w-12 h-12 border-4 border-white/5 border-t-[#E2CF7C] rounded-full animate-spin"></div>
           </div>
        )}
      </div>
    </div>
  );
};

export default GalleryPage;
