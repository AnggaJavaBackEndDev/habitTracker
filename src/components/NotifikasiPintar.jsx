import { useEffect, useState } from 'react';

export default function NotifikasiPintar({ daftar }) {
  const [pengingat, setPengingat] = useState(null);

  useEffect(() => {
    const jamSekarang = new Date().getHours();
    
    if (!daftar || daftar.length === 0) {
      setPengingat(null);
      return;
    }

    const kandidat = daftar.find(item => {
      if (item.selesai || !item.riwayatSelesai || item.riwayatSelesai.length === 0) return false;
      
      const totalJam = item.riwayatSelesai.reduce((a, b) => a + new Date(b).getHours(), 0);
      const jamRataRata = Math.round(totalJam / item.riwayatSelesai.length);
      
      return jamSekarang >= jamRataRata;
    });

    setPengingat(kandidat || null);
  }, [daftar]);

  if (!pengingat) return null;

  return (
    <div className="smart-notification">
      <p>💡 Waktunya <strong>{pengingat.nama}</strong>! Ayo mulai sekarang!</p>
    </div>
  );
}