# LKP 3A — Aplikasi To-Do List dengan JavaScript Murni

Praktikum **Pertemuan 4: JavaScript Fundamentals & DOM** (Pemrograman Base Platform).
Aplikasi daftar tugas yang dibuat tanpa framework dan tanpa library. Data tugas disimpan di `localStorage`, jadi tetap ada walaupun halaman di-refresh.

**Nama:** AHMAD RIFQI
**NIM:** 240511057

## 1. Isi Folder

```
lpk-3a/
├── index.html     -> struktur halaman (form, statistik, daftar tugas)
├── style.css      -> tampilan aplikasi
├── app.js         -> logika aplikasi (DOM + localStorage)
├── screenshot/
│   ├── 01-tampilan-awal.png
│   ├── 02-tambah-dan-centang.png
│   ├── 03-setelah-hapus.png
│   └── 04-setelah-refresh.png
└── README.md      -> dokumen ini
```

## 2. Cara Menjalankan (Langkah demi Langkah)

1. Ekstrak file zip sampai muncul folder `lpk-3a`.
2. Buka folder `lpk-3a`.
3. Klik dua kali file `index.html`. Aplikasi akan terbuka di browser.
4. Selesai. Tidak perlu instal apa pun dan tidak perlu internet.

Opsional, kalau memakai VS Code: klik kanan `index.html`, lalu pilih **Open with Live Server**.

## 3. Cara Menguji (sesuai Langkah 5 pada modul)

1. Buka `index.html` di browser.
2. Ketik tugas di kolom input, lalu tekan **Enter** atau klik **Tambah**. Lakukan 3 kali.
3. Centang satu tugas. Teksnya akan dicoret dan angka "tugas belum selesai" berkurang.
4. Klik **Hapus** pada satu tugas. Tugas itu hilang dari daftar.
5. Tekan **F5** untuk refresh. Daftar tugas dan status centang harus tetap sama.
6. Ambil screenshot hasil akhir.

### Melihat data di localStorage

1. Tekan **F12** untuk membuka DevTools.
2. Buka tab **Application** (di Chrome/Edge/Brave).
3. Pilih **Local Storage**, lalu klik alamat halaman Anda.
4. Cari kunci bernama `todos`. Isinya berupa teks JSON dari semua tugas.

### Menghapus semua data

Buka tab **Console** di DevTools, ketik `localStorage.clear()`, lalu tekan Enter dan refresh halaman.

## 4. Penjelasan Kode (app.js)

Kode disusun dalam blok-blok berurutan seperti pada modul.

| Blok         | Isi                                                                                           | Fungsi                                                                            |
| ------------ | --------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------- |
| STATE        | `let todos = muatDariStorage()`                                                               | Array yang menyimpan semua tugas. Setiap tugas berbentuk `{ id, teks, selesai }`. |
| DOM ELEMENTS | `form`, `input`, `list`, `stats`                                                              | Referensi ke elemen HTML yang dipakai.                                            |
| FUNCTIONS    | `muatDariStorage`, `simpan`, `buatItem`, `render`, `tambahTodo`, `hapusTodo`, `toggleSelesai` | Seluruh logika aplikasi.                                                          |
| EVENTS       | `submit`, `change`, `click`                                                                   | Menanggapi aksi pengguna.                                                         |
| INIT         | `render()`                                                                                    | Menggambar daftar saat halaman pertama dibuka.                                    |

Alur kerjanya selalu sama: **ubah state, simpan ke localStorage, lalu `render()` ulang**.

- **Tambah tugas**: event `submit` pada form memanggil `tambahTodo()`. `e.preventDefault()` mencegah halaman reload. Teks yang hanya berisi spasi ditolak lewat `trim()`.
- **Toggle selesai**: event `change` pada checkbox memanggil `toggleSelesai(id)`, yang membalik nilai `selesai`.
- **Hapus tugas**: event `click` pada tombol Hapus memanggil `hapusTodo(id)`, yang membuang tugas dengan `filter()`.
- **localStorage**: `simpan()` mengubah array menjadi teks dengan `JSON.stringify()`. `muatDariStorage()` mengembalikannya dengan `JSON.parse()`.
- **Event delegation**: listener `change` dan `click` dipasang satu kali pada `<ul>`, bukan pada tiap item, karena item dibuat ulang setiap kali `render()` dijalankan.

## 5. Perbaikan di Luar Contoh Modul

Fungsi dan tampilan tetap sama dengan modul. Perbaikan yang ditambahkan:

1. **Teks tugas tidak lagi disisipkan lewat `innerHTML`.** Di contoh modul, teks yang diketik pengguna ikut ditafsirkan sebagai HTML, sehingga tag atau skrip yang diketik bisa dijalankan browser dan ikut tersimpan di localStorage. Sekarang item dibuat dengan `createElement` dan teksnya dipasang dengan `textContent`, sehingga tag HTML tampil sebagai teks biasa.
2. **Pembacaan localStorage lebih aman.** Jika isi `todos` rusak atau bukan array, aplikasi memulai dari daftar kosong, bukan error.
3. **Aksesibilitas.** Input punya label tersembunyi (`sr-only`), angka statistik memakai `aria-live`, dan checkbox serta tombol Hapus punya `aria-label` yang menyebut nama tugasnya. Fokus keyboard juga terlihat jelas.
4. **Kerapian UI.** Teks tugas yang sangat panjang tidak keluar dari kartu, dan pesan "Belum ada tugas" diberi gaya sendiri.
5. **Kode lebih rapi.** Nama kunci localStorage disimpan dalam konstanta `STORAGE_KEY`, pembuatan item dipisah ke fungsi `buatItem()`, dan kolom input otomatis fokus setelah menambah tugas.

## 6. Hasil Pengujian

Skenario berikut sudah dijalankan pada aplikasi ini dan semuanya berhasil:

- tampilan awal menampilkan "Belum ada tugas" dan "0 tugas belum selesai"
- menambah 3 tugas lewat tombol Enter
- mencentang satu tugas (teks dicoret, statistik berubah menjadi "2 tugas belum selesai")
- menghapus satu tugas (statistik menjadi "1 tugas belum selesai")
- refresh halaman (jumlah tugas dan status centang tetap)
- input kosong dan input berisi spasi saja tidak menambah tugas
- input berisi tag HTML tampil sebagai teks dan tidak dijalankan
- tampilan 375 px tidak memiliki scroll horizontal
- isi localStorage yang rusak tidak membuat error

## 7. Screenshot

Keempat screenshot di folder `screenshot/` dibuat dari aplikasi ini. Jika dosen meminta tampilan jendela browser Anda, ambil ulang screenshot dari browser sendiri dengan nama berkas yang sama, lalu timpa berkas di folder `screenshot/`.

## 8. Mengumpulkan Tugas (Git)

Jalankan dari folder induk repository:

```bash
git add lpk-3a/
git commit -m "LKP 3A: To-Do List dengan JavaScript murni"
git push
```

## 9. Checklist Rubrik

| Kriteria              | Bobot | Sudah dipenuhi lewat                                           |
| --------------------- | ----- | -------------------------------------------------------------- |
| Fungsi tambah tugas   | 20    | Form `submit`, tombol Tambah atau Enter, fungsi `tambahTodo()` |
| Fungsi toggle selesai | 20    | Checkbox, fungsi `toggleSelesai()`, teks dicoret               |
| Fungsi hapus tugas    | 20    | Tombol Hapus, fungsi `hapusTodo()`                             |
| localStorage          | 20    | `simpan()` dan `muatDariStorage()`, data tetap setelah refresh |
| Kualitas kode & UI    | 20    | Kode modular per blok, UI rapi, penyisipan teks yang aman      |
