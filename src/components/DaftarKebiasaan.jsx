import ItemKebiasaan from './ItemKebiasaan';

export default function DaftarKebiasaan({ daftar, onHapus, onToggle, onEdit, onSimpanCatatan }) {
  if (daftar.length === 0) {
    return <p className="empty-state">Belum ada habit untuk hari ini. Tambahkan sekarang!</p>;
  }

  return (
    <ul>
      {daftar.map((item) => (
        <ItemKebiasaan 
          key={item.id} 
          data={item} 
          onHapus={onHapus} 
          onToggle={onToggle} 
          onEdit={onEdit} 
          onSimpanCatatan={onSimpanCatatan}
        />
      ))}
    </ul>
  );
}