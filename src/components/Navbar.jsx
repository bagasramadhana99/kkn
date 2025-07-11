import { NavLink } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';

// Icon sederhana untuk Logout
const LogoutIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
  </svg>
);

export default function Navbar() {
  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  const linkClass = ({ isActive }) =>
    isActive
      ? 'bg-blue-50 text-blue-600 font-semibold px-3 py-2 rounded-md text-sm'
      : 'text-slate-700 hover:bg-slate-100 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium';

  return (
    <nav className="bg-white shadow-sm border-b border-slate-200 sticky top-0 z-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          
          {/* BAGIAN KIRI: Logo & Nama KKN */}
          <div className="flex items-center gap-x-3">
            <img 
              className="h-9 w-auto" 
              src="/Logo.png" // Pastikan nama file ini sesuai dengan nama logo Anda di folder /public
              alt="Logo KKN" 
            />
            <span className="text-slate-800 font-bold text-lg hidden sm:block">
              KKN Desa Belor
            </span>
          </div>

          {/* BAGIAN TENGAH: Menu Navigasi */}
          <div className="hidden md:block">
            <div className="flex items-baseline space-x-4">
              <NavLink to="/" className={linkClass}>Home</NavLink>
              <NavLink to="/kegiatan" className={linkClass}>Kegiatan</NavLink>
              <NavLink to="/profil" className={linkClass}>Profil</NavLink>
              <NavLink to="/about" className={linkClass}>About</NavLink>
            </div>
          </div>

          {/* BAGIAN KANAN: Tombol Logout */}
          <div className="hidden md:block">
            <button 
              onClick={handleLogout} 
              className="flex items-center gap-x-2 px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-lg hover:bg-red-600 transition-colors"
            >
              <LogoutIcon />
              <span>Logout</span>
            </button>
          </div>

          {/* Di sini Anda bisa menambahkan handler untuk menu mobile (hamburger) jika diperlukan */}
          
        </div>
      </div>
    </nav>
  );
}