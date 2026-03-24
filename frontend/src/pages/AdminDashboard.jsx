import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import { Calendar, User, Mail, MapPin, Briefcase, Info, CheckCircle, Trash2, LayoutDashboard, LogOut, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const AdminDashboard = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [bookings, setBookings] = useState([]);
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
      fetchBookings();
    } else {
      setLoading(false);
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('auth/login/', credentials);
      localStorage.setItem('token', res.data.access);
      setIsAuthenticated(true);
      fetchBookings();
    } catch (err) {
      alert("Invalid credentials. Try admin@amoria.com / admin123");
    }
  };

  const fetchBookings = async () => {
    try {
      const res = await api.get('bookings/');
      setBookings(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const deleteBooking = async (id) => {
    if (window.confirm("Are you sure you want to dismiss this inquiry?")) {
      try {
        await api.delete(`bookings/${id}/`);
        setBookings(bookings.filter(b => b.id !== id));
      } catch (err) {
        alert("Action failed.");
      }
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="pt-48 pb-32 flex items-center justify-center bg-bg-soft px-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-card p-16 w-full max-w-lg bg-white shadow-2xl border-primary/20"
        >
          <div className="w-20 h-20 bg-primary/5 rounded-3xl flex items-center justify-center mx-auto mb-10 text-primary">
             <LayoutDashboard size={40} />
          </div>
          <h2 className="text-4xl font-serif text-primary mb-10 text-center italic leading-tight">Admin Portal</h2>
          <form onSubmit={handleLogin} className="space-y-10">
            <div className="space-y-2">
               <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary/40">Email</label>
               <input 
                type="email" 
                className="w-full p-4 bg-transparent border-b border-primary/20 outline-none focus:border-primary font-serif italic text-lg"
                onChange={e => setCredentials({...credentials, email: e.target.value})}
              />
            </div>
            <div className="space-y-2">
               <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary/40">Password</label>
               <input 
                type="password" 
                className="w-full p-4 bg-transparent border-b border-primary/20 outline-none focus:border-primary font-serif italic text-lg"
                onChange={e => setCredentials({...credentials, password: e.target.value})}
              />
            </div>
            <button type="submit" className="btn-primary w-full !py-5 uppercase text-xs !tracking-[0.3em]">Authorize Access</button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="pt-48 pb-32 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-10">
          <div>
            <div className="flex items-center gap-4 mb-4">
               <span className="w-10 h-0.5 bg-secondary"></span>
               <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-primary/40">Management Console</span>
            </div>
            <h1 className="text-6xl font-serif text-primary italic leading-tight">Inquiry Dashboard</h1>
          </div>
          <button onClick={() => { localStorage.clear(); setIsAuthenticated(false); }} className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-red-400 hover:text-red-600 transition-colors bg-red-50 px-6 py-3 rounded-full border border-red-100">
             <LogOut size={14} /> Exit Admin
          </button>
        </div>

        {loading ? (
          <div className="text-center py-40 font-serif italic text-primary/40 text-2xl">Fetching upcoming celebrations...</div>
        ) : (
          <div className="space-y-12">
            {bookings.length > 0 ? bookings.map((booking) => (
              <motion.div 
                key={booking.id} 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-card p-12 bg-white flex flex-col md:flex-row gap-16 justify-between hover:shadow-2xl transition-all border-l-8 border-secondary group overflow-hidden relative"
              >
                 <div className="absolute top-0 right-0 p-8 opacity-5 -rotate-12 pointer-events-none group-hover:scale-110 transition-transform">
                    <Briefcase size={120} />
                 </div>

                 <div className="space-y-8 flex-grow relative z-10">
                    <div className="flex items-center gap-8 flex-wrap">
                       <h3 className="text-4xl font-serif text-primary italic font-bold leading-tight">{booking.name}</h3>
                       <div className="flex items-center gap-2 px-6 py-2 bg-secondary/10 text-primary border border-secondary/20 rounded-full text-[10px] font-bold uppercase tracking-[0.2em]">
                          <div className="w-1.5 h-1.5 bg-secondary rounded-full animate-pulse"></div>
                          {booking.status}
                       </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-8 gap-x-16">
                       <div className="flex items-center gap-4 text-sm font-medium text-text-main/60"><div className="p-2 bg-bg-soft rounded-lg text-secondary"><User size={16} /></div> {booking.phone}</div>
                       <div className="flex items-center gap-4 text-sm font-medium text-text-main/60"><div className="p-2 bg-bg-soft rounded-lg text-secondary"><Mail size={16} /></div> {booking.email}</div>
                       <div className="flex items-center gap-4 text-sm font-medium text-text-main/60"><div className="p-2 bg-bg-soft rounded-lg text-secondary"><Calendar size={16} /></div> {booking.event_date}</div>
                       <div className="flex items-center gap-4 text-sm font-medium text-text-main/60 col-span-1 md:col-span-2 lg:col-span-3"><div className="p-2 bg-bg-soft rounded-lg text-secondary"><MapPin size={16} /></div> {booking.location}</div>
                    </div>

                    <div className="bg-bg-soft/50 p-8 rounded-[2rem] border border-primary/5">
                       <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary/40 mb-6">Requested Services</p>
                       <div className="flex flex-wrap gap-3">
                          {booking.services_required.map(s => (
                            <span key={s} className="bg-white px-6 py-2 rounded-2xl text-[10px] uppercase font-bold tracking-widest border border-primary/5 shadow-sm text-primary/70">{s}</span>
                          ))}
                       </div>
                    </div>

                    <div className="p-8 border-l-2 border-primary/10 italic text-text-main/50 text-lg leading-loose bg-white/50 rounded-r-3xl">
                       "{booking.notes || 'No specific notes provided.'}"
                    </div>
                 </div>
                 
                 <div className="flex md:flex-col gap-4 justify-center relative z-10">
                    <button className="w-16 h-16 bg-primary text-white rounded-3xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all shadow-xl" title="Coordinate Booking"><CheckCircle size={24}/></button>
                    <button onClick={() => deleteBooking(booking.id)} className="w-16 h-16 bg-red-50 text-red-300 rounded-3xl flex items-center justify-center hover:bg-red-500 hover:text-white transition-all border border-red-100" title="Dismiss Inquiry"><Trash2 size={24}/></button>
                 </div>
              </motion.div>
            )) : (
              <div className="glass-card p-40 text-center opacity-30 border-dashed border-2 border-primary/20">
                <Search size={64} className="mx-auto mb-8 stroke-1" />
                <p className="text-3xl font-serif italic text-primary">Awaiting new celebrations...</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
