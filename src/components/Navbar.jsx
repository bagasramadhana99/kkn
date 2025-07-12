import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';

// --- Ikon untuk Tombol Menu ---
const MenuIcon = (props) => (
  <svg {...props} stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
    <line x1="3" y1="12" x2="21" y2="12"></line>
    <line x1="3" y1="6" x2="21" y2="6"></line>
    <line x1="3" y1="18" x2="21" y2="18"></line>
  </svg>
);

const CloseIcon = (props) => (
  <svg {...props} stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

const LogoutIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
  </svg>
);


export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State untuk menu mobile

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  const linkClass = ({ isActive }) =>
    isActive
      ? 'bg-blue-100 text-blue-600 font-semibold px-3 py-2 rounded-md text-sm'
      : 'text-slate-700 hover:bg-slate-100 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium';

  // Kelas untuk link di menu mobile
  const mobileLinkClass = ({ isActive }) =>
    isActive
      ? 'block text-center bg-blue-600 text-white font-semibold py-3 rounded-md text-base'
      : 'block text-center text-slate-300 hover:bg-slate-700 hover:text-white py-3 rounded-md text-base font-medium';

  return (
    <nav className="bg-white shadow-sm border-b border-slate-200 sticky top-0 z-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          
          {/* Bagian Kiri: Logo & Nama */}
          <div className="flex items-center gap-x-3">
            <img className="h-9 w-auto" src="/Logo.png" alt="Logo KKN" />
            <span className="text-slate-800 font-bold text-lg hidden sm:block">
              KKN Desa Belor
            </span>
          </div>

          {/* Bagian Tengah: Menu Desktop */}
          <div className="hidden md:block">
            <div className="flex items-baseline space-x-4">
              <NavLink to="/" className={linkClass}>Home</NavLink>
              <NavLink to="/kegiatan" className={linkClass}>Kegiatan</NavLink>
              <NavLink to="/profil" className={linkClass}>Profil</NavLink>
              <NavLink to="/about" className={linkClass}>About</NavLink>
            </div>
          </div>

          {/* Bagian Kanan: Tombol Logout Desktop */}
          <div className="hidden md:block">
            <button 
              onClick={handleLogout} 
              className="flex items-center gap-x-2 px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-lg hover:bg-red-600 transition-colors"
            >
              <LogoutIcon />
              <span>Logout</span>
            </button>
          </div>

          {/* Tombol Hamburger untuk Mobile */}
          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 rounded-md text-slate-600 hover:bg-slate-100">
              {isMenuOpen ? <CloseIcon className="w-6 h-6"/> : <MenuIcon className="w-6 h-6"/>}
            </button>
          </div>
        </div>
      </div>

      {/* Menu Mobile yang Muncul */}
      {isMenuOpen && (
        <div className="md:hidden bg-slate-800 px-4 pt-2 pb-4 space-y-2">
          <NavLink to="/" className={mobileLinkClass} onClick={() => setIsMenuOpen(false)}>Home</NavLink>
          <NavLink to="/kegiatan" className={mobileLinkClass} onClick={() => setIsMenuOpen(false)}>Kegiatan</NavLink>
          <NavLink to="/profil" className={mobileLinkClass} onClick={() => setIsMenuOpen(false)}>Profil</NavLink>
          <NavLink to="/about" className={mobileLinkClass} onClick={() => setIsMenuOpen(false)}>About</NavLink>
          <hr className="border-slate-700 my-4"/>
          <button 
            onClick={handleLogout} 
            className="w-full flex items-center justify-center gap-x-2 px-4 py-3 text-base font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors"
          >
            <LogoutIcon />
            <span>Logout</span>
          </button>
        </div>
      )}
    </nav>
  );
}
