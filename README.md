# Habit Tracker

Aplikasi pelacak kebiasaan berbasis React dengan tampilan per hari, mode gelap, dan latar belakang yang bisa dikustomisasi. Data tersimpan lokal di browser — tidak butuh server atau login.

**[🔗 Coba demo langsung](https://habit-tracker-beige-two.vercel.app)**

![Status](https://img.shields.io/badge/status-aktif-brightgreen)
![React](https://img.shields.io/badge/React-18-blue)
![Deploy](https://img.shields.io/badge/deploy-Vercel-black)

## Demo Langsung

Aplikasi sudah dideploy dan bisa langsung dicoba di **[habit-tracker-beige-two.vercel.app](https://habit-tracker-beige-two.vercel.app)**.

> Tip: tambahkan screenshot di sini agar orang langsung melihat tampilannya tanpa harus membuka tautan.
> Simpan gambar di folder repo (mis. `docs/screenshot.png`), lalu tulis: `![Tampilan aplikasi](docs/screenshot.png)`

## Fitur

- **Kebiasaan per hari** — kelola kebiasaan terpisah untuk tiap hari (Senin–Minggu).
- **Progres harian** — bar dan persentase kebiasaan yang selesai untuk hari yang dipilih.
- **Catatan per kebiasaan** — tambahkan jurnal singkat di tiap item, tersimpan otomatis saat kamu berpindah fokus.
- **Notifikasi pintar** — mengingatkan kebiasaan yang biasanya sudah kamu selesaikan pada jam sekarang, berdasarkan riwayat penyelesaianmu.
- **Mode gelap / terang** — beralih dengan satu tombol.
- **Latar belakang kustom** — unggah gambar sendiri; gambar ditampilkan utuh dengan lapisan blur mengisi sisa ruang.
- **Penyimpanan lokal** — semua data disimpan di `localStorage`, tetap ada setelah browser ditutup.

## Cara Menjalankan Secara Lokal

> Catatan: perintah di bawah mengasumsikan proyek dibangun dengan Vite. Sesuaikan jika kamu memakai tool lain.

```bash
# 1. Klona repositori
git clone https://github.com/USERNAME/habit-tracker.git
cd habit-tracker

# 2. Pasang dependensi
npm install

# 3. Jalankan server pengembangan
npm run dev
```

Buka `http://localhost:5173` di browser.

## Struktur Komponen

```
App.jsx                 State utama, localStorage, dark mode, upload background
├── NotifikasiPintar    Pengingat berdasarkan rata-rata jam penyelesaian
└── DaftarKebiasaan     Membungkus daftar; menampilkan pesan kosong bila belum ada habit
    └── ItemKebiasaan   Satu kartu habit: checkbox, nama, edit, hapus, catatan
```

## Cara Kerja Notifikasi Pintar

Fitur ini menebak kapan sebuah kebiasaan "biasanya" dikerjakan, lalu mengingatkanmu bila waktunya sudah lewat.

1. Setiap kali kebiasaan ditandai selesai, timestamp-nya disimpan (maksimal 3 terakhir).
2. Jam dari tiap timestamp diambil, lalu dirata-rata dan dibulatkan.
3. Jika jam sekarang sudah melewati rata-rata itu **dan** kebiasaan belum selesai hari ini, notifikasi muncul.

Karena berbasis 3 penyelesaian terakhir, pengingat baru akurat setelah beberapa hari penggunaan.

## Detail Teknis

- **State** dikelola di `App.jsx` dan diturunkan ke komponen anak lewat props.
- **Persistensi** memakai `localStorage` — data kebiasaan dan gambar latar disimpan sebagai string.
- **Latar belakang** memakai teknik dua lapisan: satu lapisan `contain` menampilkan gambar utuh, satu lapisan `cover` yang diblur mengisi celah di sisinya, sehingga tidak ada ruang kosong apa pun rasio gambarnya.

## Batasan yang Diketahui

- Semua data tersimpan di satu browser; tidak ada sinkronisasi antar-perangkat.
- Menghapus data browser (cache/localStorage) akan menghapus seluruh kebiasaan.
- Notifikasi pintar bersifat pasif (teks di halaman), bukan notifikasi sistem operasi.

## Lisensi

Belum ditentukan — tambahkan berkas `LICENSE` bila ingin menetapkan lisensi (mis. MIT).
