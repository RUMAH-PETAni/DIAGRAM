// lib/i18n.ts
export const locales = ['en', 'id'] as const;
export type Locale = typeof locales[number];

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface TranslationObject {
  [key: string]: string | TranslationObject | string[];
}

export const translations = {
  en: {
    // Navigation
    home: 'Home',
    about: 'About',
    contact: 'Contact',
    
    // Header
    languageSwitcher: 'Language',
    
    // Common
    welcome: 'Welcome',
    login: 'Login',
    logout: 'Logout',
    signup: 'Sign Up',
    theme: 'Theme',
  
    
    // Page content
    title: 'Diagram',
    description: 'A digital ecosystem for agroforestry management and monitoring',
    nextSteps: 'Next steps',
    poweredBy: 'Powered by',
    
    // Agroforestry Chat
    agroforestryChat: {
      user1: 'Hello, can you explain what coffee agroforestry is?',
      assistant1: 'Certainly! Coffee agroforestry is a planting system where coffee is cultivated together with shade trees such as avocado, durians or other NTFP trees. This mimics the natural forest ecosystem.',
      user2: 'What are the benefits of this system compared to monoculture?',
      assistant2: 'There are many benefits: the soil becomes more fertile, moisture is maintained, biodiversity increases, and long-term coffee productivity is more stable.',
      user3: "Don't shade trees hinder coffee growth?",
      assistant3: 'No, as long as planting distance and tree species are chosen properly. Shade trees actually help reduce heat stress and soil erosion.',
      user4: 'Thank you for the explanation!',
      assistant4: "You're welcome! 🌱 Hope it's helpful.",
      aiTyping: 'AI is typing',
      userTyping: 'You are typing',
      typeMessage: 'Type a message...'
    },
    
    // Footer links
    supabase: 'Supabase',
    nextjs: 'Next.js',
    react: 'React',
    tailwind: 'Tailwind CSS',
    
    // Button texts
    deploy: 'Deploy',
    continue: 'Continue',
    cancel: 'Cancel',
    save: 'Save',
    delete: 'Delete',
    update: 'Update',
    close: 'close',
    
    // Auth related
    userName: 'User Name',
    signIn: 'Sign in',
    signUp: 'Sign up',
    email: 'Email',
    phone: 'Phone Number',
    password: 'Password',
    confirmPassword: 'Confirm Password',
    forgotPassword: 'Forgot Password?',
    rememberMe: 'Remember me',
    dontHaveAccount: "Don't have an account?",
    alreadyHaveAccount: 'Already have an account?',
    resetPassword: 'Reset Password',
    newPassword: 'New Password',
    confirmPasswordError: 'Passwords do not match',
    privacyPolicy: 'Privacy Policy',
    termCondition: 'Term and Condition',
    
    // Errors
    requiredField: 'This field is required',
    invalidEmail: 'Please enter a valid email address',
    passwordLength: 'Password must be at least 6 characters',
    
    // Other content
    heroTitle: 'The fastest way to build apps with Next.js and Supabase',
    heroDescription: 'Just copy and paste this starter template to get started on your own project. All the important setup is done for you.',
    heroButton: 'Get Started',
    
    // Hero section
    diagram: 'DIAGRAM',
    digitalEcosystem: 'Digital Ecosystem for Modern Farmer',
    heroQuote: '"A sustainable digital platform designed to transform conventional farming into a connected, data-driven future."',
    heroAnimationTexts: [
      'Empowering Smallhoder Farmers with: Climate Smart Agriculture.',
      'Empowering Smallhoder Farmers with: Data-Driven Solutions.',
      'Empowering Smallhoder Farmers with: Sustainable Technology.',
      'Empowering Smallhoder Farmers with: Precision Agroforestry.'
    ],
    featuresAndServices: 'Features and Services',
    farmerLandDataManagement: 'Farmer & land Data Management',
    farmerLandDataManagementDesc: 'Manage farmer and land information in one integrated system. Everything is securely stored and easily accessible to support smarter agricultural decisions',
    interactiveMonitoringMap: 'Interactive Monitoring Map',
    interactiveMonitoringMapDesc: 'Monitor field conditions in real time with interactive maps. Visualize land monitoring data and field activities through a clear and intuitive interface.',
    agroforestryStore: 'Agroforestry Online Store',
    agroforestryStoreDesc: 'Connect farmers, buyers, and service providers in a sustainable agricultural ecosystem. Find trusted partners and build a fair and transparent value chain.',
    comingSoon: 'ComingSoon',
    onDemandService: 'OnDemandService',
    sustainableTech: 'Sustainable Technology',
    sustainableTechDesc: 'Our platform promotes sustainable agricultural practices through precision agroforestry techniques and environmentally friendly solutions. We help smallholder farmers implement integrated, data-driven systems to increase productivity while preserving the environment for future generations.',
    usersDashboard: 'Users Dashboard',
    landMapping: 'Mapping & Survey',
    farmMonitoring: 'Farm Monitoring',
    soilClimateData: 'Soil & Climate Data',
    logActivity: 'Activities Record',
    carbonFootprint: 'Carbon Footprint',
    aiRecommendation: 'AI-Gronomist Recommendation',
    commoditySupplyChain: 'Commodity Supply Chain',
    communityHub: 'Community Network',
    aiGronomistAssistant: 'AI-Gronomist Assistant',
    chatDesc:'*AI can make mistakes, give specific questions for the best answers',
    freeAccess: 'Easy to Use',
    accessibleToAnyone: 'Accessible to Anyone and Everywhere',
    
    // Login form
    enterEmailBelowToLogin: 'Enter your email below to login to your account',
    forgotPasswordLogin: 'Forgot your password?',
    dontHaveAccountSignup: "Don't have an account?",
    signupButton: 'Sign up',
    loggingIn: 'Logging in...',
    loginButton: 'Login',
    enterYourUserName: 'Enter your username',
    enterYourEmail: 'Enter your email',
    createAccount: 'Create a new account',
    repeatPassword: 'Repeat Password',
    creatingAccount: 'Creating an account...',
    passwordsDoNotMatch: 'Passwords do not match',
    alreadyHaveAccountLogin: 'Already have an account?',
    signupForm: 'Sign up',

    typeInEmail: 'Type in your email and we\'ll send you a link to reset your password',
    sendResetEmail: 'Send reset email',
    sending: 'Sending...',
    checkYourEmail: 'Check Your Email',
    passwordResetInstructionsSent: 'Password reset instructions sent',
    resetEmailSentInfo: 'If you registered using your email and password, you will receive a password reset email.',
  
      //Profile Form Section
    info: 'Please fill in and complete your personal data',
    userProfile: 'User Profile',
    chooseAvatar: 'Choose Avatar',
    uploadPhoto: 'Upload Photo',
    fullName: 'Full Name',
    enterFullName: 'Enter full name',
    firstName: 'First Name',
    lastName: 'Last Name',
    gender: 'Gender',
    address: 'Address',
    role: 'Role',
  
  },



  id: {
    // Navigation
    home: 'Beranda',
    about: 'Tentang',
    contact: 'Kontak',
    
    // Header
    languageSwitcher: 'Bahasa',
    
    // Common
    welcome: 'Selamat Datang',
    login: 'Masuk',
    logout: 'Keluar',
    signup: 'Daftar',
    theme: 'Tema',
    save: 'Simpan',
    
    // Page content
    title: 'Diagram',
    description: 'Ekosistem digital untuk manajemen dan monitoring agroforestri',
    nextSteps: 'Langkah selanjutnya',
    poweredBy: 'Didukung oleh',
    
    // Agroforestry Chat
    agroforestryChat: {
      user1: 'Halo, bisa jelaskan apa itu agroforestri kopi?',
      assistant1: 'Tentu! Agroforestri kopi adalah sistem tanam di mana kopi dibudidayakan bersama pohon naungan seperti alpukat, durian atau pohon MPTS lainnya. Ini meniru ekosistem alami hutan.',
      user2: 'Apa manfaat sistem itu dibanding monokultur?',
      assistant2: 'Banyak manfaatnya: tanah jadi lebih subur, kelembapan terjaga, biodiversitas meningkat, dan produktivitas jangka panjang kopi lebih stabil.',
      user3: 'Apakah pohon naungan tidak menghambat pertumbuhan kopi?',
      assistant3: 'Tidak, selama jarak tanam dan jenis pohon dipilih dengan tepat. Pohon naungan malah bantu kurangi stres panas dan erosi tanah.',
      user4: 'Terima kasih penjelasannya!',
      assistant4: 'Sama-sama! 🌱 Semoga bermanfaat.',
      aiTyping: 'AI sedang mengetik',
      userTyping: 'Anda sedang mengetik',
      typeMessage: 'Ketik pesan...'
    },
    
    // Footer links
    supabase: 'Supabase',
    nextjs: 'Next.js',
    react: 'React',
    tailwind: 'Tailwind CSS',
    
    // Button texts
    deploy: 'Deploy',
    continue: 'Lanjutkan',
    cancel: 'Batal',
  
    delete: 'Hapus',
    update: 'Perbarui',
     close: 'Tutup',
    
    // Auth related
    userName: 'Nama Pengguna',
    email: 'Email',
    signIn: 'Masuk',
    signUp: 'Daftar',
    phone: 'No Telepon',
    password: 'Kata Sandi',
    confirmPassword: 'Konfirmasi Kata Sandi',
    forgotPassword: 'Lupa Kata Sandi?',
    rememberMe: 'Ingat Saya',
    dontHaveAccount: 'Belum punya akun?',
    alreadyHaveAccount: 'Sudah punya akun?',
    resetPassword: 'Reset Kata Sandi',
    newPassword: 'Kata Sandi Baru',
    confirmPasswordError: 'Kata sandi tidak cocok',
    privacyPolicy: 'Kebijakan Privasi',
    termCondition: 'Syarat dan Ketentuan',
    
    // Errors
    requiredField: 'Bidang ini wajib diisi',
    invalidEmail: 'Silakan masukkan alamat email yang valid',
    passwordLength: 'Kata sandi minimal harus 6 karakter',
    
    // Other content
    heroTitle: 'Cara tercepat untuk membangun aplikasi dengan Next.js dan Supabase',
    heroDescription: 'Cukup salin dan tempel template starter ini untuk memulai proyek Anda sendiri. Semua pengaturan penting sudah dilakukan untuk Anda.',
    heroButton: 'Mulai',
    
    // Hero section
    diagram: 'DIAGRAM',
    digitalEcosystem: 'Ekosistem Digital Petani Modern',
    heroQuote: '"Platform digital berkelanjutan yang dirancang untuk mentransformasi pertanian konvensional menjadi masa depan yang terhubung dan berbasis data."',
    heroAnimationTexts: [
      'Memberdayakan Petani Kecil dengan: Pertanian Cerdas Iklim.',
      'Memberdayakan Petani Kecil dengan: Solusi Berbasis Data.',
      'Memberdayakan Petani Kecil dengan: Teknologi Berkelanjutan.',
      'Memberdayakan Petani Kecil dengan: Agroforestri Presisi.'
    ],
    featuresAndServices: 'Fitur dan Layanan',
    farmerLandDataManagement: 'Manajemen Data Petani & Lahan',
    farmerLandDataManagementDesc: 'Kelola informasi petani dan lahan dalam satu sistem terintegrasi. Semua disimpan secara aman dan mudah diakses untuk mendukung keputusan pertanian yang lebih cerdas',
    interactiveMonitoringMap: 'Peta Pemantauan Interaktif',
    interactiveMonitoringMapDesc: 'Pantau kondisi lapangan secara real time dengan peta interaktif. Visualisasikan data monitoring lahan dan aktivitas di lapangan melalui antarmuka yang jelas dan intuitif.',
    agroforestryStore: 'Toko Online Agroforestri',
    agroforestryStoreDesc: 'Hubungkan petani, pembeli, dan penyedia layanan dalam ekosistem pertanian berkelanjutan. Temukan mitra tepercaya, dan bangun rantai nilai yang adil dan transparan.',
    comingSoon: 'ComingSoon',
    onDemandService: 'OnDemandService',
    sustainableTech: 'Teknologi Berkelanjutan',
    sustainableTechDesc: 'Platform kami mempromosikan praktik pertanian berkelanjutan melalui teknik pertanian agroforestri presisi dan solusi ramah lingkungan. Kami membantu petani kecil menerapkan sistem berbasis data yang terintegrasi, untuk meningkatkan hasil produktivitas sekaligus melestarikan lingkungan untuk generasi mendatang.',
    usersDashboard: 'Dashboard Pengguna',
    landMapping: 'Survey & Pemetaan',
    farmMonitoring: 'Pemantauan Pertanian',
    soilClimateData: 'Data Tanah & Klimatologi',
    logActivity: 'Catatan Aktifitas',
    carbonFootprint: 'Lacak Jejak Karbon',
    aiRecommendation: 'Rekomendasi AI-Gronomis',
    commoditySupplyChain: 'Rantai Pasok Komoditas',
    communityHub: 'Jaringan Komunitas',
    aiGronomistAssistant: 'Asisten AI-Gronomis',
    chatDesc:'*AI dapat membuat kesalahan, berikan pertanyaan spesifik untuk jawaban terbaik',
    freeAccess: 'Kemudahan Penggunaan',
    accessibleToAnyone: 'Dapat diakses oleh siapa saja dan di mana saja',
    
    // Login form
    enterEmailBelowToLogin: 'Masukkan email Anda di bawah untuk masuk ke akun Anda',
    forgotPasswordLogin: 'Lupa kata sandi?',
    dontHaveAccountSignup: 'Belum punya akun?',
    signupButton: 'Daftar',
    loggingIn: 'Sedang masuk...',
    loginButton: 'Masuk',
    enterYourUserName: 'Masukkan nama pengguna anda',
    enterYourEmail: 'Masukkan email Anda',
    createAccount: 'Buat akun baru',
    repeatPassword: 'Ulangi Kata Sandi',
    creatingAccount: 'Membuat akun...',
    passwordsDoNotMatch: 'Kata sandi tidak cocok',
    alreadyHaveAccountLogin: 'Sudah punya akun?',
    signupForm: 'Daftar',

    typeInEmail: 'Ketik email Anda dan kami akan mengirimkan tautan untuk mereset kata sandi Anda',
    sendResetEmail: 'Kirim email reset',
    sending: 'Mengirim...',
    checkYourEmail: 'Periksa Email Anda',
    passwordResetInstructionsSent: 'Instruksi reset kata sandi telah dikirim',
    resetEmailSentInfo: 'Jika Anda mendaftar menggunakan email dan kata sandi, Anda akan menerima email reset kata sandi.',

    //Profile Form Section
    info: 'Silahkan isi dan lengkapi data diri anda',
    userProfile: 'Profil Pengguna',
    chooseAvatar: 'Pilih Avatar',
    uploadPhoto: 'Unggah Foto',
    fullName: 'Nama Lengkap',
    enterFullName: 'Masukkan nama lengkap',
    firstName: 'Nama Depan',
    lastName: 'Nama Belakang',
    gender: 'Jenis Kelamin',
    address: 'Alamat',
    role: 'Peran',
  },
};

export const defaultLocale: Locale = 'en';

export function getTranslations(locale: Locale = defaultLocale) {
  return translations[locale];
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getTranslation(key: string, locale: Locale = defaultLocale): string {
  const keys = key.split('.');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let current: any = translations[locale];
  
  for (const k of keys) {
    if (current && typeof current === 'object' && current[k] !== undefined) {
      current = current[k];
    } else {
      return key; // Return the key if translation is not found
    }
  }
  
  // Handle the case where the final value is an array or object
  if (Array.isArray(current)) {
    // If it's an array, return the first element if it's a string, or convert to string
    if (current.length > 0 && typeof current[0] === 'string') {
      return current[0];
    }
    return current.toString();
  } else if (typeof current === 'object') {
    return key; // Return the key if it's still an object at the end
  }
  
  return typeof current === 'string' ? current : String(current);
}