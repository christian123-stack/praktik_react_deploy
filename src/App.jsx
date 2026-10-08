import React, { useState, useEffect } from "react";

export default function App() {
  const [isStoreOpen, setIsStoreOpen] = useState(false);
  const [isNightMode, setIsNightMode] = useState(false);
  const [activeTab, setActiveTab] = useState("barista"); // 'barista' atau 'customer'
  const [isTyping, setIsTyping] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [typingTimeout, setTypingTimeout] = useState(null);

  // State Simulasi Penyeduhan Kopi
  const [isBrewing, setIsBrewing] = useState(false);
  const [coffeeLevel, setCoffeeLevel] = useState(75); // Persentase isi cangkir (0 - 85)
  const [coffeeType, setCoffeeType] = useState("Espresso Gula Aren");

  // State Form
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    favoriteDrink: "Espresso Gula Aren",
    rememberMe: true,
  });

  const [notification, setNotification] = useState("");

  // Warna cairan berdasarkan tipe kopi
  const coffeeColors = {
    "Espresso Gula Aren": "#5c2c16",
    "Latte Senja Soft": "#a06f47",
    "Cappuccino Hangat": "#8d5028",
    "Americano Pagi": "#361b0d",
    "Matcha Cream Latte": "#4a7c59",
  };

  const handleTyping = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    setIsTyping(true);
    if (typingTimeout) clearTimeout(typingTimeout);

    const timeout = setTimeout(() => {
      setIsTyping(false);
    }, 1200);

    setTypingTimeout(timeout);
  };

  const handleBrewCoffee = () => {
    if (isBrewing) return;
    setIsBrewing(true);
    setCoffeeLevel(0);

    setTimeout(() => {
      let current = 0;
      const interval = setInterval(() => {
        current += 5;
        setCoffeeLevel(current);
        if (current >= 75) {
          clearInterval(interval);
          setIsBrewing(false);
          showNotif("✨ Kopi hangat berhasil diseduh khusus untukmu!");
        }
      }, 80);
    }, 600);
  };

  const showNotif = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(""), 4000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (activeTab === "barista") {
      showNotif(`☕ Selamat bertugas Barista! Mengalihkan ke Dashboard...`);
    } else {
      showNotif(`🎟️ Kartu Member berhasil dibuat untuk ${formData.name || 'Pelanggan'}! Free 1 Stempel Kopi!`);
    }
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-700 font-sans flex flex-col justify-center items-center p-4 sm:p-6 ${
        isNightMode ? "bg-slate-950 text-amber-50" : "bg-amber-50/80 text-amber-950"
      }`}
    >
      {/* Inject Style Animasi Kopi Khusus */}
      <style>{`
        @keyframes floatSteam {
          0% { transform: translateY(0) scaleX(1); opacity: 0.2; }
          50% { transform: translateY(-18px) scaleX(1.3); opacity: 0.8; }
          100% { transform: translateY(-38px) scaleX(1.6); opacity: 0; }
        }
        @keyframes wave {
          0%, 100% { transform: translateX(-50%) rotate(0deg); }
          50% { transform: translateX(-48%) rotate(6deg); }
        }
        @keyframes coffeePour {
          0% { height: 0%; opacity: 0; }
          20% { height: 100%; opacity: 1; }
          80% { height: 100%; opacity: 1; }
          100% { height: 0%; opacity: 0; }
        }
        .animate-steam-1 { animation: floatSteam 2.5s infinite ease-in-out; }
        .animate-steam-2 { animation: floatSteam 2.1s infinite ease-in-out 0.4s; }
        .animate-steam-3 { animation: floatSteam 2.8s infinite ease-in-out 0.8s; }
        .animate-steam-fast { animation-duration: 1.1s !important; }
        .wave-layer { animation: wave 4s infinite linear; }
        .pour-stream { animation: coffeePour 1.8s ease-in-out forwards; }
      `}</style>

      {/* Pop-up Notifikasi Toast */}
      {notification && (
        <div className="fixed top-6 z-50 bg-amber-900 text-amber-100 px-6 py-3 rounded-full shadow-2xl border border-amber-500/40 animate-bounce text-sm font-medium flex items-center gap-2">
          <span>☕</span>
          <span>{notification}</span>
        </div>
      )}

      {/* Container Utama */}
      <div className="w-full max-w-4xl bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md rounded-3xl shadow-2xl overflow-hidden border border-amber-200/50 dark:border-amber-900/30 grid grid-cols-1 md:grid-cols-12 min-h-[620px]">
        
        {/* ================= SIS KIRI: ANIMASI CANGKIR KOPI INTERAKTIF ================= */}
        <div className="md:col-span-5 bg-gradient-to-br from-amber-800 via-amber-900 to-amber-950 p-8 flex flex-col justify-between items-center text-amber-100 relative overflow-hidden">
          
          {/* Header Sisi Kiri */}
          <div className="w-full flex justify-between items-center z-10">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-amber-400 animate-ping" />
              <span className="text-xs uppercase tracking-widest text-amber-300 font-semibold">
                {isStoreOpen ? "Kedai Buka" : "Kedai Tutup"}
              </span>
            </div>
            <button
              onClick={() => setIsNightMode(!isNightMode)}
              className="p-2 rounded-full bg-amber-900/60 hover:bg-amber-800 text-amber-200 transition border border-amber-700/50 text-xs flex items-center gap-1"
              title="Ganti Mode Waktu"
            >
              {isNightMode ? "🌙 Malam" : "☀️ Pagi"}
            </button>
          </div>

          {/* AREA UTAMA CANGKIR & EFEK DINGIN/PANAS */}
          <div className="relative my-auto py-8 flex flex-col items-center justify-center z-10">
            
            {/* ALIRAN MENUANG KOPI (POURING STREAM) */}
            {isBrewing && (
              <div className="absolute -top-12 z-30 flex flex-col items-center">
                <div 
                  className="w-2 pour-stream rounded-b-full shadow-lg"
                  style={{ 
                    backgroundColor: coffeeColors[formData.favoriteDrink] || "#5c2c16",
                    boxShadow: '0 0 10px rgba(245, 158, 11, 0.5)' 
                  }}
                />
              </div>
            )}

            {/* KELOMPOK UAP KOPI (REALISTIC STEAM CURVES) */}
            <div className={`relative h-16 w-24 flex justify-center gap-4 transition-all ${isTyping ? "scale-125" : "scale-100"}`}>
              <div className={`w-2 h-10 bg-gradient-to-t from-amber-200/40 to-transparent rounded-full animate-steam-1 ${isTyping ? "animate-steam-fast !from-amber-400/80" : ""}`} />
              <div className={`w-2.5 h-12 bg-gradient-to-t from-amber-100/50 to-transparent rounded-full animate-steam-2 ${isTyping ? "animate-steam-fast !from-amber-300/90" : ""}`} />
              <div className={`w-2 h-9 bg-gradient-to-t from-amber-200/40 to-transparent rounded-full animate-steam-3 ${isTyping ? "animate-steam-fast !from-amber-400/80" : ""}`} />
            </div>

            {/* GLOW AURA BEHIND CUP */}
            <div className={`absolute w-44 h-44 rounded-full bg-amber-500/10 blur-2xl transition-all duration-500 ${isTyping ? "bg-amber-400/30 scale-125" : ""}`} />

            {/* WADAH CANGKIR KOPI (CUP CONTAINER) */}
            <div className="relative w-40 h-32 mt-2">
              {/* Badan Cangkir */}
              <div className="w-full h-full bg-gradient-to-b from-amber-100 via-stone-200 to-stone-300 rounded-b-[50px] rounded-t-lg shadow-2xl relative overflow-hidden border-2 border-stone-200/80 flex flex-col justify-end">
                
                {/* Logo Kedai Kopi di Cangkir */}
                <div className="absolute top-3 left-1/2 -translate-x-1/2 z-20 opacity-40 text-amber-950 font-bold text-[10px] tracking-widest uppercase flex flex-col items-center">
                  <span>SENJA</span>
                  <div className="w-4 h-0.5 bg-amber-900/60 rounded-full my-0.5" />
                </div>

                {/* LIQUID / CAIRAN KOPI BERGELOMBANG */}
                <div 
                  className="w-full transition-all duration-700 relative overflow-hidden"
                  style={{ 
                    height: `${coffeeLevel}%`,
                    backgroundColor: coffeeColors[formData.favoriteDrink] || "#5c2c16"
                  }}
                >
                  {/* Gelombang Permukaan Cairan */}
                  <div 
                    className="wave-layer absolute -top-3 left-0 w-[200%] h-6 opacity-40 rounded-[40%]"
                    style={{ backgroundColor: '#fff' }}
                  />
                  {/* Crema / Busa Kopi di Atas */}
                  <div className="absolute top-0 left-0 right-0 h-1.5 bg-amber-200/30 backdrop-blur-xs" />
                  
                  {/* Gelembung Kecil Mengapung */}
                  <div className="absolute bottom-2 left-4 w-1.5 h-1.5 rounded-full bg-white/20 animate-ping" />
                  <div className="absolute bottom-4 right-6 w-2 h-2 rounded-full bg-white/10 animate-pulse" />
                </div>
              </div>

              {/* Gagang Cangkir */}
              <div className="absolute top-4 -right-5 w-8 h-16 border-4 border-stone-200 rounded-r-2xl border-l-0 shadow-md" />

              {/* Piring Alas Cangkir */}
              <div className="w-52 h-4 bg-gradient-to-r from-stone-400 via-stone-200 to-stone-400 rounded-full shadow-xl -ml-6 mt-1 border-t border-white/50" />
            </div>

            {/* KETERANGAN INTERAKTIF */}
            <div className="mt-8 text-center">
              <h3 className="font-serif text-2xl font-bold text-amber-100">Kopi Ruang Senja</h3>
              <p className="text-xs text-amber-300/80 mt-1 max-w-[220px]">
                {isTyping ? "⚡ Aromanya makin kuat saat kamu mengetik..." : "Aroma hangat diseduh khusus untuk harimu."}
              </p>

              {/* Tombol Seduh Kopi Interaktif */}
              <button
                type="button"
                onClick={handleBrewCoffee}
                disabled={isBrewing}
                className="mt-4 px-4 py-2 bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400/40 rounded-full text-xs text-amber-200 transition-all transform active:scale-95 flex items-center gap-2 mx-auto disabled:opacity-50"
              >
                <span>{isBrewing ? "⌛ Menyeduh..." : "☕ Seduh Kopi Baru"}</span>
              </button>
            </div>
          </div>

          {/* Footer Sisi Kiri */}
          <div className="text-[11px] text-amber-400/60 text-center z-10">
            Formulir Interaktif • React JS & Tailwind
          </div>
        </div>

        {/* ================= SISI KANAN: FORMULIR DENGAN SHUTTER ROLLING DOOR ================= */}
        <div className="md:col-span-7 p-6 sm:p-10 flex flex-col justify-between relative bg-amber-50/30 dark:bg-zinc-900/50">
          
          {/* TAB SELECTION (BARISTA / PELANGGAN) */}
          <div>
            <div className="flex border-b border-amber-200 dark:border-zinc-800 mb-6">
              <button
                type="button"
                onClick={() => setActiveTab("barista")}
                className={`pb-3 px-4 text-sm font-medium transition-all relative ${
                  activeTab === "barista"
                    ? "text-amber-800 dark:text-amber-400 font-bold"
                    : "text-amber-800/50 dark:text-zinc-500 hover:text-amber-800"
                }`}
              >
                🔑 Login Barista
                {activeTab === "barista" && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-700 dark:bg-amber-500 rounded-full" />
                )}
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("customer")}
                className={`pb-3 px-4 text-sm font-medium transition-all relative ${
                  activeTab === "customer"
                    ? "text-amber-800 dark:text-amber-400 font-bold"
                    : "text-amber-800/50 dark:text-zinc-500 hover:text-amber-800"
                }`}
              >
                💳 Kartu Member Baru
                {activeTab === "customer" && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-700 dark:bg-amber-500 rounded-full" />
                )}
              </button>
            </div>

            {/* KONDISI 1: SHUTTER KEDAI MASIH TERTUTUP */}
            {!isStoreOpen ? (
              <div className="py-12 flex flex-col items-center justify-center text-center my-auto">
                <div className="w-20 h-20 bg-amber-100 dark:bg-zinc-800 rounded-full flex items-center justify-center text-3xl shadow-inner mb-4 border border-amber-200 dark:border-zinc-700">
                  🔒
                </div>
                <h3 className="text-xl font-serif font-bold text-amber-950 dark:text-amber-100">
                  Kedai Masih Ditutup
                </h3>
                <p className="text-xs text-amber-800/70 dark:text-zinc-400 max-w-xs mt-2 mb-6">
                  Buka *shutter rolling door* kedai untuk mulai mengisi formulir pesanan & login pagi ini.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setIsStoreOpen(true);
                    showNotif("🚪 Shutter terangkat! Lampu kedai dinyalakan.");
                  }}
                  className="px-6 py-3 bg-gradient-to-r from-amber-700 to-amber-900 hover:from-amber-800 hover:to-amber-950 text-white rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5 active:translate-y-0 text-sm font-semibold flex items-center gap-2"
                >
                  <span>🚪 Buka Shutter Kedai (Mulai)</span>
                </button>
              </div>
            ) : (
              /* KONDISI 2: FORMULIR AKTIF (SHUTTER DIBUKA) */
              <form onSubmit={handleSubmit} className="space-y-4 animate-fadeIn">
                <div className="flex justify-between items-center mb-2">
                  <h2 className="text-2xl font-serif font-bold text-amber-950 dark:text-amber-100">
                    {activeTab === "barista" ? "Masuk Meja Barista" : "Buat Kartu Member"}
                  </h2>
                  <button
                    type="button"
                    onClick={() => setIsStoreOpen(false)}
                    className="text-xs text-amber-800/60 dark:text-zinc-500 hover:underline"
                  >
                    Tutup Kedai
                  </button>
                </div>

                {/* Input Nama (Khusus Tab Member) */}
                {activeTab === "customer" && (
                  <div>
                    <label className="block text-xs font-semibold text-amber-900 dark:text-amber-300 mb-1">
                      Nama Lengkap Pelanggan
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleTyping}
                        placeholder="Contoh: Budi Santoso"
                        required
                        className="w-full px-4 py-2.5 bg-white dark:bg-zinc-800/80 border border-amber-200 dark:border-zinc-700 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none text-sm dark:text-amber-100 transition"
                      />
                      <span className="absolute right-3 top-2.5 text-xs">👤</span>
                    </div>
                  </div>
                )}

                {/* Input Email */}
                <div>
                  <label className="block text-xs font-semibold text-amber-900 dark:text-amber-300 mb-1">
                    Alamat Email (ID Kedai)
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleTyping}
                      placeholder="nama@kopi.com"
                      required
                      className="w-full px-4 py-2.5 bg-white dark:bg-zinc-800/80 border border-amber-200 dark:border-zinc-700 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none text-sm dark:text-amber-100 transition"
                    />
                    <span className="absolute right-3 top-2.5 text-xs">✉️</span>
                  </div>
                </div>

                {/* Input Password */}
                <div>
                  <label className="block text-xs font-semibold text-amber-900 dark:text-amber-300 mb-1">
                    Kata Sandi Rahasia
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleTyping}
                      placeholder="••••••••"
                      required
                      className="w-full px-4 py-2.5 bg-white dark:bg-zinc-800/80 border border-amber-200 dark:border-zinc-700 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none text-sm dark:text-amber-100 transition"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-2.5 text-xs text-amber-700 dark:text-amber-400 hover:font-bold"
                    >
                      {showPassword ? "👁️ Sembunyikan" : "👁️ Lihat"}
                    </button>
                  </div>
                </div>

                {/* Select Pesanan Kopi Favorit (Interaktif Ubah Cairan) */}
                <div>
                  <label className="block text-xs font-semibold text-amber-900 dark:text-amber-300 mb-1">
                    Pesanan Favorit Harian Kamu
                  </label>
                  <select
                    name="favoriteDrink"
                    value={formData.favoriteDrink}
                    onChange={(e) => {
                      handleTyping(e);
                      showNotif(`Racikan cangkir diganti ke ${e.target.value}!`);
                    }}
                    className="w-full px-4 py-2.5 bg-white dark:bg-zinc-800/80 border border-amber-200 dark:border-zinc-700 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none text-sm dark:text-amber-100 transition cursor-pointer"
                  >
                    <option value="Espresso Gula Aren">Espresso Gula Aren (Paling Populer)</option>
                    <option value="Latte Senja Soft">Latte Senja Soft (Gurih & Lembut)</option>
                    <option value="Cappuccino Hangat">Cappuccino Hangat (Busa Tebal)</option>
                    <option value="Americano Pagi">Americano Pagi (Hitam Mantap)</option>
                    <option value="Matcha Cream Latte">Matcha Cream Latte (Spesial Hijau)</option>
                  </select>
                </div>

                {/* Checkbox "Simpan Pesanan Regular" */}
                <div className="flex items-center justify-between text-xs pt-1">
                  <label className="flex items-center gap-2 text-amber-900 dark:text-amber-200 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.rememberMe}
                      onChange={(e) => setFormData({ ...formData, rememberMe: e.target.checked })}
                      className="rounded border-amber-300 text-amber-800 focus:ring-amber-500"
                    />
                    <span>Ingat pesanan harian saya</span>
                  </label>
                  <a href="#lupa" onClick={(e) => { e.preventDefault(); showNotif("Petunjuk telah dikirim ke barista piket!"); }} className="text-amber-700 dark:text-amber-400 hover:underline">
                    Lupa Sandi?
                  </a>
                </div>

                {/* Tombol Submit */}
                <button
                  type="submit"
                  className="w-full py-3 mt-2 bg-gradient-to-r from-amber-800 to-amber-950 hover:from-amber-900 hover:to-black text-amber-100 font-semibold rounded-xl shadow-lg transition duration-200 transform active:scale-[0.99] text-sm flex items-center justify-center gap-2"
                >
                  <span>{activeTab === "barista" ? "☕ Masuk Shift Barista" : "💳 Cetak Kartu Member"}</span>
                </button>
              </form>
            )}
          </div>

          {/* FOOTER INFORMASI TAMBAHAN */}
          <div className="mt-6 pt-4 border-t border-amber-200/60 dark:border-zinc-800 text-center text-xs text-amber-800/60 dark:text-zinc-500">
            {isStoreOpen ? "💡 Tips: Ketik pada kolom formulir untuk mempercepat kepulan uap kopi!" : "Silakan buka toko untuk melihat formulir."}
          </div>

        </div>

      </div>
    </div>
  );
}