import { useEffect, useState } from "react";

function Penghitung(){
    const [mobil, setMobil] = useState(0)
    const [motor, setMotor] = useState(0)
    const [text,setText] = useState(0)
    const [angka,setAngka] = useState(0)

return(
    <div>
        <div id='judul' style={{fontSize:'24px'}}>
            <h3 style={{marginLeft:'-820px'}}>Penghitung Kendaraan</h3>
            <p style={{marginLeft:'-535px'}}>Pencatatan Volume Lalu Lintas / Parkir (Mobil & Motor)</p>
        </div>
        <div>
            <div id='total' style={{position:'absolute', zIndex:'99',marginLeft:'750px', marginTop:'-75px',display:'flex',height:'50px',fontSize:'20px'}}>
                <p>Total Kendaraan</p> 
                <div style={{position:'absolute',zIndex:'99',marginTop:'35px'}}>
                <p style={{marginLeft:'50px'}}>{angka}</p> </div>
            </div>
             <button style={{marginLeft:'410px', backgroundColor:'rgba(183, 81, 81, 0.27)', borderColor:'red', color:'red', width:'135px', height:'45px' , borderRadius:'20px', position:'absolute', zIndex:'100', marginTop:'-65px'}}>Reset semua</button>
        </div>

        <hr></hr>
        <div id='perhitungan' style={{backgroundColor:'rgb(211, 149, 209)', width:'450px', position:'absolute',zIndex:'105px',height:'400px',borderRadius:'10px'}}>
            <h3 style={{marginLeft:'-375px',marginTop:'-3px'}}>Mobil</h3>
            <h5 style={{marginLeft:'-306px',marginTop:'-12px'}}>Kendaraan Roda 4</h5>
            <div style={{backgroundColor:'white', borderRadius:'20px',marginTop:'20px',height:'200px',width:'400px', marginLeft:'25px'}}>
               <div>
            <h5 style={{fontSize:'120px',marginTop:'60px',position:'absolute',zIndex:'106',justifyContent:'center',width:'400px'}}>{angka}</h5>
               </div>
                <div style={{marginTop:'130px',position:'absolute',zIndex:'106',justifyContent:'center',width:'400px',fontSize:'22px'}}>
                <h3> unit mobil</h3>
                </div>
            </div>
            <div style={{ position:'absolute',zIndex:'107px', marginLeft:'25px', marginTop:'12px'}}>
                <button disabled={angka==0} id='btn' style={{backgroundColor:'white', fontSize:'35px', width:'45px',borderRadius:'11px',marginLeft:'7px'}} onClick={() =>{
                    setAngka(angka-1)
                  
                }} >-</button>
                <button disabled={angka==10} type="button" style={{backgroundColor:'white', fontSize:'35px', width:'305px',borderRadius:'11px', marginTop:'-50px', marginLeft:'35px'}} 
                onClick={() =>{
                    setAngka(angka + 1)
                
                }}>+ Tambah Mobil</button>
            </div>
        <div style={{backgroundColor:'red', position:'absolute', zIndex:109, display:'flex', marginLeft:'460px', width:'590px',marginTop:'-272px', borderRadius:'10px',height:'400px'}}>
            <h3 style={{marginLeft:'10px',marginTop:'2px'}}>Motor</h3>
            <h5 style={{marginLeft:'-55px',fontSize:'16px'}}>Kendaraan Roda 2</h5>
        <div style={{backgroundColor:'white', position:'absolute', zIndex:'110',width:'540px', marginTop:'75px',height:'200px', marginLeft:'25px',borderRadius:'10px'}}>
            <p style={{fontSize:'104px', marginTop:'55px'}}>0</p>
        <h4 style={{fontSize:'33px',marginTop:'76px'}}> unit motor</h4>
        </div>
        </div>
        </div>

    </div>

)}
export default Penghitung