import LoginComponent from '../../components/login/LoginComponent';
import './login.css';


const Login = () => {


  return (
    <div className='login-div'>
        <div className='login-div-left'>
            <div className='login-left-top'>
                <img className='login-left-text' src="./../../img/frase.png" alt="You can live your dreans!" />
                <img className='login-left-text-mobile' src="./../../img/frasemobile.png" alt="You can live your dreans!" />
                <img className='login-3dperson' src="./../../img/3dperson.png" alt="Personagem 3D" />
            </div>
            <div className='login-left-logo'>
                 <img className='login-logo' src="./../../img/logocompleta.png" alt="Logo YET Planeje o seu intercâmbio." />
            </div>
        </div>
        <div className='login-div-right'>
            <LoginComponent/>
        </div>
    </div>
  )
}

export default Login;