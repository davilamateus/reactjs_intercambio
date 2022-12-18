import React from 'react'
import { Link } from 'react-router-dom'


const PrincipalArticles = ({item}) => {


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
    
    <div className='princial-article'>
                  <Link className="princial-article-img" to={`/blog/article/${item.id}`}>
                      <div style={{backgroundImage:`url(${item.img})`}} ></div>
                  </Link>
                      <div className="principal-article-container">
                        <div className="princial-article-top">
                            <Link to={`/blog/category/${item.category.id}`}>
                              <h5 className="princial-article-category">{item.category.title}</h5>
                            </Link>
                            
                        </div>
                        <Link to={`/blog/article/${item.id}`}>
                                <h3 className="princial-article-title">{item.title}</h3>
                        </Link>
                         <Link to={`/blog/article/${item.id}`}>
                               <p className="principal-article-description">{item.description.split('').slice(0,400).join('')}...</p>
                          </Link>
                          <div className="article-time">
                                  <img src="./../../../img/icons/icontime.svg" />
                                  <p className="princial-article-time">{timeSince(new Date(item.createdAt))}</p>
                              </div>
     </div>
     </div>

  )
}

export default PrincipalArticles