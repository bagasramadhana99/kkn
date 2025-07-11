import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { supabase } from './lib/supabaseClient';
import Login from './pages/Login';
import Home from './pages/Home';
import Kegiatan from './pages/Kegiatan';
import Profil from './pages/Profil';
import About from './pages/About';
import Layout from './components/Layout';

function App() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
      setLoading(false);
    };

    getSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Tampilkan loading screen sederhana
  }

  // Jika tidak ada sesi (belum login), selalu tampilkan halaman Login
  if (!session) {
    return <Login />;
  }

  // Jika sudah login, tampilkan halaman-halaman utama dengan navbar
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="kegiatan" element={<Kegiatan user={session.user} />} />
        <Route path="profil" element={<Profil />} />
        <Route path="about" element={<About />} />
      </Route>
    </Routes>
  );
}

export default App;