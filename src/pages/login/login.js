import LoginComponent from '../../components/login/LoginComponent';
import './login.css';


const Login = () => {
  return (
    <div className='login-div container'>
        <div className='login-top'>
            <img className='login-text' src="./../../img/frase.png" alt="You can live your dreans!" />
            <img className='login-3dperson' src="./../../img/3dperson.png" alt="Personagem 3D" />
            <LoginComponent/>
        </div>
        <div className='login-footer'>
            <img className='login-text-mobile' src="./../../img/frase.png" alt="You can live your dreans!" />
            <img className='login-logo' src="./../../img/logocompleta.png" alt="Logo YET Planeje o seu intercâmbio." />
        </div>
    </div>
  )
}

export default Login;