import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import api from '../api/axios';
import { Calendar, MapPin, Mail, Phone, User, CheckCircle2, Loader2, Sparkles, Heart } from 'lucide-react';

const BookingPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const servicesList = [
    'Wedding Decoration',
    'Floral Design',
    'Stage Setup',
    'Full Event Planning'
  ];

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await api.post('bookings/', data);
      setSubmitted(true);
    } catch (err) {
      alert("Something went wrong. Please try again or contact us via WhatsApp.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="pt-48 pb-32 flex items-center justify-center bg-[#0A0A0B] min-h-screen px-6">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="p-20 text-center max-w-2xl bg-black/40 border-white/10 rounded-3xl shadow-2xl backdrop-blur-md"
        >
          <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-10">
            <CheckCircle2 className="text-[#E2CF7C] w-12 h-12" />
          </div>
          <h2 className="text-5xl font-serif text-white mb-6 italic leading-tight">Thank You, <br /> Blissful Soul!</h2>
          <p className="text-white/50 mb-10 leading-loose text-lg font-light">
            Your inquiry for your wedding day has been received. Our team will contact you within 24 hours to begin the journey of your dream wedding.
          </p>
          <button onClick={() => window.location.href = '/'} className="inline-flex items-center gap-4 text-[12px] uppercase tracking-[0.8em] text-[#E2CF7C] border-b border-[#E2CF7C]/30 pb-4 hover:border-white hover:text-white transition-all">Return to Home</button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="pt-48 pb-32 bg-[#0A0A0B] min-h-screen text-white">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-24 items-start">
        <div className="space-y-12">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}>
            <Sparkles className="text-[#E2CF7C] w-12 h-12 mb-10 opacity-30" />
            <h1 className="text-6xl md:text-8xl font-serif text-white mb-8 italic leading-tight">Begin Your <br /> Journey</h1>
            <p className="text-white/50 text-xl leading-loose max-w-md font-light">
              Share your vision with us, and let Amoria Weddings orchestrate your dream day with elegance and precision.
            </p>
          </motion.div>

          <div className="space-y-8 pt-10">
            <div className="flex items-center gap-8 p-10 bg-black/40 border border-white/5 hover:bg-white/5 transition-all group rounded-3xl">
              <div className="p-5 bg-white/5 rounded-full text-[#9D8CCF] border border-white/10 group-hover:scale-110 transition-transform"><Phone size={24} /></div>
              <div>
                <h4 className="font-bold uppercase tracking-[0.2em] text-[10px] text-white/40 mb-2">Call Us Direct</h4>
                <p className="text-white/70 text-lg font-serif italic">+91 98765 43210</p>
              </div>
            </div>
            <div className="flex items-center gap-8 p-10 bg-black/40 border border-white/5 hover:bg-white/5 transition-all group rounded-3xl">
              <div className="p-5 bg-white/5 rounded-full text-[#9D8CCF] border border-white/10 group-hover:scale-110 transition-transform"><Mail size={24} /></div>
              <div>
                <h4 className="font-bold uppercase tracking-[0.2em] text-[10px] text-white/40 mb-2">Email Us</h4>
                <p className="text-white/70 text-lg font-serif italic">hello@amoria.com</p>
              </div>
            </div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="p-12 bg-black/40 border border-white/10 rounded-[3rem] shadow-2xl relative backdrop-blur-xl"
        >
          <div className="absolute -top-6 -right-6 w-16 h-16 bg-[#0A0A0B] flex items-center justify-center rounded-2xl border border-white/10 shadow-xl text-[#E2CF7C] -rotate-12 translate-x-2 translate-y-2">
            <Heart fill="currentColor" size={24} />
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="space-y-3">
                <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/40 flex items-center gap-3">
                  <User size={12} /> Full Name
                </label>
                <input
                  {...register('name', { required: true })}
                  className="w-full bg-transparent border-b border-white/10 focus:border-white px-0 py-4 outline-none transition-all text-lg font-serif italic text-white"

                />
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/40 flex items-center gap-3">
                  <Phone size={12} /> Phone
                </label>
                <input
                  {...register('phone', { required: true })}
                  className="w-full bg-transparent border-b border-white/10 focus:border-white px-0 py-4 outline-none transition-all text-lg font-serif italic text-white"

                />
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/40 flex items-center gap-3">
                <Mail size={12} /> Email Address
              </label>
              <input
                {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
                className="w-full bg-transparent border-b border-white/10 focus:border-white px-0 py-4 outline-none transition-all text-lg font-serif italic text-white"

              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="space-y-3">
                <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/40 flex items-center gap-3">
                  <Calendar size={18} /> Event Date
                </label>
                <input
                  type="date"
                  {...register('event_date', { required: true })}
                  className="w-full bg-transparent border-b border-white/10 focus:border-white px-0 py-4 outline-none transition-all text-lg font-serif text-white/60 focus:text-white"
                />
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/40 flex items-center gap-3">
                  <MapPin size={12} /> Location
                </label>
                <input
                  {...register('location', { required: true })}
                  className="w-full bg-transparent border-b border-white/10 focus:border-white px-0 py-4 outline-none transition-all text-lg font-serif italic text-white"

                />
              </div>
            </div>

            <div className="space-y-6">
              <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/40">Services Required</label>
              <div className="grid grid-cols-2 gap-4">
                {servicesList.map(s => (
                  <label key={s} className="flex items-center gap-4 p-4 rounded-xl cursor-pointer hover:bg-white/5 transition-colors border border-white/5 hover:border-white/20 bg-black/20 shadow-sm">
                    <input type="checkbox" value={s} {...register('services_required')} className="accent-[#9D8CCF] w-5 h-5 scale-90" />
                    <span className="text-[10px] font-bold uppercase tracking-widest text-white/60">{s}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/40">Additional Notes</label>
              <textarea
                {...register('notes')}
                rows="4"
                className="w-full bg-black/20 border border-white/5 focus:border-white/20 px-6 py-6 outline-none transition-all rounded-2xl resize-none text-sm leading-loose text-white/60"
                placeholder="Tell us more about your dream day..."
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-white text-black py-4 uppercase font-bold tracking-[0.3em] text-[10px] hover:bg-white/90 transition-all shadow-[0_0_30px_rgba(255,255,255,0.1)] flex items-center justify-center gap-4 group rounded-xl"
            >
              {loading ? <Loader2 className="animate-spin" /> : (
                <>
                  <Sparkles className="w-4 h-4 text-[#9D8CCF] group-hover:rotate-12 transition-transform" />
                  Request Full Consultation
                </>
              )}
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default BookingPage;
