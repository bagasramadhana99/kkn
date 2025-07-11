export default function Profil() {
    const anggota = [
        { nama: 'Budi Santoso', prodi: 'Teknik Informatika' },
        { nama: 'Siti Aminah', prodi: 'Ilmu Komunikasi' },
        { nama: 'Ahmad Dahlan', prodi: 'Agroteknologi' },
        { nama: 'Dewi Lestari', prodi: 'Kesehatan Masyarakat' },
    ];

    return (
        <div className="p-4 bg-white rounded-lg shadow">
            <h1 className="text-3xl font-bold mb-4">Profil Anggota Kelompok</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {anggota.map((item, index) => (
                    <div key={index} className="p-4 border rounded-md">
                        <p className="font-semibold text-lg">{item.nama}</p>
                        <p className="text-gray-500">{item.prodi}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}