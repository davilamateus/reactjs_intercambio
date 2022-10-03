import {useEffect, useState} from 'react'
import './LastArticles.css'

import Api from '../../axios/Axios'
import { Link } from 'react-router-dom'

const LastArticles = ({user}) => {

  const [articles, setArticles] = useState([]);

  useEffect(()=>{
    if(user!== undefined){


        if(user.countryId !== undefined){

          async function getArticles(){
              await Api.get(`/blog/articles?country=${user.countryId}&page=1`).then((data)=>{
                setArticles(data.data)
              })
          }
          getArticles()
  }
}
  },[user])


  return (
    <div className='last-articles-div'>
      <h4>Últimas postagens</h4>

      {articles.length >0?
        <>
          {articles.slice(0,5).map((item)=>(
            <Link key={item.id} to={`/blog/article/${item.id}`}>
            <div className='last-blog-item'>
              <div style={{backgroundImage:`url(${item.img})`}} className="last-blog-img"></div>
              <h5>{item.title}</h5>
            </div>
            </Link>
          ))}
        </>
      
      :''}

    
    
    </div>
  )
}

export default LastArticles