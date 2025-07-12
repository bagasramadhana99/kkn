import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer'; // 1. Impor komponen Footer

export default function Layout() {
  return (
    // 2. Gunakan flexbox untuk memastikan footer menempel di bawah
    <div className="flex flex-col min-h-screen bg-slate-50">
      <Navbar />
      
      {/* 3. Konten utama akan tumbuh mengisi ruang yang tersedia */}
      <main className="flex-grow">
        <Outlet /> {/* Ini adalah tempat halaman (Home, About, dll.) akan dirender */}
      </main>
      
      <Footer /> {/* 4. Tambahkan Footer di bagian paling bawah */}
    </div>
  );
}
