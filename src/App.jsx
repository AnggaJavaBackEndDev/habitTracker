import { useState, useEffect } from 'react';
import DaftarKebiasaan from './components/DaftarKebiasaan';

function App() {
  const [daftarKebiasaan, setDaftarKebiasaan] = useState(() => {
    const dataLokal = localStorage.getItem('habit-tracker-data');
    return dataLokal ? JSON.parse(dataLokal) : [];
  });
  const [inputKebiasaan, setInputKebiasaan] = useState('');

  const totalKebiasaan = daftarKebiasaan.length;
  const totalSelesai = daftarKebiasaan.filter((item) => item.selesai).length;
  const persentaseSelesai = totalKebiasaan > 0 ? Math.round((totalSelesai / totalKebiasaan) * 100) : 0;

  useEffect(() => {
    localStorage.setItem('habit-tracker-data', JSON.stringify(daftarKebiasaan));
  }, [daftarKebiasaan]);

  const tambahKeAtas = () => {
    if (!inputKebiasaan.trim()) return;
    setDaftarKebiasaan([{ id: crypto.randomUUID(), nama: inputKebiasaan.trim(), selesai: false }, ...daftarKebiasaan]);
    setInputKebiasaan('');
  };

  const tambahKeBawah = () => {
    if (!inputKebiasaan.trim()) return;
    setDaftarKebiasaan([...daftarKebiasaan, { id: crypto.randomUUID(), nama: inputKebiasaan.trim(), selesai: false }]);
    setInputKebiasaan('');
  };

  const hapusKebiasaan = (id) => setDaftarKebiasaan(daftarKebiasaan.filter((item) => item.id !== id));

  const toggleSelesai = (id) => {
    const index = daftarKebiasaan.findIndex((item) => item.id === id);
    if (index >= 0) {
      const arrayBaru = [...daftarKebiasaan];
      arrayBaru[index] = { ...arrayBaru[index], selesai: !arrayBaru[index].selesai };
      setDaftarKebiasaan(arrayBaru);
    }
  };

  const editKebiasaan = (id, namaBaru) => {
    const index = daftarKebiasaan.findIndex((item) => item.id === id);
    if (index >= 0) {
      const arrayBaru = [...daftarKebiasaan];
      arrayBaru[index] = { ...arrayBaru[index], nama: namaBaru };
      setDaftarKebiasaan(arrayBaru);
    }
  };

  const resetSemua = () => setDaftarKebiasaan(daftarKebiasaan.map((item) => ({ ...item, selesai: false })));
  const kosongkanDaftar = () => setDaftarKebiasaan([]);

  return (
    <div className="container">
      <h1>Habit Tracker</h1>

      <div className="stats-card">
        <h3>Statistik</h3>
        <p>Total Kebiasaan: {totalKebiasaan}</p>
        <p>Total Selesai: {totalSelesai}</p>
        <p style={{ fontWeight: 'bold' }}>Progres: {persentaseSelesai}%</p>
        <div className="progress-container">
          <div className="progress-fill" style={{ width: `${persentaseSelesai}%` }} />
        </div>
      </div>

      <div className="action-buttons">
        <button type="button" onClick={resetSemua} className="btn-warning">Reset Status</button>
        <button type="button" onClick={kosongkanDaftar} className="btn-outline-danger">Hapus Semua</button>
      </div>

      <form onSubmit={(e) => e.preventDefault()} className="form-group">
        <input
          type="text"
          placeholder="Tulis kebiasaan..."
          value={inputKebiasaan}
          onChange={(e) => setInputKebiasaan(e.target.value)}
        />
        <button type="button" onClick={tambahKeAtas} className="btn-secondary">Ke Atas</button>
        <button type="button" onClick={tambahKeBawah} className="btn-primary">Ke Bawah</button>
      </form>

      <DaftarKebiasaan 
        daftar={daftarKebiasaan} 
        onHapus={hapusKebiasaan} 
        onToggle={toggleSelesai} 
        onEdit={editKebiasaan}
      />
    </div>
  );
}

export default App;