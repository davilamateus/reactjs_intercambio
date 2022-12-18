import { useState, useEffect } from 'react'
import EditFinance from './EditFinance'
import Api from '../../axios/Axios'

const FinanceCard = ({item, refresh}) => {

    const [showEdit, setEditShow] = useState(false)
    function closeEdit() {
        setTimeout(() => {
            refresh()
            
        }, 400);
        setEditShow(false)
      }

    function titleCategory(i) {
        let categoryDados = []
        if (i == 1) {
          categoryDados = ['Câmbio', '#68D9A5']
        } else if (i == 2) {
          categoryDados = ['Curso', '#F1F180']
    
        } else if (i == 3) {
          categoryDados = ['Passagem', '#FA385F']
    
        } else if (i == 4) {
          categoryDados = ['Documentos', '#6958A3']
    
        } else if (i == 5) {
          categoryDados = ['Outros', '#17a6f9']
    
        }
        return categoryDados
      }




      async function deleteFinance() {
        const config = {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`
          }
        };
    
        await Api.delete(`/user/finance?id=${item.id}`, config).then(() => {
          refresh()
        })
    }
    

  return (
    <>
        {showEdit === true ? <EditFinance item={item} closeEdit={closeEdit} refresh={refresh} />: ''}

    <div className='finance-table-item' height={'40px'} >
    <p className='finance-table-title'>{item.title}</p>
    <div className="finance-category">
      <div className="finance-category-cicle" style={{ backgroundColor: titleCategory(item.category)[1] }} ></div>
      <p >{titleCategory(item.category)[0]}</p>

    </div>
    <h5 className='finance-value'>R${item.value}</h5>
    <div className='finance-table-btn'>
      <button
        onClick={() => { setEditShow(true) }}
      >
        <img src="./../../../img/icons/iconedit.svg" />
        Editar
      </button>
      <button onClick={()=>{deleteFinance()}}>
        <img src="./../../../img/icons/icondelete.svg" />
        Excluir</button>
    </div>
  </div>
    </>
  )
}

export default FinanceCard