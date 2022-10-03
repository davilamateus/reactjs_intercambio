import {useEffect, useState} from 'react'
import './EditToDoList.css'
import Api from '../../axios/Axios' 
import Messages from '../messages/Messages'



const EditToDoList = ({itemId, itemTitle, itemCategory, itemStatus, itemDescription, refresh, closeAdd }) => {

    const [category, setCategory] = useState(undefined) 
    const [status, setStatus] = useState(undefined) 
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState(undefined);
    const [message, setMessage] = useState({}) 


    function closeMessage(){
        setMessage({})
    }


    useEffect(()=>{
        setTitle(itemTitle)
        setCategory(itemCategory)
        setStatus(itemStatus)
        setDescription(itemDescription)
    },[])
    console.log(itemStatus)
    console.log(itemTitle)

    async function btnEdit(){
        if( title !== undefined && description !== undefined){
            const config = {
                headers: { Authorization: `Bearer ${sessionStorage.getItem('token')}` }
            };
            const body = { id:itemId,status:status, title:title, description:description, category:category}
            await Api.patch('/user/todolist/', body, config).then(()=>{
            })
            refresh()
            closeAdd()
        } else{
            setMessage({title:'Email não verificado!', text:'Enviamos novamente um email com o link para verificação, por favor acesse o seu email.',status:'atention', action:'Fechar'})

        }

    }
    

  return (
    <div className='edit-todolist-div'>
        <div onClick={()=>{closeAdd()}} className="edit-bg-degrade"></div>
            {message.title !== undefined  ? 
             <Messages title={message.title} text={message.text} action={message.action} status={message.status} closeMessage={closeMessage}/> : ''}
        <div className="edit-todolist">

            <div className="edit-todolist-container">
                <div className="edit-todolist-configs">
                    <h5>Titulo</h5>
                    <input  type="text" value={title} onChange={(e)=>{setTitle(e.target.value)}} placeholder='Digite o titulo da sua tarefa.'/>
                    <h5>Categoria</h5>
                        <select value={category} onChange={(e)=>{setCategory(e.target.value)}}>
                            <option  value={4}>Outros</option>
                            <option value={2}>Documentos</option>
                            <option value={3}>Saúde</option>
                            <option value={1}>Compras</option>
                        </select>
                    <h5>Status</h5>
                    <div className="edit-todolist-status-btns">
                    <select value={status} onChange={(e)=>{setStatus(e.target.value)}}>
                            <option  value={1}>Aberto</option>
                            <option value={2}>Em Progreso</option>
                            <option value={3}>Finalizado</option>
                        </select>
                        </div>
                </div>
                <div className="edit-todolist-description">
                    <h5>Descrição</h5>
                <textarea value={description} onChange={(e)=>{setDescription(e.target.value)}} placeholder='Digite aqui a descrição da tarefa' cols="0" rows="7"></textarea>
                <button onClick={()=>{btnEdit()}} className='btn-edit'>Salvar</button>
                </div>

            </div>
        </div>
    </div>
  )
}

export default EditToDoList