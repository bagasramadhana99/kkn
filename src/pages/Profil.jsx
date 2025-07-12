// --- Komponen Ikon untuk Media Sosial ---
const LinkedInIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
  </svg>
);

const InstagramIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.689-.073-4.948-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4s1.791-4 4-4 4 1.79 4 4-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
);


// Komponen untuk menampilkan kartu profil individual
const ProfileCard = ({ nama, prodi, foto, socials }) => (
  <div className="bg-white rounded-2xl shadow-md text-center overflow-hidden group transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
    <div className="h-40 bg-gradient-to-br from-cyan-400 to-blue-600 relative">
        {/* Hiasan Gelombang */}
        <svg className="absolute bottom-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
            <path fill="#ffffff" fillOpacity="1" d="M0,192L48,176C96,160,192,128,288,133.3C384,139,480,181,576,186.7C672,192,768,160,864,133.3C960,107,1056,85,1152,90.7C1248,96,1344,128,1392,144L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
    </div>
    <div className="p-6 -mt-24 relative">
      <img 
        src={foto || 'http://googleusercontent.com/404_generic.png'}
        alt={`Foto ${nama}`}
        className="w-32 h-32 rounded-full mx-auto mb-4 object-cover border-4 border-white shadow-lg transition-transform duration-300 group-hover:scale-110"
      />
      <h3 className="font-bold text-xl text-slate-800">{nama}</h3>
      <p className="text-slate-500 text-sm">{prodi}</p>
      
      {/* PERUBAHAN DI SINI: Kelas opacity-0 dan group-hover:opacity-100 dihapus */}
      <div className="mt-6 flex justify-center gap-4">
        {socials?.linkedin && (
          <a href={socials.linkedin} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-blue-700">
            <LinkedInIcon />
          </a>
        )}
        {socials?.instagram && (
          <a href={socials.instagram} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-pink-600">
            <InstagramIcon />
          </a>
        )}
      </div>
    </div>
  </div>
);

export default function Profil() {
  // GANTI DENGAN DATA TIM ANDA
  const anggota = [
    { nama: 'Mahasiswa 1', prodi: 'Teknik Informatika', foto: '/images/profil/1.png', socials: { linkedin: '#', instagram: '#' } },
    { nama: 'Mahasiswa 2', prodi: 'Ilmu Komunikasi', foto: '/images/profil/2.png', socials: { linkedin: '#', instagram: '#' } },
    { nama: 'Mahasiswa 3', prodi: 'Agroteknologi', foto: '/images/profil/3.png', socials: { linkedin: '#', instagram: '#' } },
    { nama: 'Mahasiswa 4', prodi: 'Kesehatan Masyarakat', foto: '/images/profil/4.png', socials: { linkedin: '#', instagram: '#' } },
    { nama: 'Mahasiswa 5', prodi: 'Manajemen', foto: '/images/profil/5.png', socials: { linkedin: '#', instagram: '#' } },
    { nama: 'Mahasiswa 6', prodi: 'Pendidikan Guru', foto: '/images/profil/6.png', socials: { linkedin: '#', instagram: '#' } },
    { nama: 'Mahasiswa 7', prodi: 'Teknik Sipil', foto: '/images/profil/7.png', socials: { linkedin: '#', instagram: '#' } },
    { nama: 'Mahasiswa 8', prodi: 'Sastra Inggris', foto: '/images/profil/8.png', socials: { linkedin: '#', instagram: '#' } },
    { nama: 'Mahasiswa 9', prodi: 'Hukum', foto: '/images/profil/9.png', socials: { linkedin: '#', instagram: '#' } },
  ];

  const dpl = { 
    nama: 'Adnan Fauzi, S.Kom., M.T.', 
    prodi: 'Dosen Pembimbing Lapangan', 
    foto: '/images/profil/dpl.png',
    socials: {
        linkedin: 'https://www.linkedin.com/in/adnanfauzi/', // Ganti dengan link asli
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      {/* Header Halaman */}
      <div className="text-center mb-12">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-800">
          Tim KKN Desa Belor
        </h1>
        <p className="mt-4 text-lg text-slate-600">
          Perkenalkan, inilah tim solid di balik semua program kerja kami.
        </p>
      </div>

      {/* Dosen Pembimbing Lapangan */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold text-center text-slate-700 mb-8">Dosen Pembimbing Lapangan</h2>
        <div className="max-w-sm mx-auto">
          <ProfileCard nama={dpl.nama} prodi={dpl.prodi} foto={dpl.foto} socials={dpl.socials} />
        </div>
      </div>

      {/* Anggota Mahasiswa */}
      <div>
        <h2 className="text-2xl font-bold text-center text-slate-700 mb-8">Mahasiswa Pelaksana</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {anggota.map((item, index) => (
            <ProfileCard key={index} nama={item.nama} prodi={item.prodi} foto={item.foto} socials={item.socials} />
          ))}
        </div>
      </div>
    </div>
  );
}