# Product Requirements Document (PRD)
**Project Name:** Jabar Export Hub (B2B SME Export Directory)
**Document Status:** Draft / V1.0
**Target Audience:** International Buyers & West Java SMEs

---

## 1. Executive Summary
Jabar Export Hub adalah platform direktori B2B (Business-to-Business) yang dirancang untuk mempertemukan pembeli internasional (importir, roaster kopi, distributor) dengan UMKM atau Koperasi produsen komoditas unggulan Jawa Barat. Platform ini berfungsi sebagai etalase digital yang memprioritaskan validitas data, kapasitas produksi, dan kemudahan akses bagi pengguna global.

## 2. Technical Architecture
Pemilihan teknologi difokuskan pada performa SEO global (Edge Network), keamanan, dan efisiensi manajemen data relasional.

*   **Frontend & Core Framework:** Next.js (App Router)
    *   *Server-Side Rendering (SSR)* untuk halaman publik (SEO & akses cepat).
    *   *Client-Side Rendering (CSR)* untuk dashboard UMKM/Admin.
    *   *Server Actions* untuk penanganan form (mutasi data) tanpa API routes tambahan.
*   **Database:** Turso (libSQL)
    *   Database SQLite di Edge yang memastikan latensi rendah bagi *buyer* dari berbagai belahan dunia.
*   **ORM:** Drizzle ORM
    *   Ringan, *type-safe*, dan optimal untuk Turso.
*   **Styling & UI:** Tailwind CSS + Shadcn UI
*   **Authentication:** NextAuth.js (Auth.js) v5

---

## 3. Core Features & User Stories

### A. International Buyers (Public)
*   **Feature 1: Discovery & Filtering**
    *   *Story:* Sebagai *buyer*, saya ingin memfilter komoditas berdasarkan kategori (Kopi, Teh, Kriya, Tekstil), sertifikasi (HACCP, Fair Trade, Halal), dan kapasitas minimum bulanan.
*   **Feature 2: Request for Quotation (RFQ)**
    *   *Story:* Sebagai *buyer*, saya dapat mengisi form *Inquiry* (Nama, Email, Negara, Volume) pada halaman produk tanpa melihat nomor WhatsApp UMKM untuk mencegah spam.

### B. SMEs / UMKM (Authenticated)
*   **Feature 3: Profile & Capacity Management**
    *   *Story:* Sebagai UMKM, saya dapat mengunggah legalitas, sertifikasi, serta memperbarui metrik kapasitas produksi bulanan saya agar akurat.
*   **Feature 4: Inquiry Notifications**
    *   *Story:* Sebagai UMKM, saya menerima notifikasi email otomatis ketika ada RFQ masuk dari *buyer*.

### C. Super Admin (Authenticated)
*   **Feature 5: Curation & Verification**
    *   *Story:* Sebagai Admin, saya dapat memverifikasi atau menolak pendaftaran UMKM baru berdasarkan keabsahan dokumen (NIB, NPWP) sebelum profil mereka ditayangkan ke publik (mendapat *Verified Badge*).

---

## 4. Database Schema (Drizzle ORM x Turso)

Berikut adalah struktur dasar tabel relasional pada sistem:

| Table Name | Description | Key Columns |
| :--- | :--- | :--- |
| `users` | Kredensial akun sistem | `id`, `role` (ADMIN/SME), `email`, `password_hash`, `created_at` |
| `companies` | Profil legal UMKM | `id`, `user_id` (FK), `name`, `established_year`, `description`, `is_verified` |
| `products` | Katalog komoditas | `id`, `company_id` (FK), `name`, `category`, `monthly_capacity`, `unit`, `image_url` |
| `certifications` | Dokumen sertifikat | `id`, `company_id` (FK), `cert_name`, `document_url`, `issued_by` |
| `inquiries` | Data RFQ dari buyer | `id`, `product_id` (FK), `buyer_name`, `buyer_email`, `country`, `quantity`, `message` |

---

## 5. User Flow: B2B Inquiry Process

1.  **Discovery:** *Buyer* internasional mengakses web dan masuk ke halaman detail `Product X`.
2.  **Action:** *Buyer* menekan tombol *"Request a Quote"* dan mengisi form (Server Component memicu *modal* form).
3.  **Processing:** Form dikirim menggunakan Next.js *Server Actions*.
4.  **Database Write:** Drizzle ORM menyimpan data RFQ ke tabel `inquiries` di database Turso.
5.  **Notification:** Sistem memicu fungsi *email sender* (misal: Resend) ke alamat email UMKM pemilik `Product X`.
6.  **Follow-up:** UMKM merespons penawaran tersebut langsung ke email *buyer* (negosiasi berlanjut di luar platform).

---

## 6. Project Directory Structure (Next.js App Router)

```text
├── src/
│   ├── app/
│   │   ├── (public)/         # Halaman publik (Homepage, Direktori, Detail Produk)
│   │   ├── (dashboard)/      # Dashboard khusus Admin & UMKM (Terproteksi NextAuth)
│   │   ├── api/              # API routes eksternal (jika butuh webhook)
│   ├── components/           # UI Components (Shadcn UI, navigasi, footer)
│   ├── db/                   # Konfigurasi Turso & Drizzle
│   │   ├── schema.ts         # Skema database utama
│   │   ├── index.ts          # Inisialisasi koneksi Turso
│   ├── lib/                  # Utility functions & Zod validations
│   ├── actions/              # Server Actions untuk form handling