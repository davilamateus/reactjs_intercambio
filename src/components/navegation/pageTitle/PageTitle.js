import {useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
const PageTitle = () => {

  const [pageActived, setPageActive] = useState('')
  const [pageTitle, setPageTitle ] = useState('')


  useEffect(()=>{
      setPageActive(window.location.pathname.split('/')[1])  
    },[useNavigate()])

  useEffect(()=>{
    if(pageActived == ''){
      setPageTitle('Dashboard')
    } else if(pageActived =='blog'){
      setPageTitle('Blog')
    }
    else if(pageActived =='listadetarefas'){
      setPageTitle('Lista de Tarefas')
    }
    else if(pageActived =='financeiro'){
      setPageTitle('Financeiro')
    }
    else if(pageActived =='cotacao'){
      setPageTitle('Cotação')
    }
    else if(pageActived =='idioma'){
      setPageTitle('Treine o idioma')
    }
    else if(pageActived =='minhaconta'){
      setPageTitle('Minha Conta')
    }
  },[pageActived])

    

  return (
    <div>
      <h4>{pageTitle}</h4>
    </div>
  )
}

export default PageTitle