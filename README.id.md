# JumpaLagi (The Reunion Hub)

<!-- README-I18N:START -->

[English](./README.md) | **Bahasa Indonesia**

<!-- README-I18N:END -->

JumpaLagi adalah aplikasi web premium yang bernuansa nostalgia namun modern, dirancang untuk merencanakan reuni keluarga, angkatan sekolah, maupun korporasi. Dibuat khusus untuk pengguna lintas generasi, platform ini menyediakan katalog paket pilihan (Bandung, Dieng, Solo), detail lokasi, eksplorasi peta 3D interaktif, dan layanan konsultasi untuk menghilangkan kerumitan dalam menyusun acara reuni.

## 🚀 Fitur

- **Dukungan Multibahasa**: Mendukung perpindahan bahasa Inggris (EN) dan Bahasa Indonesia (ID) secara langsung di aplikasi.
- **Paket Pilihan**: Penyaringan katalog dinamis untuk paket perjalanan indah seperti Bandung, Dieng, dan Solo.
- **Peta 3D Interaktif**: Peta imersif yang menampilkan destinasi reuni dan batas area lokasi.
- **Formulir Konsultasi**: Formulir modal terintegrasi penuh yang menggunakan API Resend untuk mengirim email reservasi dan konsultasi dalam format HTML kustom secara otomatis.
- **Desain Responsif Premium**: Mengikuti tema yang bernuansa nostalgia, modern, dan mudah diakses dengan kontras tinggi serta tipografi Montserrat/Inter kustom.

## 🛠️ Teknologi

- **Framework**: [Next.js 14+ (App Router)](https://nextjs.org/)
- **Bahasa**: [TypeScript](https://www.typescriptlang.org/)
- **Gaya (Styling)**: Tailwind CSS & Vanilla CSS
- **Animasi**: [Framer Motion](https://www.framer.com/motion/)
- **Email API**: [Resend](https://resend.com/)
- **Ikon**: [Lucide React](https://lucide.dev/)

## ⚙️ Langkah Awal

Pertama, pasang dependensi:

```bash
npm install
```

Selanjutnya, konfigurasikan variabel lingkungan Anda di dalam file `.env.local`:

```env
RESEND_API_KEY=your_resend_api_key_here
```

Kemudian, jalankan server pengembangan:

```bash
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) pada browser Anda untuk melihat aplikasi berjalan.

## 📁 Struktur Proyek

- `src/app/` - Folder Next.js App Router (halaman: home, about, contact, paket).
- `src/components/` - Komponen interaktif (Hero, Navbar, PackageCatalog, Map3D, ConsultationModal, Footer).
- `src/contexts/` - Penyedia konteks global untuk preferensi bahasa dan visibilitas modal.
- `src/lib/` - Utilitas dan helper bersama.
- `src/templates/` - Templat HTML untuk email sistem/notifikasi.

## 📄 Lisensi

Proyek ini bersifat hak milik (proprietary) dan rahasia. Hak cipta dilindungi undang-undang.
