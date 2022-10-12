import {useState, useEffect} from 'react'
import './forgetPassword.css'
import Api from '../../axios/Axios'
import Messages from '../messages/Messages'

const ForgetPassword = ({closeMessage}) => {
    const [animation,setAnimation] = useState('')
    const [bgAnimation,setBgAnimation] = useState('')
    const [emailValue ,setEmailValue] = useState(null)
    const [reqStatu,setReqStatus] = useState(false)

    async function forgetPassword(){
        console.log(emailValue)
        const customConfig = {
            headers: {
            'Content-Type': 'application/json'
            }
        };

        await Api.post('/user/forget-password/add', {email:emailValue}, customConfig)
            .then((data)=>{

                if(data.status == 200){
                    setReqStatus(true)

                }
                console.log(data)
            })

    

        //
    }


    useEffect(()=>{
            setTimeout(() => {
                setAnimation('forget-box-animation')
                setBgAnimation('forget-bg-animation')
                
            }, 10);
    },[])
  return (
    <>
  
        
        <div className='forget-page'>
        <div className={`forget-page-bg ${bgAnimation}`} onClick={()=>{closeMessage()}}></div>
        <div className={`forget-box ${animation}`}  >
            {reqStatu === false ? <>
            <h3>Esqueci a senha.</h3>
            <p>Digite o seu endereço de email que enviaremos um link com a página para a redefinição de senha.</p>
            <label>
                <h5>Email:</h5>
                <input  onChange={(e)=>{setEmailValue(e.target.value)}} type="text" placeholder='exemplo@gmail.com' />
                <button
                className={`btn-success space-button`}
                onClick={()=>{forgetPassword()}}>Enviar</button>

            </label>
            </>:<>
            
            <h3>Email enviado.</h3>
            <p>Enviamos um email com as informçaões para auteração da senha:.</p>
                <button
                className={`btn-success space-button`}
                onClick={()=>{closeMessage()}}>Fechar</button>
            </>}
        </div>

    </div>
</>
  )
}

export default ForgetPassword