import { useState } from 'react';

function Login(){
  const [nama, setNama] = useState('');
  const [password, setPassword] = useState('');
  const [statusAnimasi, setStatusAnimasi] = useState('idle');
  const [text, setText] = useState(false);
  const [isErrorShake, setIsErrorShake] = useState(false); // State animasi tambahan untuk getar saat salah
  const [tulis, setTulis] = useState('Masuk');

  // Mengatur URL Giphy berdasarkan kondisi/status animasi
  const getAnimasiUrl = () => {
    switch (statusAnimasi) {
      case 'typing': 
        return 'https://media.giphy.com/media/JIX9t2j0ZTN9S/giphy.gif'; // Animasi ngetik
      case 'password': 
        return 'https://i.giphy.com/media/KBh2mjXyQaZO/giphy.gif'; // Animasi tutup mata
      case 'success': 
        return 'https://media.giphy.com/media/sdyQm2V3Mc2x2A4Sr3/giphy.gif'; // Animasi sukses
      case 'error': 
        return 'https://media.giphy.com/media/nR4L10XlJcSeQ/giphy.gif'; // Animasi saat salah/gagal
      default: 
        return 'https://media.giphy.com/media/dw2jpsey5a5I4/giphy.gif'; // Animasi default (idle)
    }
  };

  return (
    <>
      <style>{`
        /* Animasi melayang halus untuk card container */
        @keyframes floatCard {
          0% { transform: translateY(0px); }
          100% { transform: translateY(-10px); }
        }

        /* Animasi getar (shake) ketika login salah */
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20%, 60% { transform: translateX(-8px); }
          40%, 80% { transform: translateX(8px); }
        }

        .shake-animation {
          animation: shake 0.4s ease-in-out !important;
        }

        /* Efek fokus input yang menyala lembut */
        input:focus {
          border-color: #38bdf8 !important;
          box-shadow: 0 0 15px rgba(56, 189, 248, 0.4);
          outline: none;
        }
      `}</style>

      {/* Background dengan gradasi modern yang estetik */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh', 
        gap: '30px', 
        background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #0f172a 100%)',
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
      }}>
        
        {/* ================= KOTAK ANIMASI GIPHY DI SEBELAH KIRI ================= */}
        <div style={{
          width: '320px', 
          height: '460px', 
          backgroundColor: 'rgba(30, 41, 59, 0.7)', 
          backdropFilter: 'blur(12px)',
          borderRadius: '20px', 
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center', 
          justifyContent: 'center',
          boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
          border: '1px solid rgba(56, 189, 248, 0.3)',
          animation: 'floatCard 4s ease-in-out infinite alternate'
        }}>
          <img 
            src={getAnimasiUrl()} 
            alt="Animasi Interaktif" 
            style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
          />
        </div>


        {/* ================= KOTAK LOGIN UTAMA ================= */}
        <div className={isErrorShake ? 'shake-animation' : ''} style={{
          width: "350px", 
          height: "460px", 
          background: 'linear-gradient(145deg, #1e293b, #0f172a)',
          borderRadius: '20px',  
          boxShadow: '0 20px 40px rgba(0,0,0,0.6)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          animation: 'floatCard 4s ease-in-out infinite alternate-reverse',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '20px',
          boxSizing: 'border-box'
        }}>
          
          <div style={{ marginTop: '10px', textAlign: 'center' }}>
            <h2 style={{ color: '#f8fafc', margin: '0', fontSize: '32px', fontWeight: '700', letterSpacing: '1px' }}>Selamat Datang</h2>
            <p style={{ color: '#94a3b8', fontSize: '14px', marginTop: '5px' }}>Silakan masuk ke akun Anda</p>
          </div>
          
          {/* Input Username */}
          <div style={{ width: '100%', marginTop: '30px', display: 'flex', justifyContent: 'center' }}>
            <input 
              style={{
                color: '#f8fafc', 
                width: '85%', 
                padding: '0 15px', 
                height: '48px', 
                borderRadius: '12px', 
                fontSize: '16px', 
                backgroundColor: 'rgba(15, 23, 42, 0.8)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                transition: 'all 0.3s ease'
              }} 
              type='text' 
              placeholder='Username' 
              value={nama} 
              onChange={(e) => setNama(e.target.value)} 
              onFocus={() => setStatusAnimasi('typing')}
              onBlur={() => setStatusAnimasi('idle')}
            />
          </div>
          
          {/* Input Password */}
          <div style={{ width: '100%', marginTop: '15px', display: 'flex', justifyContent: 'center' }}>
            <input 
              style={{
                color: '#f8fafc', 
                width: '85%', 
                padding: '0 15px', 
                height: '48px', 
                borderRadius: '12px', 
                fontSize: '16px', 
                backgroundColor: 'rgba(15, 23, 42, 0.8)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                transition: 'all 0.3s ease'
              }} 
              type="password" 
              placeholder='Password' 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              onFocus={() => setStatusAnimasi('password')}
              onBlur={() => setStatusAnimasi('idle')}
            />
          </div>
          
          {/* Tombol Login */}
          <div style={{ width: '100%', marginTop: '25px', display: 'flex', justifyContent: 'center' }}>
            <button 
              style={{
                color: '#ffffff', 
                width: '85%', 
                height: '48px', 
                borderRadius: '12px', 
                fontSize: '16px', 
                fontWeight: '600',
                background: 'linear-gradient(135deg, #38bdf8 0%, #0369a1 100%)',
                border: 'none',
                cursor: 'pointer',
                boxShadow: '0 4px 15px rgba(56, 189, 248, 0.3)',
                transition: 'transform 0.2s ease, opacity 0.2s ease'
              }} 
              onMouseEnter={(e) => e.target.style.opacity = '0.9'}
              onMouseOut={(e) => e.target.style.opacity = '1'}
              type='submit' 
              onClick={() => {
                if (nama === 'admin' && password === '123'){
                  setText(false);
                  setStatusAnimasi('success');
                  setTulis('Berhasil 🎉');
                  setIsErrorShake(false);
                  sessionStorage.setItem('loginn', true);
                  setTimeout(() => alert('Login berhasil!'), 200);
                } else {
                  setText(true);
                  setStatusAnimasi('error');
                  setTulis('Coba Lagi');
                  setIsErrorShake(true);
                  // Reset animasi getar setelah 400ms agar bisa bergetar lagi jika diklik salah berkali-kali
                  setTimeout(() => setIsErrorShake(false), 400);
                }
              }}
            >
              {tulis}
            </button>
          </div>
          
          {/* Pesan Error */}
          {text && (
            <div style={{ marginTop: '15px', animation: 'fadeIn 0.3s' }}>
              <span style={{ color: '#f87171', fontSize: '13px', fontWeight: '500' }}>
                ⚠️ Username atau password salah!
              </span>
            </div>
          )}
        </div>

      </div>
    </>
  );
}

export default Login;