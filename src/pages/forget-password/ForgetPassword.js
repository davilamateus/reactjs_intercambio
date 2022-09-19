import {useParams} from 'react-router-dom'
import Api from '../../axios/Axios'
import { useState, useEffect } from 'react'
import './forget-password.css'
import Messages from '../../components/messages/Messages'




const ForgetPassword = () => {
    const [message, setMessage] = useState({}) 

    
    const {token} = useParams()

   
        const [loginPassword2, setLoginPassword2 ] = useState('password')
        const [loginPassword3, setLoginPassword3 ] = useState('password')
        const [passwordCreateValue, setPasswordCreateValue] = useState('')
        const [require, setRequire]=useState(false)
        const [require2, setRequire2]=useState(false)
        const [passwordOk, setPasswordOk] = useState(false)
        const [createPasswordValue, setCreatePasswordValue] = useState(null)
        const [samePassword, setSamePassword] = useState(false)

        const [remember, setRemember] = useState(true)
    
    
        // useStates Requirements 
        const [min, setMin] = useState(false)
        const [upper, setUpper] = useState(false)
        const [lower, setLower] = useState(false)
        const [number, setNumber] = useState(false)

    
        function passwordCreateChange(value){
            setPasswordCreateValue(value)
            
            if (value.search(/[a-z]/) >= 0) {setLower(true)} else{setLower(false)}
            if(value.search(/[A-Z]/) >= 0) {setUpper(true)} else{setUpper(false)}
            if (value.search(/[0-9]/) >= 0) {setNumber(true)} else{setNumber(false)}
            if (value.length >= 8) {setMin(true)} else{setMin(false)}
            if(lower === true && upper ===true && number === true && min === true){setPasswordOk(true)}else{setPasswordOk(false)}    
    
        }
    
   

 
    useEffect(()=>{
        if(passwordCreateValue == createPasswordValue){
            setSamePassword(true)
        } else{
            setSamePassword(false)        
        }
    },[ passwordCreateValue, createPasswordValue])

    async function createUser(){
        const customConfig = {
            headers: {
            'Content-Type': 'application/json'
            }
        };

        await Api.post(`/user/forget-password`,{token:token,password:createPasswordValue},customConfig)
            .then((res)=>{

                if(res.status === 200){
                    setMessage({title:'Senha alterada!', text:'Senha alterada com sucesso, você sera redirecionado para a página de login.',status:'success', action:'Ok'})
                    setTimeout(() => {
                        window.location.href = '/login'
            
                    }, 3000);
                }
                console.log(res)
            })

        
    }

    function closeMessage(){


    }


  return (
    <>
        {message.title !== undefined  ? 
    <Messages title={message.title} text={message.text} action={message.action} status={message.status} closeMessage={closeMessage}/> : ''}
 
    <div className='forget-password-page'>
        <img className='person-img' src='./../../../img/3dperson3.png' alt="3D Person" />
        <form onClick={(e)=>e.preventDefault()} >
             <h3>Redefinindo a senha.</h3>
            <p className='forget-description'>Digite uma nova senha.</p>
            <hr />
        <label>
                    <h5>Nova senha:</h5>
                    <input 
                    type={loginPassword2} 
                    placeholder='*******'
                    onFocus={()=>{setRequire(true)}} 
                    onBlur={()=>{setRequire(false)}}
                    onChange={(e)=>{passwordCreateChange(e.target.value)}}
                    />
                    <img
                    className='password-eyes'
                    onMouseOver={()=>{setLoginPassword2('text')}} 
                    onMouseLeave={()=>{setLoginPassword2('password')}}
                    src="../../../img/icons/eyes.svg" 
                    alt="Ver Password" />
                    <div className={`require-password ${require === false ? 'opacityNone':''}`}>
                        <p className={min == true? 'require-password-sucess':''}>Minimo 8 caracteres.</p>
                        <p className={upper == true? 'require-password-sucess':''}>Letra maiúscula</p>
                        <p className={lower == true? 'require-password-sucess':''}>Letra minúscula</p>
                        <p className={number == true? 'require-password-sucess':''}>Número</p>
                    </div>
                </label>
                <label>
                    <h5>Confirme a senha:</h5>
                    <input 
                    type={loginPassword3} 
                    placeholder='*******'
                    onFocus={()=>{setRequire2(true)}} 
                    onBlur={()=>{setRequire2(false)}}
                    onChange={(e)=>{setCreatePasswordValue(e.target.value)
                                    }}
                    />
                    
                    <img
                    className='password-eyes'
                    onMouseOver={()=>{setLoginPassword3('text')}} 
                    onMouseLeave={()=>{setLoginPassword3('password')}}
                    src="../../../img/icons/eyes.svg" 
                    alt="Ver Password" />
                    <div className={`require-password confirm-password ${require2 === false ? 'opacityNone':''}`}>
                        <p className={samePassword === true? 'require-password-sucess':''}>A senhas devem ser iguais.</p>

                    </div>
                </label>

                <button onClick={samePassword==true? ()=>{createUser()}:null} className={`btn-success ${samePassword==true? '':'btn-inative'}`}>Cadatrar</button>
        </form>
       <a href="/">
            <img className='logo' src="../../../img/logocompleta.png" alt="Logo Yet" />
        </a> 
    </div>
    </>
  )
}

export default ForgetPassword