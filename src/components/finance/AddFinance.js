import {useEffect, useState} from 'react'
import './AddFinance.css'
import Api from '../../axios/Axios' 
import Messages from '../messages/Messages'



const AddFinance = ({refresh, closeAdd}) => {

    const [category, setCategory] = useState(4) 
    const [value, setValue] = useState('') 
    const [title, setTitle] = useState(undefined);
    const [description, setDescription] = useState(undefined);
    const [message, setMessage] = useState({}) 


    function closeMessage(){
        setMessage({})
    }
    const config = {
        headers: { Authorization: `Bearer ${sessionStorage.getItem('token')}` }
    };
    
    async function addFinance(){

        if( title !== undefined && value !== undefined){
            const body = {value:value, title:title, category:category}
            await Api.post('/user/finance/', body, config).then(()=>{   
                refresh()    
                closeAdd()

            })
        } else{
            setMessage({title:'Email não verificado!', text:'Enviamos novamente um email com o link para verificação, por favor acesse o seu email.',status:'atention', action:'Fechar'})

        }

    }


    async function btnEdit(id){
        if( title !== undefined && description !== undefined){
            const body = {value:value, title:title, category:category}
            await Api.patch('/user/todolist/', body, config)
        } else{
            setMessage({title:'Email não verificado!', text:'Enviamos novamente um email com o link para verificação, por favor acesse o seu email.',status:'atention', action:'Fechar'})

        }

    }
    

  return (
    <div className='add-finance-div'>

        <div onClick={()=>{closeAdd()}} className="add-bg-degrade"></div>
            {message.title !== undefined  ? 
             <Messages title={message.title} text={message.text} action={message.action} status={message.status} closeMessage={closeMessage}/> : ''}
        <div className="add-finance">
                    <h5>Titulo</h5>
                    <input onChange={(e)=>{setTitle(e.target.value)}} type="text" placeholder='Digite o titulo para o gasto.'/>
                    <h5>Categoria</h5>
                        <select onChange={(e)=>{setCategory(e.target.value)}}>
                            <option  value={5}>Outros</option>
                            <option  value={4}>Documentos</option>
                            <option value={2}>Câmbio</option>
                            <option value={3}>Passagem</option>
                            <option value={1}>Curso</option>
                        </select>
                        <h5>Value</h5>
                    <input onChange={(e)=>{setValue(e.target.value)}} type="number" placeholder='100'/>
                <button onClick={()=>{addFinance()}} className='btn-add'>Salvar</button>

        </div>
    </div>
  )
}

export default AddFinance