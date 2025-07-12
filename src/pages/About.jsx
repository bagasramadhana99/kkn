import { useEffect, useState } from 'react';
import { motion, useAnimation, animate } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

// --- Komponen Ikon ---
const UsersIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.653-.122-1.28-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.653.122-1.28.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>;
const ClipboardListIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg>;
const CalendarIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>;
const EyeIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>;
const CheckBadgeIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" /></svg>;
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

// --- Komponen-komponen Interaktif ---

const AnimatedSection = ({ children, className }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  return (
    <motion.div
      ref={ref}
      animate={controls}
      initial="hidden"
      variants={{
        visible: { opacity: 1, y: 0 },
        hidden: { opacity: 0, y: 50 },
      }}
      transition={{ duration: 0.6 }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const StatCard = ({ icon, endValue, label }) => {
  const [count, setCount] = useState(0);
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.5 });

  useEffect(() => {
    if (inView) {
      controls.start({
        y: 0,
        opacity: 1,
        transition: { duration: 0.5 }
      });
      const controlsCounter = animate(0, endValue, {
        duration: 2,
        onUpdate: (value) => setCount(Math.round(value)),
      });
      return () => controlsCounter.stop();
    }
  }, [inView, endValue, controls]);

  return (
    <motion.div ref={ref} initial={{ y: 20, opacity: 0 }} animate={controls} className="bg-white p-6 rounded-xl shadow-lg text-center">
      <div className="text-blue-500 mx-auto w-fit mb-3">{icon}</div>
      <p className="text-4xl font-bold text-slate-800">{count}</p>
      <p className="text-slate-500 mt-1">{label}</p>
    </motion.div>
  );
};

const ProfileCard = ({ nama, prodi, foto, socials }) => (
    <div className="bg-white rounded-2xl shadow-md text-center overflow-hidden group transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
        <div className="h-40 bg-gradient-to-br from-cyan-400 to-blue-600 relative">
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


export default function About() {
  const dpl = { 
    nama: 'Adnan Fauzi, S.Kom., M.T.', 
    prodi: 'Dosen Pembimbing Lapangan', 
    foto: '/images/profil/dpl.png',
    socials: {
        linkedin: 'https://www.linkedin.com/in/adnanfauzi/', // Ganti dengan link asli
    }
  };
  
  const jumlahMahasiswa = 9; // Jumlah mahasiswa tetap 9 untuk statistik

  return (
    <div className="bg-slate-50 overflow-x-hidden">
      {/* SEKSI 1: HERO */}
      <div className="text-center py-20 px-4 bg-gradient-to-b from-blue-50 to-slate-50">
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-4xl sm:text-6xl font-extrabold text-slate-800"
        >
          Tentang Kami
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto"
        >
          Mengenal lebih dekat tim, tujuan, dan semangat di balik program KKN "Penguatan Literasi di Era Transformasi Digital".
        </motion.p>
      </div>

      <div className="max-w-5xl mx-auto px-4 space-y-24 py-16">
        
        {/* SEKSI 2: PROGRAM & STATISTIK */}
        <AnimatedSection>
            <div className="text-center">
                <h2 className="text-3xl font-bold text-slate-800">Sekilas Program</h2>
                <p className="mt-2 text-slate-600 max-w-xl mx-auto">Kami berfokus pada dua pilar utama: literasi dan revitalisasi perpustakaan desa untuk menciptakan dampak yang berkelanjutan.</p>
            </div>
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
                <StatCard icon={<UsersIcon />} endValue={jumlahMahasiswa} label="Mahasiswa" />
                <StatCard icon={<ClipboardListIcon />} endValue={11} label="Program Kerja" />
                <StatCard icon={<CalendarIcon />} endValue={45} label="Hari Pengabdian" />
            </div>
        </AnimatedSection>

        {/* SEKSI 3: LOKASI */}
        <AnimatedSection>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-slate-800">Lokasi Pengabdian Kami</h2>
              <p className="mt-4 text-slate-600">
                Kami merasa terhormat dapat mengabdi di <strong>Desa Belor, Kecamatan Ngaringan, Kabupaten Grobogan</strong>. Sebuah desa dengan keramahan warga dan potensi luar biasa yang memotivasi kami untuk berkontribusi.
              </p>
            </div>
            <div className="aspect-w-16 aspect-h-9 rounded-xl overflow-hidden shadow-2xl border-4 border-white">
                <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15844.73377726488!2d111.1396264282305!3d-7.16200257049884!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e77e23363346e99%3A0x9599b248a3faf96!2sBelor%2C%20Kec.%20Ngaringan%2C%20Kabupaten%20Grobogan%2C%20Jawa%20Tengah!5e0!3m2!1sid!2sid!4v1720803837424!5m2!1sid!2sid"
                    width="100%" height="100%" style={{ border: 0 }}
                    allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade">
                </iframe>
            </div>
          </div>
        </AnimatedSection>

        {/* SEKSI 4: TIM KAMI (HANYA DPL) */}
        <AnimatedSection>
            <div className="text-center">
                <h2 className="text-3xl font-bold text-slate-800">Tim Solid Kami</h2>
                <p className="mt-2 text-slate-600 max-w-xl mx-auto">Seluruh kegiatan kami dibimbing oleh dosen yang berdedikasi untuk memastikan keberhasilan program.</p>
            </div>
            <div className="mt-12">
                <div className="max-w-sm mx-auto">
                    <ProfileCard nama={dpl.nama} prodi={dpl.prodi} foto={dpl.foto} socials={dpl.socials} />
                </div>
            </div>
        </AnimatedSection>
        
        {/* SEKSI 5: VISI & MISI */}
        <AnimatedSection>
            <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white p-8 rounded-xl shadow-lg">
                    <div className="flex items-center gap-4">
                        <div className="bg-blue-100 text-blue-600 p-3 rounded-full"><EyeIcon /></div>
                        <h3 className="text-2xl font-bold text-slate-800">Visi Kami</h3>
                    </div>
                    <p className="mt-4 text-slate-600">Menjadi mitra masyarakat Desa Belor dalam mendorong terciptanya generasi yang cakap digital dan cinta literasi.</p>
                </div>
                <div className="bg-white p-8 rounded-xl shadow-lg">
                    <div className="flex items-center gap-4">
                        <div className="bg-green-100 text-green-600 p-3 rounded-full"><CheckBadgeIcon /></div>
                        <h3 className="text-2xl font-bold text-slate-800">Misi Kami</h3>
                    </div>
                    <ul className="mt-4 space-y-2 text-slate-600 list-disc list-inside">
                        <li>Mengadakan pelatihan literasi digital.</li>
                        <li>Merevitalisasi perpustakaan desa.</li>
                        <li>Membuat program membaca yang kreatif.</li>
                        <li>Menjalin kolaborasi dengan karang taruna.</li>
                    </ul>
                </div>
            </div>
        </AnimatedSection>
      </div>
    </div>
  );
}
