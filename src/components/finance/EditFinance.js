import {useEffect, useState} from 'react'
import './EditFinance.css'
import Api from '../../axios/Axios' 
import Messages from '../messages/Messages'



const EditFinance = ({ item, closeEdit}) => {

    const [category, setCategory] = useState(4) 
    const [value, setValue] = useState('') 
    const [title, setTitle] = useState(undefined);
    const [message, setMessage] = useState({}) 

    useEffect(()=>{
        setTitle(item.title)
        setCategory(item.category)
        setValue(item.value)
    },[])

    console.log(value)

    function closeMessage(){
        setMessage({})
    }
    const config = {
        headers: { Authorization: `Bearer ${sessionStorage.getItem('token')}` }
    };
    



    async function btnEdit(id){
        if( title !== undefined && value !== undefined){
            const body = {value:value, title:title, category:category, id:item.id}
            await Api.patch('/user/finance/', body, config)
            .then(()=>{
            })
        } else{
            setMessage({title:'Email não verificado!', text:'Enviamos novamente um email com o link para verificação, por favor acesse o seu email.',status:'atention', action:'Fechar'})

        }

    }
    

  return (
    <div className='edit-finance-div'>

        <div onClick={()=>{closeEdit()}} className="add-bg-degrade"></div>
            {message.title !== undefined  ? 
             <Messages title={message.title} text={message.text} action={message.action} status={message.status} closeMessage={closeMessage}/> : ''}
        <div className="edit-finance">
                    <h5>Titulo</h5>
                    <input onChange={(e)=>{setTitle(e.target.value)}} value={title} type="text" placeholder='Digite o titulo para o gasto.'/>
                    <h5>Categoria</h5>
                        <select value={category} onChange={(e)=>{setCategory(e.target.value)}}>
                            <option  value={5}>Outros</option>
                            <option  value={4}>Documentos</option>
                            <option value={2}>Câmbio</option>
                            <option value={3}>Passagem</option>
                            <option value={1}>Curso</option>
                        </select>
                        <h5>Value</h5>
                    <input value={value} onChange={(e)=>{setValue(e.target.value)}} type="number" placeholder='100'/>
                <button onClick={()=>{
                    btnEdit()
                    closeEdit()

                    }} className='btn-add'>Salvar</button>

        </div>
    </div>
  )
}

export default EditFinance