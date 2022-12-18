import { useState } from 'react'
import './Card.css';
import Api from '../../axios/Axios';
import EditToDoList from './EditToDoList';
import AddToDoList from './AddToDoList';
const Card = ({ item, refresh }) => {

  const [addShow, setAddShow] = useState(false)
  const [editShow, setEditShow] = useState(false)







  function timeSince(date) {
    const intervals = [
      { label: 'ano', seconds: 31536000000 },
      { label: 'mês', seconds: 2592000000 },
      { label: 'dia', seconds: 86400000 },
      { label: 'hora', seconds: 3600000 },
      { label: 'minuto', seconds: 60000 },
      { label: 'segundo', seconds: 1000 }
    ];
    if (date !== undefined) {
    }
    let seconds = Math.floor((Date.now() - date.getTime()));
    if (seconds < 1000) {
      return '1 segundo atrás'
    } else {
      let interval = intervals.find(i => i.seconds < seconds);
      let count = Math.floor(seconds / interval.seconds);
      return `${count} ${interval.label}${count !== 1 ? 's' : ''} atrás.`;

    }

  }


  function closeAdd() {
    setEditShow(false)
  }

  const [show, setShow] = useState(false)





  function todolistMore() {
    if (show === true) {
      setShow(false)
    } else {
      setShow(true)
    }
  }


  async function deleteToDoList() {
    const config = {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('token')}`
      }
    };

    await Api.delete(`/user/todolist/${item.id}`, config).then(() => {
      refresh()
    })


  }


  return (

    <>

      <div className={`todolist-item ${item.status == true ? 'todolist-comply' : ''}`} key={item.id}>
        <div  className={`todolist-category-${item.category}`}></div>
        <div className="todolist-text">
          <div className="todolist-container">
            <h5 onClick={() => { todolistMore() }}>{item.title}</h5>
            {show == false ?
              item.description.split('') !== undefined ?
                <p onClick={() => { todolistMore() }} className="todolist-description">
                  {item.description.split('').length < 37 ? item.description :
                    item.description.split('').slice(0, 38).join('') + '...'
                  }
                </p>

                : ''
              : <>
                <p onClick={() => { todolistMore() }} className="todolist-description">
                  {item.description}
                </p>

                <div className="todolist-bottom">
                  <div className="todolist-time">
                    <img src="./../../../img/icons/icontime.svg" />
                    <p className="princial-article-time">{timeSince(new Date(item.createdAt))}</p>
                  </div>
                  <div>
                    <button onClick={() => { setEditShow(true) }} className="todolist-btn-edit">
                      <img src="./../../../img/icons/iconedit.svg" />
                      Editar
                    </button>
                    <button onClick={() => { deleteToDoList(item.id) }} className="todolist-btn-delete">
                      <img src="./../../../img/icons/icondelete.svg" />
                      Excluir
                    </button>

                  </div>

                </div>

              </>
            }


          </div>
        </div>
        <div onClick={() => { todolistMore() }} className="todolist-btns">
          <span className="todolist-more-btns"></span>
          <span className="todolist-more-btns"></span>
          <span className="todolist-more-btns"></span>
        </div>
      </div>

      {editShow === true ?
        <EditToDoList closeAdd={closeAdd} itemId={item.id} itemTitle={item.title} itemDescription={item.description} itemCategory={item.category} itemStatus={item.status} refresh={refresh} /> : ''}
      {addShow === true ? <AddToDoList closeAdd={closeAdd} refresh={refresh} /> : ''}

    </>

  )
}

export default Card