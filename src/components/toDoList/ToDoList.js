import {useEffect,useState} from 'react'
import './TodoList.css'
import Api from './../../axios/Axios'
const ToDoList = () => {

  const token = sessionStorage.getItem('token');

  const [toDoList,setToDoList] = useState(undefined)

  useEffect(()=>{


    const customConfig = {
      headers: {
      'Content-Type': 'application/json',
      "Authorization" : `Bearer ${token}`
      }
  };


    async function loadToDoList(){
      await Api('/user/todolist' ,customConfig).then((data)=>{
        setToDoList(data.data.data)
      })
    }
    loadToDoList()
  },[])

  


  return (
    <div className='todolist-box'>
           <div className="box-header">
                <h6>Lista de Tarefas</h6>
                <img src="./../../../img/icons/addbtn.svg" alt="Adicionar" />
          </div>
          <div className='todolist-scrol'>
            {toDoList !== undefined ? 
              toDoList.map((item)=>(
                <div className={`todolist-item ${item.status == true? 'todolist-comply':''}`} key={item.id}>
                  <p>{item.title}</p>
                  <button className="todolist-bts">...</button>
                </div>
              ))
            
            
            :''}

            </div>
    </div>
  )
}

export default ToDoList