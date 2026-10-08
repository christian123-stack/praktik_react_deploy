import { useState } from "react";

function Heart(){
const [nama,setNama] = useState(sessionStorage.getItem('saved')||'') // getItem mengambil data yang sudah disimpan 
const [nama1,setNama1] = useState(sessionStorage.getItem('saved')||'')

var tombol = ()=>{
    setNama1(nama)
    sessionStorage.setItem('saved',nama) // setItem menyimpan data 
    
}
return(
    <div>
        <input placeholder="nama" onChange={(e) =>setNama(e.target.value)}></input>
        <button onClick={tombol}>Ok</button>
    
        <p>nama kamu {nama1}</p>
    </div>
)
}
export default Heart