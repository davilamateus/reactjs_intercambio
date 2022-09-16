import {useParams} from 'react-router-dom'
import Api from '../../axios/Axios'
import { useState, useEffect } from 'react'
import './confirmEmail.css'



const ConfirmEmail = () => {

    const [emailValided, setEmailValided] = useState(false)
    
    const {token} = useParams()
    useEffect(()=>{
        setTimeout(() => {
            window.location.href = '/login'
            
        }, 5000);
        async function loadToken(){
            const customConfig = {
                headers: {
                    'Content-Type': 'application/json'
                }
            };
            const res = await Api.get(`/email/email-confirm/${token}`,customConfig).then((data)=>{
                console.log(data.status)
                if(data.status === 200){{
                    setEmailValided(true)
                }}
            })
        }
        setTimeout(() => {
            console.log(token)
            loadToken()
            
        }, 1000);
    },[])




  return (
    <div className='confirm-email-page'>
        <img src="../../../img/3dperson2.png" alt="Imagen Person 3D" />
        <div className="message-confirmEmail">
            <h2>{emailValided === true? 'Oba! O seu email foi confirmado.':'Ops! Ocorreu algum erro!'}</h2>
            <p>{emailValided === true? 'Seu email foi confirmado e você será redirecionado para a página de login em 5 segundos!':
            'Ocorreu algum erro com a validação e você será redirecionado para a página de login em 5 segundos!'}</p>
        </div>
    </div>
  )
}

export default ConfirmEmail