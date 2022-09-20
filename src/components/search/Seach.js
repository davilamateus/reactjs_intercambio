import React from 'react'
import './search.css'

const Seach = () => {
  return (
    <div className='seach-box'>
      <form>
        <input className='search-input' type="text"  placeholder='pesquisar artigo...'/>
      </form>
      <button className="search-btn">
        <img src="./../../../img/icons/iconsearch.svg" />
      </button>
    </div>
  )
}

export default Seach