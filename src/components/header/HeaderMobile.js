import { useEffect, useState } from 'react'
import './header.css'
import { Link, useNavigate } from 'react-router-dom'

const HeaderMobile = () => {

    const [pageActived, setPageActive] = useState('')


    useEffect(() => {
        setPageActive(window.location.pathname.split('/')[1])

    }, [useNavigate()])

    return (
        <div className='header-page-mobile'>
            <div className="menu">
                <Link className={pageActived === '' ? 'active' : ''}to={'/'}>
                    <div >
                        <img src="./../../../img/icons/home.svg" alt="Home" />
                    </div>
                        <p>Home</p>
                </Link>
                <Link className={pageActived === 'blog' ? 'active' : ''} to={'/blog'}>
                    <div >
                        <img src="./../../../img/icons/newspaper.svg" alt="Blog" />

                    </div>
                    <p>Blog</p>
                </Link>
                <Link className={pageActived === 'listadetarefas' ? 'active' : ''} to={'/listadetarefas'}>
                    <div >
                        <img src="./../../../img/icons/check.svg" alt="Lista de Tarefas" />

                    </div>
                    <p>Lista de Tarefas</p>
                </Link>
                <Link className={pageActived === 'financeiro' ? 'active' : ''} to={'/financeiro'}>
                    <div >
                        <img src="./../../../img/icons/piggy-bank.svg" alt="Financeiro" />

                    </div>
                    <p>Controle de Gastos</p>
                </Link>
                <Link className={pageActived === 'cotacao' ? 'active' : ''} to={'/cotacao'}>
                    <div  >
                        <img src="./../../../img/icons/Imagem 5.svg" alt="Cotação" />

                    </div >
                    <p>Cotação do Câmbio</p>
                </Link>
                <Link className={pageActived === 'minhaconta' ? 'active' : ''} to={'/minhaconta'}>
                    <div >
                        <img src="./../../../img/icons/user.svg" alt="Minha conta" />

                    </div>
                    <p>Minha Conta</p>
                </Link>
            </div>

        </div>
    )
}

export default HeaderMobile