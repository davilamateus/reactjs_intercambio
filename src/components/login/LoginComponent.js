import './loginComponent.css';
import {useState, useEffect} from 'react';
import Api from '../../axios/Axios';
import Messages from '../messages/Messages';
import ForgetPassword from '../forgetPassword/ForgetPassword';


const LoginComponent = () => {
    const [message, setMessage] = useState({});
    const [loginHeader, setLoginHeader ] = useState('login');
    const [loginPasswordType, setLoginPasswordType ] = useState('password');
    const [createPasswordType, setCreatePasswordType ] = useState('password');
    const [confirmPasswordType, setConfirmPasswordType ] = useState('password');
    const [passwordCreateValue, setPasswordCreateValue] = useState('');
    const [name, setName] = useState(null);
    const [require, setRequire]=useState(false);
    const [require2, setRequire2]=useState(false);
    const [remember, setRemember] = useState(true);
    const [forgetStatus, setForgetStatus] = useState(false);
    const [loginEmailValue, setLoginEmailValue] = useState(null);
    const [createEmailValue, setCreateEmailValue] = useState(null);
    const [createPasswordValue, setCreatePasswordValue] = useState(null);
    const [loginPasswordlValue, setLoginPasswordlValue] = useState(null);

    // useStates Requirements 
    const [min, setMin] = useState(false);
    const [upper, setUpper] = useState(false);
    const [lower, setLower] = useState(false);
    const [number, setNumber] = useState(false);
    const [samePassword, setSamePassword] = useState(false);


    function closeMessage(){
        setMessage({});
        setForgetStatus(false);
    }


    // password requires

    function passwordCreateChange(value){
        if (value.search(/[a-z]/) >= 0) {setLower(true)} else{setLower(false)};
        if (value.search(/[A-Z]/) >= 0) {setUpper(true)} else{setUpper(false)};
        if (value.search(/[0-9]/) >= 0) {setNumber(true)} else{setNumber(false)};
        if (value.length >= 8) {setMin(true)} else{setMin(false)};
    }


    useEffect(()=>{
        passwordCreateChange(passwordCreateValue);
        if(passwordCreateValue === createPasswordValue){
            setSamePassword(true);
        } else{
            setSamePassword(false)   ;     
        }
    },[passwordCreateValue, createPasswordValue]);


    function headerChange(value){
        setLoginHeader(value);
    }

    function rememberChange(){
        if(remember === false){setRemember(true);
            } else{ setRemember(false);
                };
    };


    //login Axios

    async function userLogin(){
        const body = {email: loginEmailValue, password:loginPasswordlValue};
        const configs = {headers: {'Content-Type': 'application/json'}};
        Api.post('user/login',body,configs)
            .then((data)=>{
                if(data.status === 202 ||data.status == 204 ){
                    setMessage({
                        title:'Email ou senha errados!', 
                        text:'Tente novamente ou clique em esqueci a senha.',
                        status:'error', 
                        action:'Fechar'
                    });} 
                else if(data.status === 203){
                    confirmEmail()} 
                else if(data.status ===200) {
                      if(remember === true){
                        localStorage.setItem('token',data.data.token);
                        sessionStorage.setItem('token',data.data.token);
                        setTimeout(() => {
                                window.location.href = '/';      
                                    }, 100);
                        } else{
                            sessionStorage.setItem('token',data.data.token);
                            setTimeout(() => {
                                window.location.href = '/';
                            }, 100);
                          sessionStorage.setItem('token',data.data.token);
                }}
        });
    }

    // Email no confimed
    async function confirmEmail(){
        const configs = {headers: {'Content-Type': 'application/json'}};
         Api.post('email/confirm-email',{email:loginEmailValue},configs)
                .then(()=>{                    
                    setMessage({
                    title:'Email não verificado!', 
                    text:'Enviamos novamente um email com o link para verificação, por favor acesse o seu email.',
                    status:'atention', 
                    action:'Fechar'
                })}) 
                .catch((error)=>{
                    console.log(error)
                    setMessage({
                        title:'Error Interno!', 
                        text:'Lamentamos muito mas ocorreu algum erro interno em nosso servidor. Por favor tente mais tarde.',
                        status:'error', 
                        action:'Fechar'
                    })}
                    );
    };

    async function createUser(){
        const body = {email: createEmailValue, password:createPasswordValue, name:name}
        const configs = {headers: {'Content-Type': 'application/json'}};
        await Api.post('/user/add',body,configs)
            .then((data)=>{
                if(data.status === 200){
                    setMessage({
                        title:'Usuário Cadatrado com sucesso!', 
                        text:'Enviamos um email com o link para verificação, por favor acesse o seu email.',
                        status:'success', 
                        action:'Fechar'});
                    confirmEmail();
                }
                else if(data.status === 300){
                    setMessage({
                        title:'Ops! Falta alguma informação.', 
                        text:'Cheque todos os campos e tente novamente.',
                        status:'error', 
                        action:'Fechar'})
                }
                else if(data.status === 202){
                    setMessage({
                        title:'Email ja cadastrado!', 
                        text:'Esse email ja fui cadastrado no nosso sistema.',
                        status:'error', 
                        action:'Fechar'});
                }
            })
            .catch(()=>{
                setMessage({
                    title:'Ops! Falta alguma informação.', 
                    text:'Cheque todos os campos e tente novamente.',
                    status:'error', 
                    action:'Fechar'});
            });
    }

  return (
    <>
         {message.title !== undefined  ? 
            <Messages 
                title={message.title} 
                text={message.text} 
                action={message.action} 
                status={message.status} 
                closeMessage={closeMessage}
                /> 
                : ''}
        <div className={`login-right `}>
            <div className="login-header">
                <button 
                    onClick={()=>{headerChange('login')}} 
                    className={loginHeader === 'login' ? 'login-header-active':''}>
                        <h4>Entrar</h4>
                    </button>
                <button 
                    onClick={()=>{headerChange('singup')}} 
                    className={loginHeader === 'singup' ? 'login-header-active':''}>
                        <h4>Cadastrar</h4>
                    </button>
             </div>
            <div className={`login-form ${loginHeader === 'login'? '':'opacityNone'}`}>
                <p className="login-form-text">Entre com seus dados de acesso.</p>
                <form>
                    <label>
                        <h5>Email:</h5>
                        <input 
                            name='Email-Login'
                            onChange={(e)=>{setLoginEmailValue(e.target.value)}} type="text" 
                            placeholder='exemplo@google.com' />
                    </label>
                    <label>
                        <h5>Senha:</h5>
                        <input 
                            onChange={(e)=>{setLoginPasswordlValue(e.target.value)}} 
                            type={loginPasswordType} 
                            name='password-login'
                            placeholder='*******'/>
                            <img
                            className='password-eyes'
                            onMouseOver={()=>{setLoginPasswordType('text')}} 
                            onMouseLeave={()=>{setLoginPasswordType('password')}}
                            src="../../../img/icons/eyes.svg" 
                            alt="Ver Password" />
                    </label> 
                </form>
                <div className="remember" onClick={()=>{rememberChange()}}>
                    <div className={`remember-btn ${remember === true? 'remember-btn-box-selected':''}`}>
                        <div className={`remember-btn-cicle ${remember === true? 'remember-btn-selected':''}`}></div>
                    </div>
                    <p>Lembrar senha.</p>
                    </div>
                    <button onClick={()=>{userLogin()}} className='btn-success'>Entrar</button>
                    <button  onClick={()=>{setForgetStatus(true)}} className='forgetPassword'>Esqueceu a senha?</button>
            </div>
            <div className={`singup-form ${loginHeader != 'login'? '':'opacityNone'}`}>
                <p className="login-form-text">Preencha com seus dados.</p>
                <form>
                    <label>
                        <h5>Nome Completo:</h5>
                        <input 
                            type="text" 
                            name='nome'
                            placeholder='Pedro da Costa' 
                            id='nome'
                            onChange={(e)=>setName(e.target.value)}
                            />
                    </label>
                    <label>
                        <h5>Email:</h5>
                        <input 
                            type="text" 
                            placeholder='exemplo@google.com' 
                            onChange={(e)=>{setCreateEmailValue(e.target.value) 
                                            setLoginEmailValue(e.target.value)}}
                            />
                    </label>
                    <label>
                        <h5>Senha:</h5>
                        <input 
                            type={createPasswordType} 
                            placeholder='*******'
                            onFocus={()=>{setRequire(true)}} 
                            onBlur={()=>{setRequire(false)}}
                            onChange={(e)=>{setPasswordCreateValue(e.target.value)}}
                            />
                        <img
                            className='password-eyes'
                            onMouseOver={()=>{setCreatePasswordType('text')}} 
                            onMouseLeave={()=>{setCreatePasswordType('password')}}
                            src="../../../img/icons/eyes.svg" 
                            alt="Ver Password" />
                    </label>
                    <div className={`require-password ${require === false ? 'opacityNone':''}`}>
                        <p className={min == true? 'require-password-sucess':''}>Minimo 8 caracteres.</p>
                        <p className={upper == true? 'require-password-sucess':''}>Letra maiúscula</p>
                        <p className={lower == true? 'require-password-sucess':''}>Letra minúscula</p>
                        <p className={number == true? 'require-password-sucess':''}>Número</p>
                    </div>
                    <label>
                        <h5>Confirme a senha:</h5>
                        <input 
                            type={confirmPasswordType} 
                            placeholder='*******'
                            onFocus={()=>{setRequire2(true)}} 
                            onBlur={()=>{setRequire2(false)}}
                            onChange={(e)=>{setCreatePasswordValue(e.target.value)}}
                            />
                        <img
                            className='password-eyes'
                            onMouseOver={()=>{setConfirmPasswordType('text')}} 
                            onMouseLeave={()=>{setConfirmPasswordType('password')}}
                            src="../../../img/icons/eyes.svg" 
                            alt="Ver Password" />
                        <div className={`require-password confirm-password ${require2 === false ? 'opacityNone':''}`}>
                            <p className={samePassword === true? 'require-password-sucess':''}>A senhas devem ser iguais.</p>
                        </div>
                    </label>
                    </form>
                    <button onClick={samePassword==true? ()=>{createUser()}:null} className={`btn-success space-top ${samePassword==true? '':'btn-inative'}`}>Cadatrar</button>
                </div>
                    {forgetStatus === true? <ForgetPassword closeMessage={closeMessage}/> : ''}
        </div> 
    </>
  )
}

export default LoginComponent;