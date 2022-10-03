import {useState} from 'react'
import './Card.css';
import Api from '../../axios/Axios';
import EditToDoList from './EditToDoList';
import AddToDoList from './AddToDoList';
const Card = ({title,id,category,description, status, refresh, date}) => {

  const [addShow, setAddShow] = useState(false)
  const [editShow, setEditShow] = useState(false)

  


  const intervals = [
    { label: 'ano', seconds: 31536000000 },
    { label: 'mês', seconds: 2592000000 },
    { label: 'dia', seconds: 86400000 },
    { label: 'hora', seconds: 3600000 },
    { label: 'minuto', seconds: 60000 },
    { label: 'segundo', seconds: 1000 }
  ];
  
  
  function timeSince(date) {
    if(date !== undefined){
    }
    const seconds = Math.floor((Date.now() - date.getTime()));
    if(seconds<1000){
      return '1 segundo atrás'
    } else{
      const interval = intervals.find(i => i.seconds < seconds);
      const count = Math.floor(seconds / interval.seconds);
      return `${count} ${interval.label}${count !== 1 ? 's' : ''} atrás.`;

    }
    
  }


  function closeAdd(){
    setEditShow(false)  
  }

  const [show,setShow] = useState(false)
  let color = ''
  let statusTitle = ''

  if(status == 1){
    statusTitle = 'Aberto'
    color = 'var(--1)'
  } else if(status ==2){
    statusTitle = 'Em progresso'
    color = 'var(--2)'

  } else if(status ==3){
    statusTitle = 'Concluido'
    color = 'var(--3)'

    }


    let colorCategory = ''
  if(category == '1'){
    colorCategory = 'var(--2)'
  }  else if(category == '2'){
    colorCategory = 'var(--3)'
  }  else if(category == '3'){
    colorCategory = 'var(--1)'
  }  else if (category == '4'){
    colorCategory = 'var(--4)'
  }

  function todolistMore(){
    if(show === true){
      setShow(false)
    } else{
      setShow(true)
    }
  }
  

  async function deleteToDoList(){
    const config = {
      headers: { 
        Authorization: `Bearer ${sessionStorage.getItem('token')}` }
    };
    const body = {id:id}
    
    await Api.delete(`/user/todolist/${id}`,config).then(()=>{  
      refresh() 
    })


  }


  return (
    
    <>
    
      <div  className={`todolist-item ${status == true? 'todolist-comply':''}`} key={id}>
            <div style={{backgroundColor:colorCategory}} className={`todolist-color`}></div>
            <div className="todolist-text">
              <div className="todolist-status">
                 {status!== undefined? 
                 <>
                  <div style={{backgroundColor:color}} className={`todolist-status-cicle`}></div>
                    <p>{statusTitle}</p>
                 </>
                 :<div style={{height:'10px'}}></div>} 
              </div>
              <div className="todolist-container">
                <h5 onClick={()=>{todolistMore()}}>{title}</h5>
                {show == false ? 
                   description.split('') !== undefined ? 
                   <p onClick={()=>{todolistMore()}} className="todolist-description"> 
                      {description.split('').length < 37 ? description :
                      description.split('').slice(0,35).join('') +'...'
                    }
                    </p>
                    
                    :''
                    :<>
                    <p onClick={()=>{todolistMore()}} className="todolist-description">
                      {description}
                      </p>
                     
                      <div className="todolist-btns-controler">
                          <button onClick={()=>{setEditShow(true)}} className="todolist-btn-edit">
                            <img src="./../../../img/icons/iconedit.svg"/>
                            Editar
                          </button>
                          <button onClick={()=>{deleteToDoList(id)}} className="todolist-btn-delete">
                            <img src="./../../../img/icons/icondelete.svg"/>
                            Excluir
                          </button>
                      </div>
                      
                    </>
                      }
                       <div className="todolist-time">
                                  <img src="./../../../img/icons/icontime.svg" />
                                  <p className="princial-article-time">{timeSince(new Date(date))}</p>

                              </div>

              </div>
            </div>
            <div onClick={()=>{todolistMore()}} className="todolist-btns">
              <span className="todolist-more-btns"></span>
              <span className="todolist-more-btns"></span>
              <span className="todolist-more-btns"></span>
            </div>
  </div>

              {editShow === true? 
              <EditToDoList closeAdd={closeAdd} itemId={id} itemTitle={title} itemDescription={description} itemCategory={category} itemStatus={status} refresh={refresh}/> :''}
              {addShow === true? <AddToDoList closeAdd={closeAdd} refresh={refresh}/> :''}

                </>
                
  )
}

export default Card