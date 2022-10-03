import {useEffect,useState} from 'react'
import './TodoListDashboard.css'
import Api from '../../axios/Axios'
import Card from './Card'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'

const ToDoList = () => {

  const token = sessionStorage.getItem('token');

  const [toDoList,setToDoList] = useState(undefined)
  const [loading, setLoading] = useState(false)
  
      const customConfig = {
        headers: {
        'Content-Type': 'application/json',
        "Authorization" : `Bearer ${token}`
        }
    };
  
  
      async function loadToDoList(){
        await Api('/user/todolist' ,customConfig).then((data)=>{
          setToDoList(data.data.data)
          setLoading(true)
        })
      }

  useEffect(()=>{

    loadToDoList()
  },[])

  


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
                    <Card key={item.id} refresh={loadToDoList} date={item.createdAt} id={item.id} title={item.title} status={item.status} category={item.category} description={item.description} />

                  ))  }      
                </div>
            
            </>
            :
            <SkeletonTheme baseColor="var(--8)" highlightColor="var(--11)">
                <Skeleton style={{width:'150px',height:'30px', margin:'10px'}}/>
                <Skeleton style={{width:'93%',height:'110px', margin:'3px 10px' }}/>
                <Skeleton style={{width:'93%',height:'110px', margin:'3px 10px' }}/>
                <Skeleton style={{width:'93%',height:'110px', margin:'3px 10px' }}/>
                <Skeleton style={{width:'93%',height:'110px', margin:'3px 10px' }}/>
            </SkeletonTheme>
            
            }

    </div>
  )
}

export default ToDoList