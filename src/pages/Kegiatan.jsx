import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

// --- Ikon SVG sebagai Komponen (lebih baik dari tag <img> atau font) ---
const CheckCircleIcon = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const TrashIcon = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
  </svg>
);


// --- Komponen-komponen Kecil ---

// 1. Komponen Form untuk menambah kegiatan
function KegiatanForm({ onAddKegiatan, onError }) {
  const [form, setForm] = useState({ nama_kegiatan: '', tanggal: '', lokasi: '', pic: '', deskripsi: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setForm(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.nama_kegiatan.trim() === '' || form.tanggal.trim() === '') return;

    setIsSubmitting(true);
    onError(null); // Bersihkan error sebelumnya

    const { data, error } = await supabase
      .from('kegiatan')
      .insert({ ...form, status: 'Direncanakan', link_dokumentasi: '' })
      .select() // Minta Supabase mengembalikan data yang baru dibuat
      .single(); // Karena kita hanya insert satu

    if (error) {
      onError(error.message);
    } else if (data) {
      onAddKegiatan(data); // Kirim data baru ke parent component
      setForm({ nama_kegiatan: '', tanggal: '', lokasi: '', pic: '', deskripsi: '' }); // Reset form
    }
    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 border rounded-xl bg-white shadow-lg space-y-4">
      <h2 className="text-2xl font-bold text-slate-800">Tambah Kegiatan Baru</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="md:col-span-2">
          <label htmlFor="nama_kegiatan" className="block text-sm font-medium text-slate-600">Nama Kegiatan</label>
          <input id="nama_kegiatan" type="text" value={form.nama_kegiatan} onChange={handleChange} required className="w-full mt-1 px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"/>
        </div>
        <div>
          <label htmlFor="tanggal" className="block text-sm font-medium text-slate-600">Tanggal</label>
          <input id="tanggal" type="date" value={form.tanggal} onChange={handleChange} required className="w-full mt-1 px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"/>
        </div>
        <div>
          <label htmlFor="lokasi" className="block text-sm font-medium text-slate-600">Lokasi</label>
          <input id="lokasi" type="text" value={form.lokasi} onChange={handleChange} required className="w-full mt-1 px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"/>
        </div>
        <div className="md:col-span-2">
          <label htmlFor="pic" className="block text-sm font-medium text-slate-600">PIC (Penanggung Jawab)</label>
          <input id="pic" type="text" value={form.pic} onChange={handleChange} required className="w-full mt-1 px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"/>
        </div>
        <div className="md:col-span-2">
          <label htmlFor="deskripsi" className="block text-sm font-medium text-slate-600">Deskripsi</label>
          <textarea id="deskripsi" value={form.deskripsi} onChange={handleChange} rows="3" className="w-full mt-1 px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"></textarea>
        </div>
      </div>
      <div className="text-right">
        <button type="submit" disabled={isSubmitting} className="px-6 py-2 font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:bg-slate-400 disabled:cursor-wait transition-colors">
          {isSubmitting ? 'Menyimpan...' : 'Simpan Kegiatan'}
        </button>
      </div>
    </form>
  );
}

// 2. Komponen untuk satu item kegiatan
function KegiatanItem({ item, onToggleStatus, onDelete }) {
  const isSelesai = item.status === 'Selesai';
  return (
    <div className="flex items-center justify-between p-4 bg-white rounded-xl shadow-md border-l-4 transition-all"
         style={{ borderColor: isSelesai ? '#22C55E' : '#3B82F6' }}>
      <div className="flex-1 min-w-0">
        <p className={`font-semibold truncate ${isSelesai ? 'line-through text-slate-500' : 'text-slate-800'}`}>
          {item.nama_kegiatan}
        </p>
        <p className="text-xs text-slate-500 mt-1">
          {new Date(item.tanggal).toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long' })} | {item.lokasi}
        </p>
      </div>
      <div className="flex items-center gap-3 ml-4">
        <button onClick={onToggleStatus} title={isSelesai ? 'Tandai Belum Selesai' : 'Tandai Selesai'}>
          <CheckCircleIcon className={`w-7 h-7 cursor-pointer ${isSelesai ? 'text-green-500 hover:text-green-600' : 'text-slate-300 hover:text-green-500'}`} />
        </button>
        <button onClick={onDelete} title="Hapus Kegiatan">
          <TrashIcon className="w-6 h-6 text-slate-400 hover:text-red-600 cursor-pointer" />
        </button>
      </div>
    </div>
  );
}

// --- Komponen Utama Halaman Kegiatan ---
export default function Kegiatan() {
  const [kegiatan, setKegiatan] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchKegiatan() {
      setLoading(true);
      const { data, error: fetchError } = await supabase
        .from('kegiatan')
        .select('*')
        .order('tanggal', { ascending: false });
      
      if (fetchError) {
        setError(fetchError.message);
        console.error('Error fetching kegiatan:', fetchError);
      } else {
        setKegiatan(data);
      }
      setLoading(false);
    }
    fetchKegiatan();
  }, []);

  const handleAddKegiatan = (newItem) => {
    setKegiatan(prev => [newItem, ...prev]);
  };

  const handleDeleteKegiatan = async (id) => {
    if (window.confirm("Yakin ingin menghapus kegiatan ini? Aksi ini tidak dapat dibatalkan.")) {
      setError(null);
      const { error: deleteError } = await supabase.from('kegiatan').delete().eq('id', id);
      if (deleteError) {
        setError(deleteError.message);
      } else {
        setKegiatan(prev => prev.filter(item => item.id !== id));
      }
    }
  };

  const handleToggleStatus = async (id, currentStatus) => {
    setError(null);
    const newStatus = currentStatus === 'Selesai' ? 'Direncanakan' : 'Selesai';
    const { error: updateError } = await supabase.from('kegiatan').update({ status: newStatus }).eq('id', id);

    if (updateError) {
      setError(updateError.message);
    } else {
      setKegiatan(prev => prev.map(item => item.id === id ? { ...item, status: newStatus } : item));
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <header className="mb-8">
        <h1 className="text-4xl font-extrabold text-slate-800">Manajemen Kegiatan</h1>
        <p className="mt-2 text-lg text-slate-600">Tambah, hapus, dan kelola semua program kerja Anda di sini.</p>
      </header>
      
      <KegiatanForm onAddKegiatan={handleAddKegiatan} onError={setError} />

      {error && <div className="mt-4 p-4 bg-red-100 text-red-800 rounded-lg">{error}</div>}

      <div className="mt-10">
        <h2 className="text-2xl font-bold text-slate-800 mb-4">Daftar Kegiatan</h2>
        {loading ? (
          <p className="text-center text-slate-500">Memuat data...</p>
        ) : (
          <div className="space-y-4">
            {kegiatan.length > 0 ? (
              kegiatan.map(item => (
                <KegiatanItem
                  key={item.id}
                  item={item}
                  onToggleStatus={() => handleToggleStatus(item.id, item.status)}
                  onDelete={() => handleDeleteKegiatan(item.id)}
                />
              ))
            ) : (
              <p className="text-center text-slate-500 py-8">Belum ada kegiatan. Silakan tambahkan melalui form di atas.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}