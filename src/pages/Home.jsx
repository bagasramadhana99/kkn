import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

// --- Komponen-komponen Kecil (Biasanya dipisah ke file sendiri) ---

// Komponen untuk Hero Section
const HeroSection = () => (
  <div className="relative bg-gradient-to-br from-sky-50 via-blue-100 to-indigo-200 pt-16 pb-20">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        {/* Konten Teks */}
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
        {/* Ilustrasi/Gambar */}
        <div className="hidden md:block">
          {/* Anda bisa ganti dengan <img> seperti contoh sebelumnya */}
          <img 
            src="/foto.png" // Ganti dengan path gambar Anda di folder /public
            alt="Ilustrasi KKN"
            className="w-4/5 mx-auto h-auto"
           />
        </div>
      </div>
    </div>
  </div>
);

// Komponen untuk setiap kartu kegiatan
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

// Komponen untuk indikator loading
const LoadingSpinner = () => (
  <div className="text-center py-10">
    <div className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin mx-auto"></div>
    <p className="mt-4 text-slate-500">Memuat kegiatan...</p>
  </div>
);

// Komponen jika tidak ada data kegiatan
const EmptyState = () => (
  <div className="text-center py-10">
    <p className="text-slate-500">Belum ada kegiatan yang ditambahkan.</p>
  </div>
);

// Komponen untuk menampilkan list kegiatan
const ActivityList = ({ kegiatan, loading, error }) => {
  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <p className="text-center text-red-500">Terjadi kesalahan: {error.message}</p>;
  }

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
        
        <div id="kegiatan" className="py-16">
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
      </main>
    </div>
  );
}