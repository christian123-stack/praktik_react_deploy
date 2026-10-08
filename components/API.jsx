import {useState, useEffect} from 'react'

function Aqua(){
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState(null)
    const [error, setError] = useState('')

    const Key = '63a0eda92d02fd100a3f6f93e8ceed32'

    useEffect(() =>{
    const fetchData = async () =>{
  try{
        const response = await fetch(`https://webapi.bps.go.id/v1/api/list/model/data/lang/ind/domain/1200/var/188/th/124/key/${Key}`)
        if (!response.ok){
            throw new Error ('gagal memuat data')
        } 
 const hasil = await response.json()
 setData(hasil)
    } catch (err){
    setError(err.message)
    }  
finally{
    setLoading(false)
}
}
fetchData()
},[]) 

if (loading) return <h2>Loading....</h2>
if (error) return <h3>{`${error}`}</h3>
return (
    <div>
        <h2>Data bps :</h2>
<p>{JSON.stringify(data)}</p>
    </div>
)}
export default Aqua 