import {useEffect, useState} from 'react'
import './todolist.css'
import ToDoListTrello from '../../components/toDoList/ToDoListTrello'
import Api from '../../axios/Axios'
import AddToDoList from '../../components/toDoList/AddToDoList'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'

const ToDoList = () => {


  const [list,setList] = useState(undefined);
  const [open,setOpen] = useState([]);
  const [inProgress, setInProgress] = useState([]);
  const [finished, setFinished] = useState([]);
  const [loading, setLoading] = useState(false)
  const [addShow, setAddShow] = useState(false)
  const [editShow, setShow] = useState(false)




  async function loadToDoList(){
    await Api('/user/todolist' ,{
      headers: {
      'Content-Type': 'application/json',
      "Authorization" : `Bearer ${sessionStorage.getItem('token')}`
      }
  }).then((data)=>{
      setList(data.data.data)
    })
  }
  useEffect(()=>{


    loadToDoList()
  },[])


  function refresh(){
    setLoading(false)
  setTimeout(() => {
    
    setList(undefined)
    setFinished([])
    setInProgress([])
    setOpen([])
    loadToDoList()
  }, 10);

  }

  useEffect(()=>{
    if(list!== undefined){
      
      list.map((item)=>{
        if(item.status == 1){
        setOpen(open => [...open, item])
        }else if(item.status == 2){
          setInProgress(inProgress => [...inProgress, item])

        }else if(item.status ==3){
          setFinished(finished => [...finished, item])

        }
      })
     setLoading(true)

    }
  },[list])


  function closeAdd(){
    setAddShow(false)
  }



  

  return (


    
         // <AddToDoList refresh={refresh} />
    <>  

        <div className='todolist-page container'>
          <div className="todolist-header-page">
            <button onClick={()=>{setAddShow(true)}} className='btn-add-new'>
            <img src="./../../img/icons/icomore.svg" />
              <p>
              Adicionar Tarefa
              </p>
            </button>
            <button onClick={()=>{setAddShow(true)}} className='btn-view-suggestion'>
            <img src="./../../img/icons/icomore.svg" />
              <p>
              Ver Sugestões
              </p>
            </button>
          </div>
          {loading=== true?
          <ToDoListTrello open={open} inProgress={inProgress} finished={finished} listToDoList={list} refresh={refresh}/>
          :
          <SkeletonTheme baseColor="var(--background)" highlightColor="var(--higher )">
            <div className="todolist-skeleton">
              <div>
                  <Skeleton style={{width:'100px',height:'20px', margin:'10px 10px' }}/>
                  <Skeleton style={{width:'94%',height:'60px', margin:'10px 10px' }}/>
                  <Skeleton style={{width:'94%',height:'60px', margin:'10px 10px' }}/>
                  <Skeleton style={{width:'94%',height:'60px', margin:'10px 10px' }}/>
                  <Skeleton style={{width:'94%',height:'60px', margin:'10px 10px' }}/>

              </div>
              <div>
                  <Skeleton style={{width:'100px',height:'20px', margin:'10px 10px' }}/>
                  <Skeleton style={{width:'94%',height:'60px', margin:'10px 10px' }}/>
                  <Skeleton style={{width:'94%',height:'60px', margin:'10px 10px' }}/>
                  <Skeleton style={{width:'94%',height:'60px', margin:'10px 10px' }}/>
                  <Skeleton style={{width:'94%',height:'60px', margin:'10px 10px' }}/>

              </div>
              <div>
                  <Skeleton style={{width:'100px',height:'20px', margin:'10px 10px' }}/>
                  <Skeleton style={{width:'94%',height:'60px', margin:'10px 10px' }}/>
                  <Skeleton style={{width:'94%',height:'60px', margin:'10px 10px' }}/>
                  <Skeleton style={{width:'94%',height:'60px', margin:'10px 10px' }}/>
                  <Skeleton style={{width:'94%',height:'60px', margin:'10px 10px' }}/>

              </div>

            </div>
            </SkeletonTheme>
          
          }
          {addShow === true? <AddToDoList closeAdd={closeAdd} refresh={refresh}/> :''}
        </div>
    </>  )
}

export default ToDoList