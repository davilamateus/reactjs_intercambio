import {useEffect, useState} from 'react'
import './toDolist.css'
import ToDoListTrello from '../../components/toDoList/ToDoListTrello'
import Api from '../../axios/Axios'
import AddToDoList from '../../components/toDoList/AddToDoList'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import Perfil from '../../components/perfil/Perfil'

const ToDoList = () => {


  const [list,setList] = useState(undefined);
  const [open,setOpen] = useState([]);
  const [inProgress, setInProgress] = useState([]);
  const [finished, setFinished] = useState([]);
  const [loading, setLoading] = useState(false)
  const [addShow, setAddShow] = useState(false)
  const [editShow, setShow] = useState(false)


  
  const customConfig = {
    headers: {
    'Content-Type': 'application/json',
    "Authorization" : `Bearer ${sessionStorage.getItem('token')}`
    }
};


  async function loadToDoList(){
    console.log('carregoooou')
    await Api('/user/todolist' ,customConfig).then((data)=>{
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
        <div className='home-top'>
            <h2 className='dashboard-title'>Lista de Tarefas</h2>
              <Perfil />
          </div>
        <div className='todolist-page'>
          <div className="todolist-header-page">
            <button onClick={()=>{setAddShow(true)}} className='btn-add-new'>
              <svg xmlns="http://www.w3.org/2000/svg" width="17.371" height="17.371" viewBox="0 0 17.371 17.371">
                <g id="ic-actions-close" transform="matrix(0.719, -0.695, 0.695, 0.719, 2.5, 8.578)">
                  <line id="Linha_16" data-name="Linha 16" x1="8.749" y1="8.749" transform="translate(0 0)" fill="none" stroke="#fff" />
                  <line id="Linha_17" data-name="Linha 17" y1="8.749" x2="8.749" transform="translate(0 0)" fill="none" stroke="#fff" />
                </g>
              </svg>
              <p>
              Adicionar Tarefa
              </p>
            </button>
          </div>
          {loading=== true?
          <ToDoListTrello open={open} inProgress={inProgress} finished={finished} listToDoList={list} refresh={refresh}/>
          :
          <SkeletonTheme baseColor="var(--8)" highlightColor="var(--11)">
            <div className="todolist-skeleton">
              <div>
                  <Skeleton style={{width:'100px',height:'20px', margin:'10px 10px' }}/>
                  <Skeleton style={{width:'94%',height:'120px', margin:'10px 10px' }}/>
                  <Skeleton style={{width:'94%',height:'120px', margin:'10px 10px' }}/>
                  <Skeleton style={{width:'94%',height:'120px', margin:'10px 10px' }}/>
                  <Skeleton style={{width:'94%',height:'120px', margin:'10px 10px' }}/>

              </div>
              <div>
                  <Skeleton style={{width:'100px',height:'20px', margin:'10px 10px' }}/>
                  <Skeleton style={{width:'94%',height:'120px', margin:'10px 10px' }}/>
                  <Skeleton style={{width:'94%',height:'120px', margin:'10px 10px' }}/>
                  <Skeleton style={{width:'94%',height:'120px', margin:'10px 10px' }}/>
                  <Skeleton style={{width:'94%',height:'120px', margin:'10px 10px' }}/>

              </div>
              <div>
                  <Skeleton style={{width:'100px',height:'20px', margin:'10px 10px' }}/>
                  <Skeleton style={{width:'94%',height:'120px', margin:'10px 10px' }}/>
                  <Skeleton style={{width:'94%',height:'120px', margin:'10px 10px' }}/>
                  <Skeleton style={{width:'94%',height:'120px', margin:'10px 10px' }}/>
                  <Skeleton style={{width:'94%',height:'120px', margin:'10px 10px' }}/>

              </div>
            </div>
            </SkeletonTheme>
          
          }
          {addShow === true? <AddToDoList closeAdd={closeAdd} refresh={refresh}/> :''}
        </div>
    </>  )
}

export default ToDoList