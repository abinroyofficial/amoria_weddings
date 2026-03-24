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
      <div className="pt-48 pb-32 flex items-center justify-center bg-white px-6">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="glass-card p-20 text-center max-w-2xl border-primary/10 shadow-2xl"
        >
          <div className="w-24 h-24 bg-primary/5 rounded-full flex items-center justify-center mx-auto mb-10">
            <CheckCircle2 className="text-secondary w-12 h-12" />
          </div>
          <h2 className="text-5xl font-serif text-primary mb-6 italic leading-tight">Thank You, <br /> Blissful Soul!</h2>
          <p className="text-text-main/50 mb-10 leading-loose text-lg font-light">
            Your inquiry for your wedding day has been received. Our team will contact you within 24 hours to begin the journey of your dream wedding.
          </p>
          <button onClick={() => window.location.href = '/'} className="btn-primary">Return to Home</button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="pt-48 pb-32 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-24 items-start">
        <div className="space-y-12">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}>
            <Sparkles className="text-secondary w-12 h-12 mb-10 opacity-30" />
            <h1 className="text-6xl md:text-8xl font-serif text-primary mb-8 italic leading-tight">Begin Your <br /> Journey</h1>
            <p className="text-text-main/50 text-xl leading-loose max-w-md font-light">
              Share your vision with us, and let Amoria Weddings orchestrate your dream day with elegance and precision.
            </p>
          </motion.div>

          <div className="space-y-8 pt-10">
            <div className="flex items-center gap-8 p-10 glass-card bg-bg-soft/50 hover:bg-white transition-all group">
              <div className="p-5 bg-white rounded-3xl text-secondary shadow-sm group-hover:scale-110 transition-transform"><Phone size={24} /></div>
              <div>
                <h4 className="font-bold uppercase tracking-[0.2em] text-[10px] text-primary/40 mb-2">Call Us Direct</h4>
                <p className="text-text-main/70 text-lg font-serif italic">+91 98765 43210</p>
              </div>
            </div>
            <div className="flex items-center gap-8 p-10 glass-card bg-bg-soft/50 hover:bg-white transition-all group">
              <div className="p-5 bg-white rounded-3xl text-secondary shadow-sm group-hover:scale-110 transition-transform"><Mail size={24} /></div>
              <div>
                <h4 className="font-bold uppercase tracking-[0.2em] text-[10px] text-primary/40 mb-2">Email Us</h4>
                <p className="text-text-main/70 text-lg font-serif italic">hello@amoria.com</p>
              </div>
            </div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="glass-card p-12 bg-white/50 border-primary/20 shadow-2xl relative"
        >
          <div className="absolute -top-6 -right-6 w-16 h-16 bg-secondary flex items-center justify-center rounded-2xl shadow-xl text-primary -rotate-12 translate-x-2 translate-y-2">
            <Heart fill="currentColor" size={24} />
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="space-y-3">
                <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary/40 flex items-center gap-3">
                  <User size={12} /> Full Name
                </label>
                <input
                  {...register('name', { required: true })}
                  className="w-full bg-transparent border-b border-primary/10 focus:border-primary px-0 py-4 outline-none transition-all text-lg font-serif italic"

                />
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary/40 flex items-center gap-3">
                  <Phone size={12} /> Phone
                </label>
                <input
                  {...register('phone', { required: true })}
                  className="w-full bg-transparent border-b border-primary/10 focus:border-primary px-0 py-4 outline-none transition-all text-lg font-serif italic"

                />
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary/40 flex items-center gap-3">
                <Mail size={12} /> Email Address
              </label>
              <input
                {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
                className="w-full bg-transparent border-b border-primary/10 focus:border-primary px-0 py-4 outline-none transition-all text-lg font-serif italic"

              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="space-y-3">
                <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary/40 flex items-center gap-3">
                  <Calendar size={18} /> Event Date
                </label>
                <input
                  type="date"
                  {...register('event_date', { required: true })}
                  className="w-full bg-transparent border-b border-primary/10 focus:border-primary px-0 py-4 outline-none transition-all text-lg font-serif"
                />
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary/40 flex items-center gap-3">
                  <MapPin size={12} /> Location
                </label>
                <input
                  {...register('location', { required: true })}
                  className="w-full bg-transparent border-b border-primary/10 focus:border-primary px-0 py-4 outline-none transition-all text-lg font-serif italic"

                />
              </div>
            </div>

            <div className="space-y-6">
              <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary/40">Services Required</label>
              <div className="grid grid-cols-2 gap-4">
                {servicesList.map(s => (
                  <label key={s} className="flex items-center gap-4 p-4 rounded-3xl cursor-pointer hover:bg-primary/5 transition-colors border border-primary/5 hover:border-primary/20 bg-white shadow-sm">
                    <input type="checkbox" value={s} {...register('services_required')} className="accent-primary w-5 h-5 scale-90" />
                    <span className="text-[10px] font-bold uppercase tracking-widest text-text-main/60">{s}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary/40">Additional Notes</label>
              <textarea
                {...register('notes')}
                rows="4"
                className="w-full bg-bg-soft/30 border border-primary/10 focus:border-primary px-6 py-6 outline-none transition-all rounded-3xl resize-none text-sm leading-loose text-text-main/60"
                placeholder="Tell us more about your dream day..."
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary !py-6 flex items-center justify-center gap-4 !text-sm group"
            >
              {loading ? <Loader2 className="animate-spin" /> : (
                <>
                  <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform" />
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
