import { useState } from 'react';

export default function ItemKebiasaan({ data, onHapus, onToggle, onEdit, onSimpanCatatan }) {
  const [isEditing, setIsEditing] = useState(false);
  const [teksEdit, setTeksEdit] = useState(data.nama);
  const [catatan, setCatatan] = useState(data.catatan || '');

  const tanganiSimpan = () => {
    if (!teksEdit.trim()) return;
    onEdit(data.id, teksEdit.trim());
    setIsEditing(false);
  };

  return (
    <li className="habit-item-container">
      {isEditing ? (
        <div className="edit-mode">
          <input type="text" value={teksEdit} onChange={(e) => setTeksEdit(e.target.value)} autoFocus />
          <button type="button" onClick={tanganiSimpan}>Simpan</button>
        </div>
      ) : (
        <div className="view-mode">
          <div className="main-row">
            <input type="checkbox" checked={data.selesai} onChange={() => onToggle(data.id)} />
            <span className={data.selesai ? 'item-completed item-text' : 'item-text'}>{data.nama}</span>
            <div className="item-actions">
              <button type="button" onClick={() => setIsEditing(true)}>Edit</button>
              <button type="button" className="btn-outline-danger" onClick={() => onHapus(data.id)}>Hapus</button>
            </div>
          </div>
          <textarea
            className="journal-input"
            placeholder="Catatan..."
            value={catatan}
            onChange={(e) => setCatatan(e.target.value)}
            onBlur={() => onSimpanCatatan(data.id, catatan)}
          />
        </div>
      )}
    </li>
  );
}