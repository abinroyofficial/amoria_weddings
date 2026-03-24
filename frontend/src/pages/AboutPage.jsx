import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Heart, Sparkles, Award, Users, Quote } from 'lucide-react';
import heroImg from '../assets/hero_wedding.png';

const AboutPage = () => {
  return (
    <div className="bg-white">
      {/* Lighter Hero with Parallax Feel */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <motion.div 
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2 }}
          className="absolute inset-0"
        >
          <img src={heroImg} className="w-full h-full object-cover opacity-10 grayscale brightness-125" alt="" />
        </motion.div>
        <div className="relative text-center px-6 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <Sparkles className="text-secondary w-12 h-12 mx-auto mb-10 opacity-30" />
            <h1 className="text-7xl md:text-9xl font-serif text-primary mb-8 italic leading-tight">The Story <br/> of Amoria</h1>
            <div className="w-24 h-0.5 bg-secondary/30 mx-auto mb-12"></div>
            <p className="text-xl text-text-main/50 font-light leading-loose tracking-wide">
              Founded on the passion for creating timeless celebrations that echo your unique bond. We believe every couple deserves a masterpiece.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Philosophy Mosaic */}
      <section className="py-40 max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-32 items-center">
        <div className="space-y-12">
          <motion.div
             initial={{ opacity: 0, x: -50 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
          >
            <h2 className="text-5xl font-serif text-primary italic leading-tight mb-8">A Vision of <br/> Pure Elegance</h2>
            <p className="text-text-main/60 leading-relaxed text-lg font-light">
              At Amoria Weddings, we believe that every wedding is a sacred narrative. Our mission is to weave magic into every detail, transforming venues into dreamscapes and moments into memories that last generations.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-2 gap-10">
             <motion.div 
               whileHover={{ y: -10 }}
               className="text-left p-10 glass-card"
             >
               <Award className="text-secondary w-8 h-8 mb-6" />
               <h4 className="font-bold uppercase tracking-widest text-xs mb-2">Award Winning</h4>
               <p className="text-[10px] text-text-main/40 leading-relaxed uppercase tracking-widest">Recognized for Excellence</p>
             </motion.div>
             <motion.div 
               whileHover={{ y: -10 }}
               className="text-left p-10 glass-card"
             >
               <Users className="text-secondary w-8 h-8 mb-6" />
               <h4 className="font-bold uppercase tracking-widest text-xs mb-2">Creative Team</h4>
               <p className="text-[10px] text-text-main/40 leading-relaxed uppercase tracking-widest">Passionate Professionals</p>
             </motion.div>
          </div>
        </div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative"
        >
           <div className="absolute inset-0 bg-primary/5 rounded-[5rem] translate-x-10 translate-y-10"></div>
           <div className="relative rounded-[4rem] overflow-hidden shadow-premium z-10 aspect-[4/5]">
             <img src="https://picsum.photos/1000/1200?random=50" className="w-full h-full object-cover grayscale opacity-90 transition-all hover:grayscale-0 duration-1000" alt="Team" />
           </div>
        </motion.div>
      </section>

      {/* Principles Horizontal Section */}
      <section className="py-40 bg-bg-soft">
        <div className="max-w-6xl mx-auto px-6">
           <Quote className="text-primary w-16 h-16 mx-auto mb-16 opacity-10" />
           <div className="grid md:grid-cols-3 gap-24">
             {[
               { title: 'Intimacy', desc: 'Focusing on the smallest gestures that make your day intimate.' },
               { title: 'Grandeur', desc: 'Delivering scale and luxury that leaves your guests in awe.' },
               { title: 'Flow', desc: 'Expert planning that ensures you lead your day with a smile.' }
             ].map((principle, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.2 }}
                  className="space-y-6 text-center"
                >
                   <h3 className="text-3xl font-serif text-primary italic">{principle.title}</h3>
                   <div className="w-10 h-0.5 bg-secondary mx-auto"></div>
                   <p className="text-text-main/50 text-sm font-light leading-relaxed">{principle.desc}</p>
                </motion.div>
             ))}
           </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-40 text-center">
         <motion.div
           initial={{ opacity: 0 }}
           whileInView={{ opacity: 1 }}
           viewport={{ once: true }}
         >
           <Heart className="text-secondary w-12 h-12 mx-auto mb-10 opacity-30" />
           <h2 className="text-6xl font-serif text-primary italic mb-12">Let's Create Your Legacy</h2>
           <Link to="/booking" className="btn-primary !px-16 !py-5">Start Your Journey</Link>
         </motion.div>
      </section>
    </div>
  );
};

export default AboutPage;
