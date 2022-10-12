import {useState} from 'react'
import './Card.css';
import Api from '../../axios/Axios';
import EditToDoList from './EditToDoList';
import AddToDoList from './AddToDoList';
const Card = ({item, refresh}) => {

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

  if(item.status == 1){
    statusTitle = 'Aberto'
    color = 'var(--1)'
  } else if(item.status ==2){
    statusTitle = 'Em progresso'
    color = 'var(--2)'

  } else if(item.status ==3){
    statusTitle = 'Concluido'
    color = 'var(--3)'

    }


    let colorCategory = ''
  if(item.category == '1'){
    colorCategory = 'var(--2)'
  }  else if(item.category == '2'){
    colorCategory = 'var(--3)'
  }  else if(item.category == '3'){
    colorCategory = 'var(--1)'
  }  else if (item.category == '4'){
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
    const body = {id:item.id}
    
    await Api.delete(`/user/todolist/${item.d}`,config).then(()=>{  
      refresh() 
    })


  }


  return (
    
    <>
    
      <div  className={`todolist-item ${item.status == true? 'todolist-comply':''}`} key={item.id}>
            <div style={{backgroundColor:colorCategory}} className={`todolist-color`}></div>
            <div className="todolist-text">
              <div className="todolist-status">
                 {item.status!== undefined? 
                 <>
                  <div style={{backgroundColor:color}} className={`todolist-status-cicle`}></div>
                    <p>{statusTitle}</p>
                 </>
                 :<div style={{height:'10px'}}></div>} 
              </div>
              <div className="todolist-container">
                <h5 onClick={()=>{todolistMore()}}>{item.title}</h5>
                {show == false ? 
                   item.description.split('') !== undefined ? 
                   <p onClick={()=>{todolistMore()}} className="todolist-description"> 
                      {item.description.split('').length < 37 ? item.description :
                      item.description.split('').slice(0,35).join('') +'...'
                    }
                    </p>
                    
                    :''
                    :<>
                    <p onClick={()=>{todolistMore()}} className="todolist-description">
                      {item.description}
                      </p>
                     
                      <div className="todolist-btns-controler">
                          <button onClick={()=>{setEditShow(true)}} className="todolist-btn-edit">
                            <img src="./../../../img/icons/iconedit.svg"/>
                            Editar
                          </button>
                          <button onClick={()=>{deleteToDoList(item.id)}} className="todolist-btn-delete">
                            <img src="./../../../img/icons/icondelete.svg"/>
                            Excluir
                          </button>
                      </div>
                      
                    </>
                      }
                       <div className="todolist-time">
                                  <img src="./../../../img/icons/icontime.svg" />
                                  <p className="princial-article-time">{timeSince(new Date(item.date))}</p>

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
              <EditToDoList closeAdd={closeAdd} itemId={item.id} itemTitle={item.itle} itemDescription={item.description} itemCategory={item.category} itemStatus={item.status} refresh={refresh}/> :''}
              {addShow === true? <AddToDoList closeAdd={closeAdd} refresh={refresh}/> :''}

                </>
                
  )
}

export default Card