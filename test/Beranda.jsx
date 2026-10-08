import {useNavigate, Link} from 'react-router-dom';


export default function Beranda(){
const navigate = useNavigate() // useNavigate digunakan untuk mengarahkan ke halaman lain
    return(
        <div>
            <h2>selamat datang di web kami</h2>
            <button onClick={() =>{
                navigate('/login') // mengarahkan ke halaman login
            }}>Login</button>
        </div>
    )
}