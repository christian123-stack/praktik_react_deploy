import { useState } from "react";

function Data (){
    const [umur, setUmur] = useState(0)
    const [nama, setNama] = useState('')


    var [nama1,setNama1] = useState('')
    var [umur1, setUmur1] = useState(0)


    var hasil = ()=>{
     
      setNama1(nama)
      setUmur1(Number(umur))
      sessionStorage.setItem('savedNama',nama)
    }

return(
    <div style={{display:'flex', flexDirection:'column',width:'100%', alignItems:'center', gap:'4px'}}>
        <input style={{width:'45%', height:'24px'}} placeholder="nama" onChange={(e) => setNama(e.target.value)}></input>
        <input style={{width:'45%', height:'24px'}} placeholder="umur" onChange={(e) => setUmur(e.target.value)}></input>
        <button style={{width:'25%', height:'20px'}} onClick={hasil}
        >OK</button>
         <p>nama kamu : {nama1} </p>
        <p>umur kamu : {umur1}</p>
    </div>
)
}
export default Data