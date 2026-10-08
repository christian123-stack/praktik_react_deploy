import { useState } from "react";

export default function Saran(){

    const [rating, setRating] = useState('');

    const tombol = () =>{
        if(rating == 2 || rating == 1){
            alert('Terima kasih atas saran anda, kami akan memperbaiki pelayanan kami')
        } 
        else if(rating == 3 || rating == 4){
            alert('Terima kasih atas saran anda, hiyahhhh')
        } 
        else if(rating == 5){
            alert('Horay!!! anda puas kami senang')
        } else {
            alert('harap pilih rating dengan benar') 
        } 
    }
    return(
        <div>
        <h3>Berikan rating kepuasaan anda </h3> 
        <div style={{display:'flex', flexDirection:'row', alignItems:'center', justifyContent:'center',gap:'10px'}}>
          
            <p>1</p> <input type='radio' name ='rating' value='1' onChange={(e) => setRating(e.target.value)}></input>
            <p>2</p> <input type='radio' name ='rating' value='2' onChange={(e) => setRating(e.target.value)}></input>
            <p>3</p> <input type='radio' name ='rating' value='3' onChange={(e) => setRating(e.target.value)}></input>
            <p>4</p> <input type='radio' name ='rating' value='4' onChange={(e) => setRating(e.target.value)}></input>
            <p>5</p> <input type='radio' name ='rating' value='5' onChange={(e) => setRating(e.target.value)}></input>
            <button onClick={tombol}>Kirim Rating</button>
        </div>
        </div>
    )
}