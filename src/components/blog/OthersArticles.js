import React from 'react'
import { Link } from 'react-router-dom'


const OthersArticles = ({item ,loadingCategoryItens }) => {



    

    const intervals = [
      { label: 'ano', seconds: 31536000 },
      { label: 'mês', seconds: 2592000 },
      { label: 'dia', seconds: 86400 },
      { label: 'hora', seconds: 3600 },
      { label: 'minuto', seconds: 60 },
      { label: 'segundo', seconds: 1 }
    ];
    
    function timeSince(date) {
        const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
        const interval = intervals.find(i => i.seconds < seconds);
        const count = Math.floor(seconds / interval.seconds);
        return `${count} ${interval.label}${count !== 1 ? 's' : ''} atrás.`;
      }
  

  return (
    <div className='blog-article-box' key={item.id}>
    <Link to={`/blog/article/${item.id}`}>
      <div style={{backgroundImage:`url(${item.img})`}} className="article-poster"></div>

    </Link>
      <div className="blog-article-container">
          <Link onClick={()=>{loadingCategoryItens()}} to={`/blog/category/${item.categoryId}`}>
              <h5 className='princial-article-category'>{item.category.title}</h5>
            </Link> 
            <Link to={`/blog/article/${item.id}`}>
          <h5 className="article-title">{item.title}</h5>

            </Link>
            <p>{item.description.split('').slice(0,100).join('')}...</p>

          <div className="article-time">
                        <img src="./../../../img/icons/icontime.svg" />
                          <p className="princial-article-time">{timeSince(new Date(item.createdAt))}</p>

                    </div>

      </div>

  </div>
  )
}

export default OthersArticles