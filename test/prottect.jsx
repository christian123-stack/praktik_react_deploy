import {Navigate} from 'react-router-dom' // navigate berfungsi mengalihkan ke halaman dalam kondisi render
export default function Protect({children}){ // parameter children disini berfungsi untuk membungkus semua komponen yang ada di protect route nantinya di app.jsx

const login = sessionStorage.getItem('loginn')

  if(!login){
 return  <Navigate to="/login" replace /> // jika kondisi tidak terpenuhi maka akan diarahkan ke halaman login
} return children // jika kondisi terpenuhi pergi ke path berikutnya yang sudah dibungkus tadi

}

