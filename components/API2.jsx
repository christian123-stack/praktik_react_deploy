import { useEffect, useState } from "react";

export default function CuacaBMKG() {
  const [dataCuaca, setDataCuaca] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const ambilDataBMKG = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://api.bmkg.go.id/publik/prakiraan-cuaca?adm4=12.07.20.2004');
        
        if (!response.ok) {
          throw new Error('Gagal terhubung ke server BMKG');
        }
        
        const hasil = await response.json();
        setDataCuaca(hasil);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    ambilDataBMKG();
  }, []);

  if (loading) return <p>Mengambil data dari BMKG...</p>;
  if (error) return <p>Error: {error}</p>;

  // 1. Ambil data spesifik dengan aman menggunakan optional chaining (?)
  // Menyesuaikan struktur JSON BMKG: dataCuaca -> data[0] -> cuaca[0] (cuaca jam pertama)
  const infoLokasi = dataCuaca?.lokasi;
  const cuacaTerkini = dataCuaca?.data?.[0]?.cuaca?.[0];

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h2>Informasi Cuaca BMKG</h2>
      
      {/* 2. Tampilkan data yang diinginkan secara bersih */}
      <div style={{ background: '#f0f0f0', padding: '15px', borderRadius: '8px', maxWidth: '400px' }}>
        <p><strong>Provinsi:</strong> {infoLokasi?.provinsi}</p>
        <p><strong>Kabupaten:</strong> {infoLokasi?.kotkab}</p>
        <p><strong>Kecamatan:</strong> {infoLokasi?.kecamatan}</p>
        <p><strong>Desa:</strong> {infoLokasi?.desa}</p>
        
        <hr style={{ margin: '10px 0' }} />
        
        <p><strong>Kondisi Cuaca:</strong> {cuacaTerkini?.weather_desc || 'Tidak ada data'}</p>
        <p><strong>Suhu:</strong> {cuacaTerkini?.t ? `${cuacaTerkini.t}°C` : '-'}</p>
        <p><strong>Waktu:</strong> {cuacaTerkini?.local_datetime || '-'}</p>
      </div>
    </div>
  );
}