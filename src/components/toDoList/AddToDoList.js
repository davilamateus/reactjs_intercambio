import {useEffect, useState} from 'react'
import './AddToDoList.css'
import Api from '../../axios/Axios' 
import Messages from '../messages/Messages'



const AddToDoList = ({refresh, closeAdd}) => {

    const [category, setCategory] = useState(4) 
    const [status, setStatus] = useState(1) 
    const [title, setTitle] = useState(undefined);
    const [description, setDescription] = useState(undefined);
    const [message, setMessage] = useState({}) 


    function closeMessage(){
        setMessage({})
    }
    const config = {
        headers: { Authorization: `Bearer ${sessionStorage.getItem('token')}` }
    };
    
    async function addToDoList(){

        if( title !== undefined && description !== undefined){
            const body = {status:status, title:title, description:description, category:category}
            await Api.post('/user/todolist/', body, config).then(()=>{   
                refresh()    
                closeAdd()

            })
        } else{
            setMessage({title:'Email não verificado!', text:'Enviamos novamente um email com o link para verificação, por favor acesse o seu email.',status:'atention', action:'Fechar'})

        }

    }


    async function btnEdit(id){
        if( title !== undefined && description !== undefined){
            const body = { id:id,status:status, title:title, description:description, category:category}
            await Api.patch('/user/todolist/', body, config)
        } else{
            setMessage({title:'Email não verificado!', text:'Enviamos novamente um email com o link para verificação, por favor acesse o seu email.',status:'atention', action:'Fechar'})

        }

    }
    

  return (
    <div className='add-todolist-div'>
        <div onClick={()=>{closeAdd()}} className="add-bg-degrade"></div>
            {message.title !== undefined  ? 
             <Messages title={message.title} text={message.text} action={message.action} status={message.status} closeMessage={closeMessage}/> : ''}
        <div className="add-todolist">

            <div className="add-todolist-container">
                <div className="add-todolist-configs">
                    <h5>Titulo</h5>
                    <input onChange={(e)=>{setTitle(e.target.value)}} type="text" placeholder='Digite o titulo da sua tarefa.'/>
                    <h5>Categoria</h5>
                        <select onChange={(e)=>{setCategory(e.target.value)}}>
                            <option  value={4}>Outros</option>
                            <option value={2}>Documentos</option>
                            <option value={3}>Saúde</option>
                            <option value={1}>Compras</option>
                        </select>
                    <h5>Status</h5>
                    <div className="add-todolist-status-btns">
                    <select onChange={(e)=>{setStatus(e.target.value)}}>
                            <option  value={1}>Aberto</option>
                            <option value={2}>Em Progreso</option>
                            <option value={3}>Finalizado</option>
                        </select>
                        </div>
                </div>
                <div className="add-todolist-description">
                    <h5>Descrição</h5>
                <textarea onChange={(e)=>{setDescription(e.target.value)}} placeholder='Digite aqui a descrição da tarefa' cols="0" rows="7"></textarea>
                <button onClick={()=>{addToDoList()}} className='btn-add'>Salvar</button>
                </div>

            </div>
        </div>
    </div>
  )
}

export default AddToDoList