import {useState} from 'react'

function Data(){
    const [nilai, setNilai] = useState(sessionStorage.getItem('saved')||'')
    const [text, setText] = useState(sessionStorage.getItem('saved')? true : false)
    const [hasil, setHasil] = useState(sessionStorage.getItem('saved')||'')
    const [agree, setAgree] = useState(sessionStorage.getItem('status')||'')
    const [text2, setText2] = useState(sessionStorage.getItem('status')? true : false)
    const [disable, setDisable] = useState(() => {
    const btn = sessionStorage.getItem('tmbl')
    return btn === 'true'
    })
    const [disagree, setDisagree] = useState(sessionStorage.getItem('status')||'')

    var tombol = ()=>{
        setText2(true)
        setHasil(nilai)
        setDisagree(agree)
        setText(true)
        sessionStorage.setItem('saved',nilai)
        sessionStorage.setItem('status',agree)
        setDisable(true)
        sessionStorage.setItem('tmbl','true')
    }

return(
    <div>
        <fieldset>
            <legend >Name: </legend>
            <input onChange={(e) => setNilai(e.target.value)} ></input>
        </fieldset>
        <form>
        <label>
        <input type='radio' name='status' value='agree' onChange={(e) => setAgree(e.target.value)} />agree</label>
        <label>
        <input type='radio'  name='status' onChange={(e) => setAgree(e.target.value)} value='disagree'/>disagree</label> 
        </form>
    <button disabled={disable} onClick={tombol}
    >Ok</button>
    {text&& text2 && <h6>You are {hasil} and you are {disagree} </h6>}
    </div>
)
}

export default Data