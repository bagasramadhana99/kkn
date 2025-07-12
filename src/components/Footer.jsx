import { Link } from 'react-router-dom';

// --- Komponen Ikon SVG untuk Media Sosial ---
const InstagramIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const TikTokIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
  </svg>
);

const YouTubeIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2A29 29 0 0 0 23 11.75a29 29 0 0 0-.46-5.33z"></path>
    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
  </svg>
);

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-800 text-slate-300">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Kolom 1: Identitas */}
          <div className="space-y-3">
            <h2 className="text-xl font-bold text-white">KKN-T Desa Belor</h2>
            <p className="text-sm text-slate-400">Tim KKN [Nama Universitas Anda]</p>
            <p className="text-sm text-slate-400">"Bersama Membangun, Bersama Menginspirasi"</p>
          </div>

          {/* Kolom 2: Navigasi Cepat */}
          <div>
            <h3 className="text-md font-semibold text-white tracking-wider uppercase">Navigasi</h3>
            <ul className="mt-4 space-y-2">
              <li><Link to="/" className="text-sm hover:text-blue-400 transition-colors">Home</Link></li>
              <li><Link to="/kegiatan" className="text-sm hover:text-blue-400 transition-colors">Kegiatan</Link></li>
              <li><Link to="/about" className="text-sm hover:text-blue-400 transition-colors">Tentang Kami</Link></li>
            </ul>
          </div>
          
          {/* Kolom 3: Media Sosial */}
          <div>
            <h3 className="text-md font-semibold text-white tracking-wider uppercase">Ikuti Kami</h3>
            <div className="flex mt-4 space-x-4">
              <a href="https://instagram.com/akun_kkn" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors" title="Instagram">
                <InstagramIcon />
              </a>
              <a href="https://tiktok.com/@akun_kkn" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors" title="TikTok">
                <TikTokIcon />
              </a>
              <a href="https://youtube.com/channel/akun_kkn" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors" title="YouTube">
                <YouTubeIcon />
              </a>
            </div>
          </div>

        </div>
        
        {/* Bagian Copyright di Bawah */}
        <div className="mt-12 border-t border-slate-700 pt-8 text-center">
          <p className="text-sm text-slate-400">&copy; {currentYear} Tim KKN-T Desa Belor. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}