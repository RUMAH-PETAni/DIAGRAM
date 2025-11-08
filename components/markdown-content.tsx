'use client';

import { useLanguage } from '@/lib/i18n/context';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';

interface MarkdownContentProps {
  basePath: string; // Base path without extension, e.g. 'terms-of-service' or 'privacy-policy'
  className?: string;
}

export function MarkdownContent({ basePath, className }: MarkdownContentProps) {
  const { language } = useLanguage();
  
  // Since Next.js doesn't allow dynamic imports of public files, 
  // we'll use static imports and store content in the component
  // For now, we'll import the content as text directly from the files
  const content = basePath === 'terms-of-service' 
    ? (language === 'id' 
        ? `Dengan menggunakan platform ini, Anda setuju dengan Ketentuan Layanan berikut.

### **1. Penggunaan Layanan**
Anda setuju untuk menggunakan layanan ini hanya untuk tujuan yang sah dan sesuai dengan hukum yang berlaku.

### **2. Akun Pengguna**
- • Anda bertanggung jawab atas keamanan akun Anda.
- • Jangan membagikan kredensial login Anda kepada orang lain.
- • Kami berhak untuk menangguhkan akun yang terlibat dalam aktivitas mencurigakan.

### **3. Kepemilikan Konten**
Semua materi dalam platform (kode sumber, desain, logo, dan data sistem) menjadi milik **tim RUMAHPETAni**. Reproduksi atau modifikasi tanpa izin tertulis dilarang.

### **4. Pembatasan Tanggung Jawab**
Kami tidak bertanggung jawab atas kerusakan yang diakibatkan oleh penggunaan data atau kesalahan sistem di luar kendali kami.

### **5. Modifikasi Layanan**
Kami dapat memperbarui, menambahkan, atau menghentikan fitur tertentu tanpa pemberitahuan sebelumnya.

### **6. Hukum yang Berlaku**
Ketentuan ini diatur berdasarkan hukum Republik Indonesia.

### **7. Kontak**
Untuk pertanyaan apapun, hubungi **support@rumahpetani.cloud**`
        : `By using this platform, you agree to the following Terms of Service.

### **1. Use of Service**
You agree to use this service only for lawful purposes and in compliance with applicable laws.

### **2. User Accounts**
- • You are responsible for maintaining the security of your account.
- • Do not share login credentials with others.
- • We reserve the right to suspend accounts engaged in suspicious activity.

### **3. Ownership of Content**
All materials in the platform (source code, design, logo, and system data) belong to **RUMAHPETAni team**. Reproduction or modification without written permission is prohibited.

### **4. Limitation of Liability**
We are not liable for any damages resulting from data use or system errors beyond our control.

### **5. Service Modifications**
We may update, add, or discontinue certain features without prior notice.

### **6. Governing Law**
These Terms are governed by the laws of the Republic of Indonesia.

### **7. Contact**
For any inquiries, contact **support@rumahpetani.cloud**`)
    : (language === 'id'
        ? `Kami menghargai privasi Anda dan berkomitmen untuk melindungi informasi pribadi Anda.

### **1. Informasi yang Kami Kumpulkan**
Kami mungkin mengumpulkan:
- • Detail akun (email, nama, jenis kelamin, nomor telepon dan alamat)
- • Data lokasi lahan (koordinat dan input alamat)
- • Data teknis seperti alamat IP, tipe perangkat, dan aktivitas aplikasi

### **2. Cara Kami Menggunakan Informasi**
Data Anda digunakan untuk:
- • Mengelola akun pengguna dan otentikasi
- • Menyediakan layanan pemetaan dan analisis agroforestri
- • Meningkatkan pengalaman pengguna dan fitur aplikasi
- • Mengirimkan pemberitahuan terkait layanan

### **3. Penyimpanan dan Keamanan Data**
Data disimpan secara aman menggunakan penyedia pihak ketiga dengan langkah-langkah keamanan yang sesuai untuk mencegah akses atau penghapusan yang tidak sah.

### **4. Berbagi Data**
Kami **tidak menjual atau menyewakan** data pribadi Anda. Data hanya dibagikan dengan penyada layanan yang membantu dalam operasi aplikasi di bawah perlindungan privasi yang serupa.

### **5. Hak Pengguna**
Anda dapat meminta penghapusan atau pembaruan data Anda dengan mengirimkan email ke **support@rumahpetani.cloud**

### **6. Pembaruan Kebijakan**
Kebijakan ini dapat diperbarui dari waktu ke waktu. Versi terbaru akan selalu tersedia di [https://rumahpetani.cloud/](https://rumahpetani.cloud/)

### **7. Kontak**
Untuk pertanyaan atau kekhawatiran tentang privasi, hubungi **support@rumahpetani.cloud**


---


## 🛡️ **Pengumpulan Data Pribadi Sensitif**

Kami mungkin mengumpulkan informasi pribadi sensitif seperti **Nomor Induk Kependudukan**, alamat lengkap, dan detail kepemilikan lahan. Data ini dikumpulkan **hanya untuk tujuan verifikasi identitas dan manajemen lahan**.

Kami memastikan keamanan dan kerahasiaan data tersebut dengan:
- Menyimpan semua data sensitif terenkripsi di server aman.
- Tidak pernah menampilkan NIK atau identitas serupa di area publik aplikasi.
- Tidak pernah membagikan data sensitif kepada pihak ketiga tanpa persetujuan eksplisit pengguna.
- Mengizinkan pengguna untuk meminta penghapusan data mereka kapan saja melalui **support@rumahpetani.cloud**`
        : `We value your privacy and are committed to protecting your personal information.

### **1. Information We Collect**
We may collect:
- • Account details (email, name, gender, phone number and address)
- • Farm location data (coordinates and address input)
- • Technical data such as IP address, device type, and app activity

### **2. How We Use Information**
Your data is used to:
- • Manage user accounts and authentication
- • Provide mapping and agroforestry analysis services
- • Improve user experience and app features
- • Send service-related notifications

### **3. Data Storage and Security**
Data is securely stored using third-party providers with appropriate security measures to prevent unauthorized access or deletion.

### **4. Data Sharing**
We **do not sell or rent** your personal data. Data is only shared with service providers that assist in app operations under similar privacy protections.

### **5. User Rights**
You can request deletion or updates of your data by emailing **support@rumahpetani.cloud**

### **6. Policy Updates**
This policy may be updated periodically. The latest version will always be available at [https://rumahpetani.cloud/](https://rumahpetani.cloud/)

### **7. Contact**
For questions or privacy concerns, contact **support@rumahpetani.cloud**


---


## 🛡️ **Sensitive Personal Data Collection**

We may collect sensitive personal information such as **National Identity Number**, full address, and land ownership details. These are collected **solely for identity verification and farm management purposes**.

We ensure the safety and confidentiality of such data by:
- Storing all sensitive data encrypted on secure servers.
- Never displaying NIK or similar identifiers in public areas of the app.
- Never sharing sensitive data with any third party without explicit user consent.
- Allowing users to request deletion of their data at any time via **support@rumahpetani.cloud**`);

  return (
    <div className={className}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        className="prose max-w-none"
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}