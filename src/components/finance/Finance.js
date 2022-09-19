import {useEffect, useState} from 'react'
import './FInance.css'
import Api from './../../axios/Axios'


const Finance = () => {

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
    <div className='finance-box'>
      <div className="box-header">
                <h6>Lista de Tarefas</h6>
                <img src="./../../../img/icons/addbtn.svg" alt="Adicionar" />
          </div>
          <div className='todolist-scrol'>
            {toDoList !== undefined ? 
''
            
            
            :''}

            </div>
    </div>
  )
}

export default Finance