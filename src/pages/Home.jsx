import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import { motion, useAnimation, animate } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

// --- Komponen-komponen Kecil (Helper Components) ---

const UsersIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.653-.122-1.28-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.653.122-1.28.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>;
const ClipboardListIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg>;
const CalendarIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>;

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
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.5 });

  useEffect(() => {
    if (inView) {
      const controlsCounter = animate(0, endValue, {
        duration: 2,
        onUpdate: (value) => setCount(Math.round(value)),
      });
      return () => controlsCounter.stop();
    }
  }, [inView, endValue]);

  return (
    <div ref={ref} className="bg-white p-6 rounded-xl shadow-lg text-center">
      <div className="text-blue-500 mx-auto w-fit mb-3">{icon}</div>
      <p className="text-4xl font-bold text-slate-800">{count}</p>
      <p className="text-slate-500 mt-1">{label}</p>
    </div>
  );
};

const HeroSection = () => (
  <div className="relative bg-gradient-to-br from-sky-50 via-blue-100 to-indigo-200 pt-16 pb-20">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className="text-center md:text-left">
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl md:text-6xl">
            <span className="block">KKN-T Literasi</span>
            <span className="block text-blue-600 mt-2">Desa Belor</span>
          </h1>
          <p className="mt-6 text-lg text-slate-600">
            Selamat datang di pusat informasi digital kegiatan KKN. Temukan jadwal, rekapitulasi, dan dokumentasi program kerja yang kami laksanakan untuk desa.
          </p>
          <div className="mt-8">
            <a
              href="#kegiatan"
              className="inline-block bg-blue-600 text-white font-bold py-3 px-8 rounded-lg shadow-lg hover:bg-blue-700 transform hover:-translate-y-1 transition-all duration-300"
            >
              Lihat Semua Kegiatan
            </a>
          </div>
        </div>
        <div className="hidden md:block">
          <img 
            src="/foto.png" 
            alt="Ilustrasi KKN"
            className="w-4/5 mx-auto h-auto"
           />
        </div>
      </div>
    </div>
  </div>
);

const ActivityCard = ({ item }) => (
  <div
    className={`
      bg-white rounded-xl shadow-lg overflow-hidden 
      transition-transform duration-300 ease-in-out hover:scale-[1.02]
      border-t-4 ${item.status === 'Selesai' ? 'border-green-500' : 'border-blue-500'}
    `}
  >
    <div className="p-6">
      <div className="flex justify-between items-start mb-3">
        <h3 className="font-bold text-xl text-slate-900 pr-4">{item.nama_kegiatan}</h3>
        <span
          className={`
            text-xs font-semibold px-3 py-1 rounded-full flex-shrink-0
            ${item.status === 'Selesai' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}
          `}
        >
          {item.status}
        </span>
      </div>
      <p className="text-slate-600 text-sm mb-5">{item.deskripsi}</p>
    </div>
    <div className="bg-slate-50 px-6 py-4 border-t border-slate-200">
      <div className="space-y-2 text-sm text-slate-700">
        <p><strong>Tanggal:</strong> {new Date(item.tanggal).toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' })}</p>
        <p><strong>Lokasi:</strong> {item.lokasi}</p>
        <p><strong>PIC:</strong> {item.pic}</p>
      </div>
    </div>
  </div>
);

const LoadingSpinner = () => (
  <div className="text-center py-10">
    <div className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin mx-auto"></div>
    <p className="mt-4 text-slate-500">Memuat kegiatan...</p>
  </div>
);

const EmptyState = () => (
  <div className="text-center py-10">
    <p className="text-slate-500">Belum ada kegiatan yang ditambahkan.</p>
  </div>
);

const ActivityList = ({ kegiatan, loading, error }) => {
  if (loading) return <LoadingSpinner />;
  if (error) return <p className="text-center text-red-500">Terjadi kesalahan: {error.message}</p>;
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {kegiatan.length > 0 ? (
        kegiatan.map((item) => <ActivityCard key={item.id} item={item} />)
      ) : (
        <div className="md:col-span-2 lg:col-span-3">
          <EmptyState />
        </div>
      )}
    </div>
  );
};

// --- KOMPONEN BARU UNTUK LOKASI & PETA ---
const LocationMapSection = () => (
  <AnimatedSection className="py-20">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-slate-800">Lokasi Pengabdian </h2>
        <p className="mt-2 text-gray-600">
          Desa Belor, Kecamatan Ngaringan, Kabupaten Grobogan, Jawa Tengah
        </p>
      </div>
      <div className="mt-12 max-w-5xl mx-auto">
        <div className="aspect-w-16 aspect-h-9 rounded-xl overflow-hidden shadow-2xl border-4 border-white">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15844.73377726488!2d111.1396264282305!3d-7.16200257049884!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e77e23363346e99%3A0x9599b248a3faf96!2sBelor%2C%20Kec.%20Ngaringan%2C%20Kabupaten%20Grobogan%2C%20Jawa%20Tengah!5e0!3m2!1sid!2sid!4v1720803837424!5m2!1sid!2sid"
            className="w-full h-96 md:h-[500px]" // Ukuran peta dibuat lebih besar
            style={{ border: 0 }} 
            allowFullScreen="" 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade">
          </iframe>
        </div>
      </div>
    </div>
  </AnimatedSection>
);

// --- Komponen Utama Halaman Home ---
export default function Home() {
  const [kegiatan, setKegiatan] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getKegiatan() {
      setLoading(true);
      setError(null);

      const { data, error: fetchError } = await supabase
        .from('kegiatan')
        .select('*')
        .order('tanggal', { ascending: true });

      if (fetchError) {
        console.error('Error fetching kegiatan:', fetchError);
        setError(fetchError);
      } else {
        setKegiatan(data);
      }
      setLoading(false);
    }

    getKegiatan();
  }, []);

  return (
    <div className="bg-slate-50 min-h-screen">
      <main>
        <HeroSection />

        <AnimatedSection className="py-20 bg-white">
            <div className="max-w-5xl mx-auto px-4">
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-slate-800">Sekilas Program</h2>
                    <p className="mt-2 text-slate-600 max-w-xl mx-auto">Kami berfokus pada dua pilar utama: literasi dan revitalisasi perpustakaan desa untuk menciptakan dampak yang berkelanjutan.</p>
                </div>
                <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
                    <StatCard icon={<UsersIcon />} endValue={9} label="Mahasiswa" />
                    <StatCard icon={<ClipboardListIcon />} endValue={11} label="Program Kerja" />
                    <StatCard icon={<CalendarIcon />} endValue={45} label="Hari Pengabdian" />
                </div>
            </div>
        </AnimatedSection>
        
        <div id="kegiatan" className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-slate-800">Daftar Kegiatan</h2>
              <p className="mt-2 text-gray-600">
                Berikut adalah rekapitulasi dan jadwal kegiatan yang telah dan akan dilaksanakan.
              </p>
            </div>
            <ActivityList kegiatan={kegiatan} loading={loading} error={error} />
          </div>
        </div>

        {/* LOKASI & PETA DITARUH DI PALING BAWAH */}
        <LocationMapSection />

      </main>
    </div>
  );
}