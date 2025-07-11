import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

export default function Layout() {
  return (
    <div>
      <Navbar />
      <main>
        {/* Perubahan ada di baris di bawah ini */}
        <div className="py-6 sm:px-6 lg:px-8">
          <Outlet /> {/* Konten halaman akan ditampilkan di sini */}
        </div>
      </main>
    </div>
  );
}