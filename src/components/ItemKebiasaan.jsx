import { useState } from 'react';

export default function ItemKebiasaan({ data, onHapus, onToggle, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [teksEdit, setTeksEdit] = useState(data.nama);

  const tanganiSimpan = () => {
    if (!teksEdit.trim()) return;
    onEdit(data.id, teksEdit.trim());
    setIsEditing(false);
  };

  const tanganiBatal = () => {
    setTeksEdit(data.nama);
    setIsEditing(false);
  };

  return (
    <li>
      {isEditing ? (
        <>
          <input 
            type="text" 
            value={teksEdit} 
            onChange={(e) => setTeksEdit(e.target.value)} 
            autoFocus
          />
          <div className="item-actions">
            <button type="button" onClick={tanganiSimpan} className="btn-primary">Simpan</button>
            <button type="button" onClick={tanganiBatal} className="btn-danger">Batal</button>
          </div>
        </>
      ) : (
        <>
          <input 
            type="checkbox" 
            checked={data.selesai} 
            onChange={() => onToggle(data.id)} 
          />
          
          <span className={`item-text ${data.selesai ? 'item-completed' : ''}`}>
            {data.nama}
          </span>
          
          <div className="item-actions">
            <button type="button" onClick={() => setIsEditing(true)} className="btn-secondary">Edit</button>
            <button type="button" onClick={() => onHapus(data.id)} className="btn-outline-danger">Hapus</button>
          </div>
        </>
      )}
    </li>
  );
}