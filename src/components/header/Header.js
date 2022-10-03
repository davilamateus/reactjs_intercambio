import {useEffect, useState} from 'react'
import './header.css'
import {Link,useNavigate } from 'react-router-dom'

const Header = () => {

    const [pageActived, setPageActive] = useState('')


    useEffect(()=>{
        setPageActive(window.location.pathname.split('/')[1])
      
      },[useNavigate()])

  return (
    <div className='header-page'>
        <div className="logo-menu">
            <Link to={'/'}>
                <img src="./../../../img/smalllogo.png" alt="Logo" />
            </Link>
        </div>
        <div className="menu">
            <Link className={pageActived === ''? 'active':''} to={'/'}>
                <img src="./../../../img/icons/home.svg" alt="Home" />
            </Link>
            <Link className={pageActived === 'blog'? 'active':''}to={'/blog'}>
                <img src="./../../../img/icons/newspaper.svg" alt="Blog" />
            </Link>
            <Link className={pageActived === 'listadetarefas'? 'active':''} to={'/listadetarefas'}>
                <img src="./../../../img/icons/check.svg" alt="Lista de Tarefas" />
            </Link>
            <Link className={pageActived === 'financeiro'? 'active':''}to={'/financeiro'}>
                <img src="./../../../img/icons/piggy-bank.svg" alt="Financeiro" />
            </Link>
            <Link className={pageActived === 'cotacao'? 'active':''}to={'/cotacao'}>
                <img src="./../../../img/icons/Imagem 5.svg" alt="Cotação" />
            </Link>
            <Link className={pageActived === 'minhaconta'? 'active':''}to={'/minhaconta'}>
                <img src="./../../../img/icons/user.svg" alt="Minha conta" />
            </Link>
        </div>
        <div className="exit">
        <Link to={'/'}>
                <img src="./../../../img/icons/poweroof.svg" alt="Minha conta" />
            </Link>
        </div>
    </div>
  )
}

export default Header