import React, { useEffect ,useState } from 'react'
import Api from './../../axios/Axios'
import './BlogDashboard.css'
import {Link} from 'react-router-dom'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'



const BlogDashboard = ({countryId}) => {
    
    const [article, setArticle] = useState()
    const [page,setPage] = useState(0)
    const [nextArticleStatus, setNextArticleStatus] = useState(true)
    const [backArticleStatus, setBackArticleStatus] = useState(true)
    const [lengthArticle ,setLengthArticle] = useState(0)
    const [loading,setLoading] = useState(false)
    
    useEffect(()=>{
        if(countryId !== undefined){
        async function loadBlog(){
          const res =   await Api.get(`/blog/articles?country=${countryId}&page=${1}`)
          setArticle(res.data)
          setLoading(true)
        }
        loadBlog()
    }
    },[countryId])




    
    function pageBlog(value){
        setPage(page + value)
        if(page+1 <= article.length){
            setNextArticleStatus(false)

            setLengthArticle(article.length)
        } else{
            setNextArticleStatus(true)
        }

        

    }

        
useEffect(()=>{

    if(page == 0){
        setBackArticleStatus(false)
        

    } else{
        setBackArticleStatus(true)
    }
    if(lengthArticle-1 ==page){
        setNextArticleStatus(false)
    } else {setNextArticleStatus(true)}
 



},[page])


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
    <SkeletonTheme baseColor="var(--8)" highlightColor="var(--11)">

    <div className='blog-div'>
        <div className='blog-box'>
            {loading == true? 
         <>
                <div className="box-header">
                    <h5>Blog</h5> 
                    <img  src="./../../../img/icons/btnpurper.svg" alt="Ver mais" />
                </div>
                <div>
                <div className="blog-container">
                    <Link to={`/blog/article/${article[page].id}`}>
                        <div style={{backgroundImage: `url("${(article[page].img)}")`}} className="blog-img"></div> 
                        <h5 className="blog-dashboard-article-category">{article[page].category.title }</h5>
                        <h4>{article[page].title}</h4>
                        <p> {article[page].description.split('').slice(0,200).join('')+"..." }</p>
                        <div className="article-time">
                            <img src="./../../../img/icons/icontime.svg" />
                            <p className="princial-article-time">{timeSince(new Date(article[page].createdAt))}</p>
                        </div>           
                        <button>Continuar lendo</button>
                    </Link>
                </div>
            </div>

        </>
            :
        
        <>
            <Skeleton style={{width:'40px',height:'30px', margin:'10px 10px 10px 10px'}}/>
            <Skeleton style={{width:'290px',height:'190px',margin:'10px 10px 10px 10px'}}/>
            <Skeleton style={{width:'90px',height:'20px',margin:'10px 10px 20px 10px'}}/>
            <Skeleton count={2} style={{width:'290px',height:'20px',margin:'0px 0px 0px 10px'}}/>
            <Skeleton count={1} style={{width:'120px',height:'20px',margin:'0px 10px 0px 10px'}}/>
            <Skeleton count={1} style={{width:'70px',height:'15px',margin:'20px 40px 20px 10px'}}/>
            <Skeleton  style={{width:'200px',height:'35px',margin:'0 auto', display:'flex'}}/>

        </>
        
        }
        </div>
            <div className="btn-blog">
                {backArticleStatus === true ? <button onClick={()=>{pageBlog(-1)}}>Anterior</button>: ''}
                {nextArticleStatus === true ? <button onClick={()=>{pageBlog(1)}}>Prôximo</button>: ''}

            </div>
    </div>
    </SkeletonTheme>
  )
}

export default BlogDashboard