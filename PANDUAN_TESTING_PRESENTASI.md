# 📋 PANDUAN TESTING & SKENARIO DEMO PRESENTASI REPLATE
Platform Sirkular Pangan & Pengurangan Food Waste Berbasis Komunitas Desa

---

## 🎯 1. Informasi & Akun Demo (Credentials)

Untuk mendemonstrasikan sistem secara mulus, gunakan data bawaan dari database seeder (`php artisan migrate:fresh --seed`):

| Peran (Role) | Nama Pengguna | Email | Password | Kegunaan Demo |
|---|---|---|---|---|
| **Admin BUMDes** | Admin BUMDes | `admin@replate.com` | `password` | Moderasi laporan, verifikasi UMKM, manajemen mitra & voucher |
| **Verified Seller** | UMKM Berkah Kompos | `seller@replate.com` | `password` | Penjualan produk olahan terverifikasi |
| **Mitra Pakan** | Pak Slamet (Peternak) | `partner@replate.com` | `password` | Penerimaan limbah pakan ternak (kapasitas 50kg) |
| **Mitra Kompos** | Bu Rina (Kompos) | `kompos@replate.com` | `password` | Penerimaan sampah organik untuk kompos (kapasitas 100kg) |
| **Mitra Maggot** | Mas Doni (Maggot BSF) | `maggot@replate.com` | `password` | Penerimaan limbah organik untuk maggot (kapasitas 30kg) |
| **Warga 1 (Pemberi)** | Warga Budiman | `user@replate.com` | `password` | Membuat donasi, listing barter/jual, koordinasi chat |
| **Warga 2 (Penerima)** | Ibu Sari | `sari@replate.com` | `password` | Mengklaim donasi, tawar barter, belanja, beri ulasan |

---

## ⚙️ 2. Persiapan Sebelum Demo (Setup & Checklist)

1. **Jalankan Aplikasi:**
   ```bash
   # Terminal 1: Web Server
   php artisan serve

   # Terminal 2: Vite Build / Dev
   npm run dev
   ```
2. **Reset Database Bersih (Rekomendasi Sebelum Presentasi):**
   ```bash
   php artisan migrate:fresh --seed
   ```
3. **Persiapan Browser (Multi-Window / Multi-Persona):**
   - **Jendela Normal (Chrome):** Login sebagai **Warga Budiman** (`user@replate.com`) atau **Admin** (`admin@replate.com`).
   - **Jendela Incognito / Profil Kedua:** Login sebagai **Ibu Sari** (`sari@replate.com`) atau **Mitra** (`partner@replate.com`).
   > 💡 *Tips:* Menjajarkan dua jendela browser (Split Screen: Kiri & Kanan) akan memberikan efek "WOW" karena penguji/audiens dapat melihat interaksi dua arah secara instan (real-time).

---

## 🎬 3. Urutan Skenario Demonstrasi (Alur Cerita Presentasi)

Berikut adalah alur narasi 9 babak yang dirancang teratur dari sudut pandang pengguna awam hingga pengelola desa.

---

### 🟢 BABAK 1: Publik & Kesadaran Dampak Lingkungan (Tanpa Login)
*Tujuan: Memperkenalkan visi misi Replate dan metrik transparansi food waste.*

1. **Buka Halaman Utama (`/`):**
   - Tunjukkan Hero Section interaktif, tujuan platform, dan ringkasan ekosistem.
   - Sorot **Metrik Dampak Global (Impact Counter)**: Total Kg makanan terselamatkan, reduksi emisi CO2e, dan porsi yang dibagikan.
2. **Kunjungi Halaman Dampak & Leaderboard (`/impact` & `/leaderboard`):**
   - Jelaskan bahwa warga yang aktif menyelamatkan pangan akan masuk ke jajaran leaderboard desa.
3. **Kunjungi Marketplace Publik (`/marketplace`):**
   - Tunjukkan katalog pangan: filter kategori, kondisi makanan, dan mode transaksi (Donasi, Jual Murah, Barter).

---

### 🟢 BABAK 2: Autentikasi Pengguna & Single Sign-On (SSO)
*Tujuan: Memperlihatkan kemudahan registrasi dan fleksibilitas login modern.*

1. **Akses Halaman Login (`/login`):**
   - Perlihatkan opsi form login konvensional (Email & Password).
   - Tunjukkan tombol **"Masuk dengan Google"** (Google SSO).
2. **Testing Google SSO:**
   - Klik tombol **"Masuk dengan Google"**.
   - Sistem akan mengarahkan ke akun Google, mengonfirmasi akses, dan otomatis membuat/menghubungkan akun ke dashboard Replate.
3. *(Alternatif Demo Cepat)*: Login menggunakan akun demo `user@replate.com` / `password`.

---

### 🟢 BABAK 3: Pasang Iklan / Donasi Makanan Sisa Layak
*Persona: Warga Budiman (`user@replate.com`) di Jendela Kiri*

1. **Akses Menu Tambah Produk (`/products/create`):**
   - Klik tombol **"Tambah Produk / Donasi"**.
2. **Isi Form Pangan:**
   - **Judul Produk:** Nasi Kotak & Sayur Segar Berlebih (Masih Layak)
   - **Kategori:** Makanan Siap Santap / Bahan Segar
   - **Mode Transaksi:** Pilih **Donasi (Gratis)** atau **Jual Murah / Barter**
   - **Berat (gram):** Misal `1500` gram (1.5 kg)
   - **Kondisi & Ketahanan:** Makanan berlebih acara syukuran, aman konsumsi hingga 6 jam ke depan
   - **Lokasi Penjemputan:** Bambanglipuro, RT 03/RW 01
   - **Unggah Foto Produk:** Pilih foto makanan yang menarik
3. **Publikasikan:**
   - Klik **"Simpan & Tayangkan"**.
   - Tunjukkan bahwa produk langsung tampil di halaman **"Produk Saya"** (`/my-products`) dengan status aktif dan countdown ketahanan makanan.

---

### 🟢 BABAK 4: Klaim Donasi & Alur Transaksi Dua Arah
*Persona: Ibu Sari (`sari@replate.com`) di Jendela Kanan*

1. **Eksplorasi & Temukan Produk:**
   - Ibu Sari membuka `/marketplace`, menemukan donasi dari Warga Budiman, dan klik untuk melihat detail (`/products/{id}`).
2. **Klaim Donasi:**
   - Klik tombol **"Klaim Donasi"** atau **"Ajukan Permintaan"**.
3. **Konfirmasi oleh Pemilik Pangan (Jendela Kiri - Warga Budiman):**
   - Buka menu **"Transaksi"** (`/transactions`).
   - Terdapat transaksi baru berstatus *Pending / Menunggu Konfirmasi*.
   - Klik tombol **"Terima Donasi"** (`acceptDonation`).
4. **Penyelesaian Transaksi & Upload Bukti:**
   - Pada saat serah terima di titik kumpul desa, salah satu pihak mengunggah bukti serah terima (foto) atau menekan tombol **"Selesaikan Transaksi"** (`complete`).
   - Status transaksi berubah menjadi **Selesai (Completed)**.
5. **Ulasan (Review):**
   - Ibu Sari memberikan rating bintang 5 dan komentar apresiasi.

---

### 🟢 BABAK 5: Fitur Barter & Fitur Chat Interaktif
*Tujuan: Memperlihatkan interaksi sosial dan kearifan lokal gotong royong.*

1. **Pengajuan Barter Pangan (`/products/{product}/barter`):**
   - Ibu Sari melihat produk bertipe barter milik Warga lain (misal: Bibit Cabai atau Sayur Mayur).
   - Klik **"Ajukan Barter"**, pilih barang milik Ibu Sari yang ingin ditukarkan beserta deskripsinya.
   - Pemilik produk dapat melihat penawaran di `/barter` dan memilih **"Terima"** atau **"Tolak"**.
2. **Koordinasi via Chat (`/chat`):**
   - Dari halaman detail produk, klik **"Hubungi Penjual / Chat"**.
   - Kirim pesan: *"Halo Pak, apakah makanannya masih bisa diambil jam 4 sore di depan balai desa?"*
   - Tunjukkan pesan langsung masuk ke inbox mitra bicara.

---

### 🟢 BABAK 6: Portal Mitra Pengolah Limbah (Animal Feed & Composting)
*Persona: Pak Slamet / Mas Doni (`partner@replate.com` / `password`)*

1. **Buka Dashboard Mitra (`/partner/dashboard`):**
   - Tunjukkan tampilan khusus mitra: Kapasitas harian yang tersedia, kuota limbah organik yang sudah diterima hari ini.
2. **Kategori Penyaluran Limbah:**
   - Perlihatkan bagaimana limbah pangan yang sudah tidak layak konsumsi disalurkan ke mitra ternak (pakan sapi/bebek) atau budidaya Maggot BSF.
3. **Konfirmasi Penerimaan:**
   - Mitra menerima dan memvalidasi berat bahan organik yang masuk untuk mencatat kontribusi nol limbah (*Zero Waste to Landfill*).

---

### 🟢 BABAK 7: Gamifikasi, Poin Replate, & Penukaran Reward
*Persona: Warga Budiman (`user@replate.com`)*

1. **Buka Halaman Poin (`/points`):**
   - Tunjukkan perolehan poin yang otomatis bertambah setiap kali berhasil mendonasikan atau menyelamatkan pangan.
   - Perlihatkan riwayat perolehan poin (*Point History*).
2. **Tukar Poin (Redeem Reward):**
   - Pilih reward yang tersedia (misal: Sembako Desa, Kupon BUMDes, atau Diskon UMKM).
   - Klik **"Tukarkan Poin"**.
   - Sistem akan menerbitkan kode klaim unik / QR code penukaran.

---

### 🟢 BABAK 8: Pendaftaran UMKM Olahan (Seller Verification)
*Persona: Warga mengajukan verifikasi toko olahan pangan*

1. **Buka Form Verifikasi (`/seller/apply`):**
   - Warga yang ingin menjual produk olahan (kompos kemasan, keripik olahan, dll.) harus mengajukan verifikasi ke BUMDes.
   - Unggah data: Nama Usaha, Deskripsi, No. WhatsApp, dan Dokumen Bukti Usaha / PIRT / Surat Keterangan Desa.
   - Status pengajuan menjadi *Menunggu Tinjauan Admin*.

---

### 🟢 BABAK 9: Dashboard & Panel Kendali Admin BUMDes
*Persona: Admin BUMDes (`admin@replate.com` / `password`)*

1. **Akses Admin Dashboard (`/admin/dashboard`):**
   - Tunjukkan metrik komprehensif desa: Total transaksi, total kg food waste dicegah, pengguna aktif, dan mitra binaan.
2. **Verifikasi Pengajuan Penjual (`/admin/verifications`):**
   - Tinjau dokumen pengajuan UMKM yang baru diajukan pada Babak 8.
   - Klik **"Setujui (Approve)"** untuk memberikan badge *Verified Seller*.
3. **Manajemen Laporan & Keamanan Komunitas (`/admin/reports`):**
   - Tunjukkan daftar laporan pengguna/produk (misal: makanan basi atau akun terindikasi spam).
   - Tunjukkan aksi moderasi: Tindak lanjuti laporan, tolak, atau masukkan ke daftar hitam (*Blacklist*).
4. **Validasi Klaim Voucher Warga (`/admin/redeem`):**
   - Masukkan kode klaim reward warga dari Babak 7 untuk memvalidasi dan memproses penyerahan reward.
5. **Kelola Mitra (`/admin/partners`):**
   - Tambah atau ubah status aktif mitra ternak/kompos desa.

---

## 🗣️ 4. Panduan Skrip Presentasi (Narasi Presenter)

Berikut kata-kata kunci yang bisa digunakan saat mendemokan aplikasi:

- **Pembuka (Hook):**
  > *"Permasalahan food waste tidak hanya terjadi di kota besar, tetapi juga di tingkat desa di mana makanan layak konsumsi sering terbuang, sementara petani dan peternak membutuhkan pakan serta pupuk. Replate hadir sebagai platform sirkular pangan desa untuk menutup celah tersebut."*
- **Saat Demo Donasi & Transaksi:**
  > *"Warga cukup memotret makanan lebih, mengisi perkiraan berat dan batas waktu konsumsi. Sistem kami secara otomatis mengkalkulasi potensi pengurangan emisi karbon dan mengonversinya menjadi poin reward gotong royong."*
- **Saat Demo Single Sign-On:**
  > *"Untuk mempermudah adopsi oleh warga, kami menyediakan login satu klik menggunakan Google SSO tanpa repot mengingat password baru."*
- **Saat Demo Mitra & Admin BUMDes:**
  > *"Bagi makanan yang sudah lewat masa layak konsumsi manusia, sistem Replate menyalurkannya ke mitra terdaftar—seperti peternak dan pembudidaya maggot BSF. Semua diawasi langsung oleh BUMDes melalui dashboard admin."*
- **Penutup:**
  > *"Replate bukan sekadar marketplace, melainkan ekosistem gotong royong pangan yang berdampak nyata bagi ekonomi dan lingkungan desa."*

---

## 🛡️ 5. Rencana Cadangan (Contingency Plan)

1. **Jika Google SSO Terkendala Kuota/Koneksi Internet:**
   - Siapkan akun demo statis yang sudah terisi (`user@replate.com` & `admin@replate.com`). Langsung login via form email & password.
2. **Jika Data Transaksi Terlalu Banyak/Kotor:**
   - Jalankan `php artisan migrate:fresh --seed` dalam 5 detik sebelum sesi presentasi dimulai untuk mengembalikan database ke kondisi prima.
3. **Jika Notifikasi / Refresh Tampilan Lambat:**
   - Gunakan tombol refresh browser biasa (`Ctrl + F5`) untuk memastikan asset Vite dan cache session termuat ulang.
