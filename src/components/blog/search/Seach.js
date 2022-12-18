import {useEffect,useState} from 'react'
import './search.css'
import Api from '../../../axios/Axios'

const Seach = () => {

  const [inputValue,setInputValue]= useState(undefined)

  function searchArticles(e){


    if(inputValue!== undefined && inputValue!= ''){
      window.location.href = `/blog/search/${inputValue}`

    }
  }



  return (
    <div className='seach-box'>
        <input 
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            searchArticles()
              e.preventDefault();
              e.stopPropagation();
          }
      }}
        
        onChange={(e)=>{setInputValue(e.target.value)}} className='search-input' type="text"  placeholder='pesquisar artigo...'/>
      <button   onClick={(e)=>{searchArticles()}} className="search-btn">
        <img src="./../../../img/icons/iconsearch.svg" />
      </button>
    </div>
  )
}

export default Seach