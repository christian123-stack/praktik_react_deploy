 import {useNavigate}  from 'react-router-dom' 
 export default function Home(){
    const navigate = useNavigate();
    return(
        <div>
            <h2>ini adalah home</h2>
            <h5>your experience has been started</h5>
            <button onClick={() => {
                sessionStorage.removeItem('loginn'); // Menghapus status login dari sessionStorage
                window.location.href = '/login'; // Mengarahkan pengguna kembali ke halaman login
            }}>logout</button>

            <button style={{margin: '10px'}} onClick={() =>{
                navigate('/belanja')
            }}
            >belanja</button>
        </div>
    )
}

function Kontak(){
    return(
        <div>
            <h3>please contact us</h3>
            <a href='https://youtu.be/AbPED9bisSc?si=m8zid2QYGlQ3Rmfw'>klik me</a>
        </div>
    )
}

