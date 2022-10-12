import {useState} from 'react'
import './cardSuggestion.css';

const CardSuggestion = ({item, refresh}) => {






  const [show,setShow] = useState(false)


    let colorCategory = ''
  if(item.category == '1'){
    colorCategory = 'var(--2)'
  }  else if(item.category == '2'){
    colorCategory = '#FA385F'
  }  else if(item.category == '3'){
    colorCategory = 'var(--1)'
  }  else if (item.category == '4'){
    colorCategory = 'var(--4)'
  }






  return (
    
    <>
    
      <div  className={`todolist-suggestion-item`} key={item.id}>
            <div className={`todolist-category-${item.category}`}></div>
            <div className="todolist-text">
              <div className="todolist-container">
                <p>{item.title}</p>
                {show == false ? 
                   item.description.split('') !== undefined ? 
                   <p  className="todolist-description"> 
                      {item.description.split('').length < 50 ? item.description :
                      item.description.split('').slice(0,46).join('') +'...'
                    }
                    </p>
                    
                    :''
                    :<>
                    <p className="todolist-description">
                      {item.description}
                      </p>
                     
                      <div className="todolist-btns-controler">
                          <button className="todolist-btn-edit">
                            <img src="./../../../img/icons/iconedit.svg"/>
                            Editar
                          </button>
                          <button  className="todolist-btn-delete">
                            <img src="./../../../img/icons/icondelete.svg"/>
                            Excluir
                          </button>
                      </div>
                      
                    </>
                      }

              </div>
            </div>

  </div>


                </>
                
  )
}

export default CardSuggestion