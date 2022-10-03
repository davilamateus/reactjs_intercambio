import {useEffect, useState} from 'react'
import './Article.css'
import Api from '../../axios/Axios'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'


const ListArticles = ({user}) => {

    let params = useParams()
    const [articles, setArticles] = useState([]);

    const article= params.article;
    const [btnNext ,setBtnNext] = useState(false)
    const [btnBack ,setBtnBack] = useState(false)

    

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

    //console.log(timeSince())




      

      useEffect(()=>{
        setBtnNext(false)
        if(user!==undefined){


          if(article !== undefined){
            async function getArticle(){
              await Api.get(`/blog/article?article=${article}`)
                  .then((data)=>{
                    setArticles([data.data])
                  })
                }
                getArticle()

          } 
  }
    },[user, params])  
    
    
    function loadingMoreArticleBtn(){

      window.scrollTo(0, document.body.scrollHeight || document.documentElement.scrollHeight);

    
      topFunction()

    }




function topFunction() {
  document.body.scrollTop = 0; 
  document.documentElement.scrollTop = 0; 
}

return (
  <div >
                {articles.length> 0 ? 
                  <div  className='article-page'>

                      <div className='article-poster-big' style={{backgroundImage:`url(${articles[0].img})`}} >

                      </div>

                      <div className="article-page-container">
                        <div className="article-page-top">
                            <Link to={`/blog/category/${articles[0].category.id}`}>
                              <h5 className="article-page-category">{articles[0].category.title}</h5>
                            </Link>
                              <div className="article-time-solo">
                                  <img src="./../../../img/icons/icontime.svg" />
                                  <p className="princial-article-time">{timeSince(new Date(articles[0].createdAt))}</p>

                              </div>

                        </div>
                          <h2 className="princial-article-title-solo">{articles[0].title}</h2>

                          <p className="principal-article-description">{articles[0].description}</p>

                      </div>
                  </div>
                
           

                
          
            :''
          }

    </div>
    
  )
}

export default ListArticles