import ItemKebiasaan from './ItemKebiasaan';

export default function DaftarKebiasaan({ daftar, onHapus, onToggle, onEdit }) {
  if (daftar.length === 0) {
    return <p className="empty-state">Data kosong. Tambahkan kebiasaan baru!</p>;
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
        />
      ))}
    </ul>
  );
}