import React, { useEffect ,useState } from 'react'
import Api from './../../axios/Axios'
import './BlogDashboard.css'

const BlogDashboard = ({countryId}) => {
    
    const [article, setArticle] = useState()
    const [data,setData] = useState([])
    const [page,setPage] = useState(0)
    const [nextArticleStatus, setNextArticleStatus] = useState(true)
    const [backArticleStatus, setBackArticleStatus] = useState(true)
    const [lengthArticle ,setLengthArticle] = useState(0)
    
    useEffect(()=>{
        if(countryId !== undefined){

       
        console.log(`O pais e ${countryId}`)
        async function loadBlog(){
          const res =   await Api.get(`/blog/articles?country=${countryId}`)
        
          setArticle(res.data)
        }
        loadBlog()
    }
    },[countryId])





    useEffect(()=>{

        console.log(article)
    },[article])


    
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





  return (
    <div className='blog-div'>


        <div className='blog-box'>
            <div className="box-header">
                <h6>Blog</h6>
                <img src="./../../../img/icons/btnpurper.svg" alt="Ver mais" />
            </div>
            {article !== undefined ? 
            <div>
                <div className="blog-container">
                    <div style={{backgroundImage: `url("${article[page].img}")`}} className="blog-img"></div>
                    <h3>{article[page].title}</h3>
                    <p>{article[page].description}</p>
                    <button>Continuar lendo</button>
                </div>
            </div>
            
            : <h1>Não tem</h1>}
        </div>
                <div className="btn-blog">
                        {backArticleStatus === true ? <button onClick={()=>{pageBlog(-1)}}>Anterior</button>: ''}
                        {nextArticleStatus === true ? <button onClick={()=>{pageBlog(1)}}>Prôximo</button>: ''}

                </div>
    </div>
  )
}

export default BlogDashboard