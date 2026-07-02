import { useState, useEffect } from 'react';
import DaftarKebiasaan from './components/DaftarKebiasaan';
import NotifikasiPintar from './components/NotifikasiPintar';

function App() {
  const [daftarKebiasaan, setDaftarKebiasaan] = useState(() => {
    const dataLokal = localStorage.getItem('habit-tracker-data');
    return dataLokal ? JSON.parse(dataLokal) : [];
  });

  const [inputKebiasaan, setInputKebiasaan] = useState('');
  const [activeDay, setActiveDay] = useState('Senin'); 
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [bgImage, setBgImage] = useState(() => localStorage.getItem('bg-image') || null);

  const daftarHari = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'];

  const kebiasaanHariAktif = daftarKebiasaan.filter(item => item.hari === activeDay);

  const totalKebiasaan = kebiasaanHariAktif.length;
  const totalSelesai = kebiasaanHariAktif.filter((item) => item.selesai).length;
  const persentaseSelesai = totalKebiasaan > 0 ? Math.round((totalSelesai / totalKebiasaan) * 100) : 0;

  useEffect(() => {
    localStorage.setItem('habit-tracker-data', JSON.stringify(daftarKebiasaan));
  }, [daftarKebiasaan]);

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [isDarkMode]);

  const handleBgUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const dataUrl = reader.result;
        setBgImage(dataUrl);
        localStorage.setItem('bg-image', dataUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  const tambahKebiasaan = (posisi) => {
    if (!inputKebiasaan.trim()) return;
    const itemBaru = { 
      id: crypto.randomUUID(), 
      nama: inputKebiasaan.trim(), 
      hari: activeDay, 
      selesai: false, 
      riwayatSelesai: [] 
    };
    
    setDaftarKebiasaan(posisi === 'atas' ? [itemBaru, ...daftarKebiasaan] : [...daftarKebiasaan, itemBaru]);
    setInputKebiasaan('');
  };

  const hapusSemua = () => {
    if (window.confirm("Apakah Anda yakin ingin menghapus SEMUA kebiasaan di hari " + activeDay + "?")) {
    setDaftarKebiasaan(daftarKebiasaan.filter(item => item.hari !== activeDay));
  }
  };

  const toggleSelesai = (id) => {
    setDaftarKebiasaan(prev => prev.map(item => {
      if (item.id === id) {
        const baruSelesai = !item.selesai;
        const riwayatBaru = baruSelesai 
          ? [...(item.riwayatSelesai || []), Date.now()].slice(-3) 
          : item.riwayatSelesai;
          
        return { ...item, selesai: baruSelesai, riwayatSelesai: riwayatBaru };
      }
      return item;
    }));
  };

  const simpanCatatan = (id, catatanBaru) => {
    setDaftarKebiasaan(prev => prev.map(item => 
      item.id === id ? { ...item, catatan: catatanBaru } : item
    ));
  };

  const hapusKebiasaan = (id) => setDaftarKebiasaan(daftarKebiasaan.filter(item => item.id !== id));

  const editKebiasaan = (id, namaBaru) => {
    setDaftarKebiasaan(prev => prev.map(item => item.id === id ? { ...item, nama: namaBaru } : item));
  };

  const resetHariIni = () => {
    setDaftarKebiasaan(daftarKebiasaan.map(item => 
      item.hari === activeDay ? { ...item, selesai: false } : item
    ));
  };

  return (
    <>
    {bgImage && (
      <>
        <div className="bg-blur-layer" style={{ backgroundImage: `url(${bgImage})` }} />
        <div className="bg-main-layer" style={{ backgroundImage: `url(${bgImage})` }} />
      </>
    )}

    <div className={`container ${isDarkMode ? 'dark-mode' : ''}`}>
    <h1>Habit Tracker</h1>
    
    <button 
    className="dark-mode-toggle" 
    onClick={() => setIsDarkMode(!isDarkMode)}
    >
      {isDarkMode ? '🌙 Mode Gelap' : '☀️ Mode Terang'}
    </button>

    <div className="upload-section">
  <label htmlFor="bg-upload" className="btn-secondary" style={{ padding: '8px 16px', borderRadius: '6px', cursor: 'pointer' }}>
    {bgImage ? 'Ganti Background' : 'Pilih Background'}
  </label>
  <input 
    id="bg-upload" 
    type="file" 
    accept="image/*" 
    onChange={handleBgUpload} 
    style={{ display: 'none' }} 
  />
  
  {bgImage && (
    <button type="button" onClick={() => { setBgImage(null); localStorage.removeItem('bg-image'); }} className="btn-outline-danger">
      Hapus
    </button>
  )}
</div>

      <div className="day-nav">
        {daftarHari.map(h => (
          <button 
            key={h} 
            className={activeDay === h ? 'active' : ''} 
            onClick={() => setActiveDay(h)}
          >
            {h}
          </button>
        ))}
      </div>

      <div className="stats-card">
        <h3>Kebiasaan: {activeDay}</h3>
        
        <p>Progres: {totalSelesai} / {totalKebiasaan} Selesai ({persentaseSelesai}%)</p>
        <div className="progress-container">
          <div className="progress-fill" style={{ width: `${persentaseSelesai}%` }}></div>
        </div>

        <div style={{ marginTop: '15px', display: 'flex', gap: '10px' }}>
          <button type="button" onClick={resetHariIni} className="btn-warning">
            Reset {activeDay}
          </button>
           <button type="button" onClick={hapusSemua} className="btn-outline-danger">
            Hapus Semua
          </button>
        </div>
      </div>

      

      <form onSubmit={(e) => e.preventDefault()} className="form-group">
        <input 
          type="text"
          value={inputKebiasaan} 
          onChange={(e) => setInputKebiasaan(e.target.value)} 
          placeholder={`Habit untuk ${activeDay}...`}
        />
        <button type="button" onClick={() => tambahKebiasaan('atas')} className="btn-secondary">Tambah Atas</button>
        <button type="button" onClick={() => tambahKebiasaan('bawah')} className="btn-primary">Tambah Bawah</button>
      </form>

      <NotifikasiPintar daftar={kebiasaanHariAktif} />

      <DaftarKebiasaan 
        daftar={kebiasaanHariAktif} 
        onHapus={hapusKebiasaan} 
        onToggle={toggleSelesai} 
        onEdit={editKebiasaan}
        onSimpanCatatan={simpanCatatan}
      />
    </div>
    </>
  );
}

export default App;