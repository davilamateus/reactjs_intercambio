import {useState, useEffect} from 'react'
import Article from '../../components/blog/Article'
import ListCategory from '../../components/blog/ListCategory'
import Seach from '../../components/blog/search/Seach'
import Api from '../../axios/Axios'
import './Article.css'
const Articles = () => {




  return (
    <>  
    <div className='blog-page'>
        <Seach/>
        <ListCategory/>
        <Article/>
    </div>
</>
  )
}

export default Articles