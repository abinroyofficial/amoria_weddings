import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import { 
  Calendar, User, Mail, MapPin, Briefcase, Info, CheckCircle, Trash2, 
  LayoutDashboard, LogOut, Search, Plus, X, Edit, Image as ImageIcon,
  MessageSquare, Camera, Settings, Star, Save
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const CATEGORIES = [
  { id: 'bookings', name: 'Inquiries', icon: Calendar, endpoint: 'bookings/' },
  { id: 'services', name: 'Services', icon: Briefcase, endpoint: 'services/' },
  { id: 'gallery', name: 'Gallery', icon: Camera, endpoint: 'gallery/' },
  { id: 'testimonials', name: 'Testimonials', icon: MessageSquare, endpoint: 'testimonials/' }
];

const AdminDashboard = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState('bookings');
  const [data, setData] = useState([]);
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({});
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
      fetchData();
    } else {
      setLoading(false);
    }
  }, [activeTab]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('auth/login/', credentials);
      localStorage.setItem('token', res.data.access);
      setIsAuthenticated(true);
      fetchData();
    } catch (err) {
      alert("Invalid credentials. Please use the admin credentials provided.");
    }
  };

  const fetchData = async () => {
    setLoading(true);
    const category = CATEGORIES.find(c => c.id === activeTab);
    try {
      const res = await api.get(category.endpoint);
      setData(res.data);
    } catch (err) {
      console.error(`Failed to fetch ${activeTab}:`, err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure? This action cannot be undone.")) return;
    const category = CATEGORIES.find(c => c.id === activeTab);
    try {
      await api.delete(`${category.endpoint}${id}/`);
      setData(data.filter(item => item.id !== id));
    } catch (err) {
      alert("Delete failed. Please ensure you have admin privileges.");
    }
  };

  const openModal = (item = null) => {
    setEditingItem(item);
    setFormData(item || {});
    setImageFile(null);
    setIsModalOpen(true);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const category = CATEGORIES.find(c => c.id === activeTab);
    const submitData = new FormData();
    
    // Convert JSON fields if necessary (for bookings)
    Object.keys(formData).forEach(key => {
        if (key === 'services_required' && Array.isArray(formData[key])) {
            submitData.append(key, JSON.stringify(formData[key]));
        } else if (key !== 'image' && key !== 'avatar') {
            submitData.append(key, formData[key]);
        }
    });

    if (imageFile) {
      const imageKey = activeTab === 'testimonials' ? 'avatar' : 'image';
      submitData.append(imageKey, imageFile);
    }

    try {
      if (editingItem) {
        const res = await api.patch(`${category.endpoint}${editingItem.id}/`, submitData);
        setData(data.map(item => item.id === editingItem.id ? res.data : item));
      } else {
        const res = await api.post(category.endpoint, submitData);
        setData([res.data, ...data]);
      }
      setIsModalOpen(false);
    } catch (err) {
      console.error("Submit failed:", err.response?.data || err.message);
      alert("Action failed. Check console for details.");
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="pt-48 pb-32 flex items-center justify-center bg-[#0A0A0B] min-h-screen px-6 font-sans">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="p-16 w-full max-w-lg bg-black/40 border border-white/10 rounded-[3rem] shadow-2xl backdrop-blur-xl">
          <div className="w-20 h-20 bg-white/5 rounded-3xl flex items-center justify-center mx-auto mb-10 text-[#9D8CCF] border border-white/5"><LayoutDashboard size={40} /></div>
          <h2 className="text-4xl font-serif text-white mb-10 text-center italic leading-tight uppercase tracking-widest">Authorized Access Only</h2>
          <form onSubmit={handleLogin} className="space-y-10">
            <div className="space-y-2">
               <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/30">Email Address</label>
               <input type="email" required className="w-full p-4 bg-transparent border-b border-white/10 outline-none focus:border-[#E2CF7C] font-serif italic text-lg text-white" onChange={e => setCredentials({...credentials, email: e.target.value})} />
            </div>
            <div className="space-y-2">
               <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/30">Password</label>
               <input type="password" required className="w-full p-4 bg-transparent border-b border-white/10 outline-none focus:border-[#E2CF7C] font-serif italic text-lg text-white" onChange={e => setCredentials({...credentials, password: e.target.value})} />
            </div>
            <button type="submit" className="w-full bg-white text-black py-5 uppercase font-bold tracking-[0.4em] text-[10px] hover:bg-white/90 transition-all rounded-2xl">Enter Management Suite</button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-32 bg-[#0A0A0B] min-h-screen text-white font-sans flex">
      {/* Sidebar */}
      <div className="w-80 border-r border-white/5 px-8 hidden lg:flex flex-col gap-12 fixed left-0 top-32 bottom-0 bg-[#0A0A0B]/50 backdrop-blur-3xl z-40">
        <div>
          <span className="text-[9px] uppercase tracking-[0.5em] text-white/20 font-bold block mb-8">Navigation</span>
          <div className="flex flex-col gap-4">
            {CATEGORIES.map(cat => (
              <button 
                key={cat.id} 
                onClick={() => setActiveTab(cat.id)}
                className={`flex items-center gap-4 px-6 py-4 rounded-2xl transition-all group ${activeTab === cat.id ? 'bg-white text-black shadow-[0_10px_30px_rgba(255,255,255,0.1)]' : 'text-white/40 hover:text-white hover:bg-white/5'}`}
              >
                <cat.icon size={18} className={activeTab === cat.id ? 'text-black' : 'text-[#9D8CCF] opacity-50'} />
                <span className="text-xs font-bold uppercase tracking-[0.2em]">{cat.name}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="mt-auto pb-12">
            <button onClick={() => { localStorage.clear(); window.location.reload(); }} className="flex items-center gap-4 px-6 py-4 text-red-400 hover:text-red-300 transition-all text-xs font-bold uppercase tracking-[0.2em] w-full border border-red-400/10 rounded-2xl bg-red-400/5">
                <LogOut size={16} /> Logout Securely
            </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-grow lg:ml-80 px-8 lg:px-16 pt-8">
        <div className="max-w-7xl mx-auto">
            <header className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
                <div>
                   <div className="flex items-center gap-4 mb-4">
                      <span className="w-8 h-[1px] bg-[#E2CF7C]"></span>
                      <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-[#E2CF7C]">Database Controller</span>
                   </div>
                   <h1 className="text-6xl md:text-8xl font-serif italic text-white leading-none">
                     Manage {CATEGORIES.find(c => c.id === activeTab).name}
                   </h1>
                </div>
                <button 
                  onClick={() => openModal()}
                  className="flex items-center gap-4 px-8 py-5 bg-white text-black rounded-3xl text-[10px] font-bold uppercase tracking-[0.3em] hover:scale-105 transition-all shadow-xl"
                >
                  <Plus size={16} /> Add New Entry
                </button>
            </header>

            {loading ? (
                <div className="py-40 text-center animate-pulse">
                    <span className="text-4xl font-serif italic text-white/10 uppercase tracking-[0.2em]">Synchronizing Records...</span>
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-8">
                    {data.length > 0 ? data.map((item) => (
                        <AdminRecord key={item.id} type={activeTab} item={item} onEdit={openModal} onDelete={handleDelete} />
                    )) : (
                        <div className="p-40 text-center border border-dashed border-white/5 rounded-[4rem] bg-white/2">
                            <Search size={48} className="mx-auto mb-8 text-white/10" />
                            <p className="text-2xl font-serif italic text-white/20 uppercase tracking-widest">No entries found in this registry</p>
                        </div>
                    )}
                </div>
            )}
        </div>
      </div>

      {/* Entry Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsModalOpen(false)} className="absolute inset-0 bg-black/80 backdrop-blur-xl" />
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="relative bg-[#0A0A0B] w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-[3.5rem] p-12 lg:p-16 border border-white/10 shadow-3xl">
                <div className="flex justify-between items-center mb-12">
                   <h2 className="text-3xl font-serif italic text-white">{editingItem ? 'Edit Entry' : 'New Entry'}</h2>
                   <button onClick={() => setIsModalOpen(false)} className="p-2 hover:rotate-90 transition-transform"><X size={24} className="text-white/40" /></button>
                </div>

                <form onSubmit={handleFormSubmit} className="space-y-8">
                    {/* Render fields dynamically based on tab */}
                    {activeTab === 'bookings' && (
                        <>
                            <FormInput label="Full Name" value={formData.name} onChange={v => setFormData({...formData, name: v})} />
                            <div className="grid grid-cols-2 gap-8">
                                <FormInput label="Email" type="email" value={formData.email} onChange={v => setFormData({...formData, email: v})} />
                                <FormInput label="Phone" value={formData.phone} onChange={v => setFormData({...formData, phone: v})} />
                            </div>
                            <div className="grid grid-cols-2 gap-8">
                                <FormInput label="Event Date" type="date" value={formData.event_date} onChange={v => setFormData({...formData, event_date: v})} />
                                <FormInput label="Location" value={formData.location} onChange={v => setFormData({...formData, location: v})} />
                            </div>
                            <FormInput label="Services Requested (Comma Separated)" value={Array.isArray(formData.services_required) ? formData.services_required.join(', ') : ''} onChange={v => setFormData({...formData, services_required: v.split(',').map(s => s.trim())})} />
                            <FormTextarea label="Notes" value={formData.notes} onChange={v => setFormData({...formData, notes: v})} />
                        </>
                    )}

                    {activeTab === 'services' && (
                        <>
                            <FormInput label="Service Title" value={formData.name} onChange={v => setFormData({...formData, name: v})} />
                            <div className="grid grid-cols-2 gap-8">
                                <FormSelect 
                                    label="Category" 
                                    value={formData.category} 
                                    options={[
                                        {v: 'decoration', l: 'Decoration'}, 
                                        {v: 'floral', l: 'Floral'}, 
                                        {v: 'stage', l: 'Stage'}, 
                                        {v: 'planning', l: 'Planning'}
                                    ]} 
                                    onChange={v => setFormData({...formData, category: v})} 
                                />
                                <FormInput label="Starting Price" type="number" value={formData.price} onChange={v => setFormData({...formData, price: v})} />
                            </div>
                            <FormTextarea label="Description" value={formData.description} onChange={v => setFormData({...formData, description: v})} />
                            <FormFileInput label="Service Image" onChange={f => setImageFile(f)} />
                            <div className="flex items-center gap-4">
                                <input type="checkbox" checked={formData.is_featured} onChange={e => setFormData({...formData, is_featured: e.target.checked})} className="w-4 h-4 rounded border-white/10" id="featured" />
                                <label htmlFor="featured" className="text-[10px] uppercase font-bold tracking-widest text-white/60 cursor-pointer">Mark as Featured Service</label>
                            </div>
                        </>
                    )}

                    {activeTab === 'gallery' && (
                        <>
                            <FormInput label="Work Title" value={formData.title} onChange={v => setFormData({...formData, title: v})} />
                            <div className="grid grid-cols-2 gap-8">
                                <FormSelect 
                                    label="Collection Tag" 
                                    value={formData.tag} 
                                    options={[
                                        {v: 'all', l: 'General'}, 
                                        {v: 'decoration', l: 'Decoration'}, 
                                        {v: 'floral', l: 'Floral'}, 
                                        {v: 'stage', l: 'Stage'},
                                        {v: 'planning', l: 'Planning'},
                                        {v: 'hero', l: 'Hero Reel'}
                                    ]} 
                                    onChange={v => setFormData({...formData, tag: v})} 
                                />
                                <FormInput label="Video URL (Reels)" value={formData.video_url} onChange={v => setFormData({...formData, video_url: v})} />
                            </div>
                            <FormFileInput label="Cover Artwork" onChange={f => setImageFile(f)} />
                            <div className="flex items-center gap-4">
                                <input type="checkbox" checked={formData.is_hero} onChange={e => setFormData({...formData, is_hero: e.target.checked})} className="w-4 h-4 rounded border-white/10" id="hero-item" />
                                <label htmlFor="hero-item" className="text-[10px] uppercase font-bold tracking-widest text-white/60 cursor-pointer">Set as Main Hero Visual</label>
                            </div>
                        </>
                    )}

                    {activeTab === 'testimonials' && (
                        <>
                            <div className="grid grid-cols-2 gap-8">
                                <FormInput label="Author Name" value={formData.author_name} onChange={v => setFormData({...formData, author_name: v})} />
                                <FormInput label="Role / Relationship" value={formData.role} onChange={v => setFormData({...formData, role: v})} />
                            </div>
                            <FormTextarea label="Words of Appreciation" value={formData.content} onChange={v => setFormData({...formData, content: v})} />
                            <div className="grid grid-cols-2 gap-8 items-center">
                                <FormInput label="Rating (1-5)" type="number" min="1" max="5" value={formData.rating} onChange={v => setFormData({...formData, rating: v})} />
                                <FormFileInput label="Profile Avatar" onChange={f => setImageFile(f)} />
                            </div>
                        </>
                    )}

                    <div className="pt-8">
                        <button type="submit" className="w-full bg-[#E2CF7C] text-black py-5 uppercase font-bold tracking-[0.4em] text-[10px] hover:bg-white transition-all rounded-2xl flex items-center justify-center gap-4 shadow-2xl">
                           <Save size={16} /> {editingItem ? 'Publish Changes' : 'Create Record'}
                        </button>
                    </div>
                </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

// --- Subcomponents ---

const AdminRecord = ({ type, item, onEdit, onDelete }) => {
    return (
        <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="p-10 bg-black/40 border border-white/5 rounded-[3rem] hover:bg-black/60 transition-all group flex flex-col md:flex-row gap-12 items-center justify-between backdrop-blur-md">
            <div className="flex items-center gap-10 flex-grow">
                {/* Thumbnail Preview */}
                {(item.image || item.avatar) && (
                    <div className="w-24 h-24 rounded-3xl overflow-hidden shadow-2xl border border-white/10 shrink-0">
                        <img src={item.image || item.avatar} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" alt="" />
                    </div>
                )}
                
                <div className="space-y-2">
                    <div className="flex items-center gap-3">
                        <span className="text-[9px] uppercase tracking-[0.3em] font-bold text-[#9D8CCF] opacity-60">ID #{item.id}</span>
                        {item.is_featured && <span className="text-[7px] uppercase tracking-[0.2em] font-bold bg-[#E2CF7C] text-black px-2 py-0.5 rounded">Featured</span>}
                        {item.is_hero && <span className="text-[7px] uppercase tracking-[0.2em] font-bold bg-[#9D8CCF] text-white px-2 py-0.5 rounded">Hero</span>}
                    </div>
                    <h3 className="text-2xl font-serif italic text-white">{item.name || item.title || item.author_name}</h3>
                    <p className="text-[10px] uppercase tracking-widest text-white/30 truncate max-w-xs">{item.category || item.tag || item.role || item.event_date}</p>
                </div>
            </div>

            <div className="flex items-center gap-4">
                <button onClick={() => onEdit(item)} className="p-5 bg-white/5 text-white/50 border border-white/5 hover:text-white rounded-[1.5rem] hover:bg-white/10 transition-all">
                    <Edit size={18} />
                </button>
                <button onClick={() => onDelete(item.id)} className="p-5 bg-red-400/5 text-red-400/50 border border-red-100/5 hover:text-red-400 rounded-[1.5rem] hover:bg-red-400/10 transition-all">
                    <Trash2 size={18} />
                </button>
            </div>
        </motion.div>
    );
};

const FormInput = ({ label, type = 'text', value, onChange, ...props }) => (
    <div className="space-y-3">
        <label className="text-[9px] font-bold uppercase tracking-[0.3em] text-white/30 block ml-2">{label}</label>
        <input 
            type={type} 
            value={value || ''} 
            onChange={e => onChange(e.target.value)}
            className="w-full p-5 bg-white/2 border border-white/5 rounded-2xl outline-none focus:border-[#E2CF7C]/50 transition-all font-serif italic text-white placeholder:text-white/5"
            {...props}
        />
    </div>
);

const FormTextarea = ({ label, value, onChange }) => (
    <div className="space-y-3">
        <label className="text-[9px] font-bold uppercase tracking-[0.3em] text-white/30 block ml-2">{label}</label>
        <textarea 
            rows="4" 
            value={value || ''} 
            onChange={e => onChange(e.target.value)}
            className="w-full p-5 bg-white/2 border border-white/5 rounded-2xl outline-none focus:border-[#E2CF7C]/50 transition-all font-serif italic text-white resize-none"
        />
    </div>
);

const FormSelect = ({ label, value, options, onChange }) => (
    <div className="space-y-3">
        <label className="text-[9px] font-bold uppercase tracking-[0.3em] text-white/30 block ml-2">{label}</label>
        <select 
            value={value || ''} 
            onChange={e => onChange(e.target.value)}
            className="w-full p-5 bg-black/40 border border-white/5 rounded-2xl outline-none focus:border-[#E2CF7C]/50 transition-all font-serif italic text-white appearance-none"
        >
            <option value="">Select Option</option>
            {options.map(opt => <option key={opt.v} value={opt.v}>{opt.l}</option>)}
        </select>
    </div>
);

const FormFileInput = ({ label, onChange }) => (
    <div className="space-y-3">
        <label className="text-[9px] font-bold uppercase tracking-[0.3em] text-white/30 block ml-2">{label}</label>
        <div className="relative h-20 bg-white/2 border border-dashed border-white/10 rounded-2xl flex items-center justify-center group hover:bg-white/5 transition-all">
            <input 
                type="file" 
                className="absolute inset-0 opacity-0 cursor-pointer" 
                onChange={e => onChange(e.target.files[0])}
            />
            <div className="flex items-center gap-4 text-white/20 group-hover:text-white/50 transition-colors">
                <ImageIcon size={20} />
                <span className="text-[10px] uppercase font-bold tracking-widest">Click to upload visual asset</span>
            </div>
        </div>
    </div>
);

export default AdminDashboard;
