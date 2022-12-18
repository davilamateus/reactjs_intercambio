import {useEffect,useState} from 'react'
import './TodoListDashboard.css'
import Api from '../../axios/Axios'
import Card from './Card'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'

const ToDoList = () => {


  const [toDoList,setToDoList] = useState(undefined)
  const [loading, setLoading] = useState(false)
  

  
  
  async function loadToDoList(){
    await Api('/user/todolist' ,{
        headers: {
        'Content-Type': 'application/json',
        "Authorization" : `Bearer ${sessionStorage.getItem('token')}`
      }
    }).then((data)=>{
          setToDoList(data.data.data)
        })
      }


  useEffect(()=>{


      loadToDoList()
    

  },[])
useEffect(()=>{
  if(toDoList !== undefined){
    setLoading(true)
  }
},[toDoList])
  


  return (
    <div className='todolist-box'>
            {loading == true ? 
            <>
              <div className="box-header">
                    <h5>Lista de Tarefas</h5>
                    <img src="./../../../img/icons/btnpurper.svg"  />
              </div>
              <div className='todolist-scrol'>
                  {toDoList.map((item)=>(
                    <Card key={item.id} refresh={loadToDoList} item={item}  />

                  ))  }      
                </div>
            
            </>
            :
            <SkeletonTheme baseColor="var(--background)" highlightColor="var(--higher)">
                <Skeleton style={{width:'150px',height:'30px', margin:'10px'}}/>
                <Skeleton count={7} style={{width:'93%',height:'80px', margin:'3px 10px' }}/>
  
            </SkeletonTheme>
            
            }

    </div>
  )
}

export default ToDoList