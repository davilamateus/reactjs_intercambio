import {useEffect, useState} from 'react'
import './ListArticles.css'
import Api from '../../axios/Axios'
import { useParams } from 'react-router-dom'
import PrincipalArticles from './PrincipalArticles'
import OthersArticles from './OthersArticles'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'



const ListArticles = ({user}) => {

    let params = useParams()
    const [articles, setArticles] = useState([]);
    const category= params.id
    const search= params.search;
    const article= params.article;
    const [page,setPage]= useState(1)
    const [btnNext ,setBtnNext] = useState(false)

    

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




    useEffect(()=>{
      setPage(1)
      
      },[params])



      function checKnext(value){

        if(value.length >6){
          setBtnNext(true)
        }}
      

      useEffect(()=>{
        setBtnNext(false)
        if(user!==undefined){

          if(article !== undefined){
            async function getArticle(){
              await Api.get(`/blog/article?article=${article}`)
                  .then((data)=>{
                    setArticles([data.data])
                    checKnext(data.data)
                  })
                }
                getArticle()

          } else{
                        if(search !== undefined){
                          async function getArticles(){
                            await Api.get(`/blog/search?country=${user.countryId}&search=${search}`).then((data)=>{
                              setArticles(data.data)
                              checKnext(data.data)


                            })

                          }
                          getArticles()  
                        } else{

                                      if(category === undefined){
                                        if(user.countryId !== undefined){
                                          
                                          async function getArticles(){
                                            await Api.get(`/blog/articles?country=${user.countryId}&page=${page}`).then((data)=>{
                                              setArticles(data.data)
                                              checKnext(data.data)


                                            })
                                            
                                            
                                          }
                                          getArticles()
                                      }
                                  } else{
                                          if(user.countryId !== undefined){

                                              async function getArticles(){
                                                  await Api.get(`/blog/articles?country=${user.countryId}&category=${category}&page=${page}`).then((data)=>{
                                                    setArticles(data.data)
                                                    checKnext(data.data)


                                                  })
                                              }
                                              getArticles()
                                          }
                                  }
                  
                  }
  }
  }
    },[user,page, params])  
    
    
    function loadingMoreArticleBtn(){

      window.scrollTo(0, document.body.scrollHeight || document.documentElement.scrollHeight);

      setPage(page+1)
      topFunction()

    }




function topFunction() {
  document.body.scrollTop = 0; 
  document.documentElement.scrollTop = 0; 
}

return (
      <div >
        {articles.length> 0 ? 
        <>
            <div className='blog-articles-div'>
                <PrincipalArticles item={articles[0]} />         
            </div>

            <div className='other-articles'>
                {articles.splice(1).map((item)=>(
                    <OthersArticles  key={item.id}item={item}  />
                ))
              }
            </div>
            <div className="blog-btn-controller">
                {page !== 1 ? <button onClick={()=>{setPage(page-1)}}>Voltar</button> :''}
               {btnNext === true ? <button onClick={()=>{setPage(page+1)}}>Próximo</button> :''} 
            </div>
        </>
        :
        <SkeletonTheme baseColor="var(--8)" highlightColor="var(--11)">
          <div className='blog-articles-div' >
                <div className='princial-article'>
                    <Skeleton className='skeleton-img-blog' style={{width:'100%',height:'310px',margin:''}}/>
                    <div style={{width:'100%'}}>
                      <Skeleton style={{width:'120px',height:'30px',margin:'10px 10px 20px 10px'}}/>
                      <Skeleton count={2} style={{width:'94%',height:'26px',margin:'0px 0px 0px 10px'}}/>
                      <Skeleton count={1} style={{width:'70%',height:'26px',margin:'0px 0px 20px 10px'}}/>
                      <Skeleton count={3} style={{width:'94%',height:'16px',margin:'0px 10px'}}/>
                      <Skeleton count={1} style={{width:'59%',height:'16px',margin:'0px 10px'}}/>
                      <Skeleton style={{width:'70px',height:'14px',margin:'30px 10px 30px 10px'}}/>
                    </div>
                  
              </div>

          </div>
          <div className='other-articles'>
            <div className='blog-article-box'>
                <Skeleton style={{width:'290px',height:'150px',margin:'10px 10px 20px 10px'}}/>
                <Skeleton style={{width:'120px',height:'20px',margin:'0px 10px 10px 10px'}}/>
                <Skeleton count={2} style={{width:'270px',height:'20px',margin:'0px 10px 0px 10px'}}/>
                <Skeleton count={1} style={{width:'270px',height:'14px',margin:'0px 10px 0px 10px'}}/>
                <Skeleton count={1} style={{width:'170px',height:'14px',margin:'0px 10px 0px 10px'}}/>
                <Skeleton style={{width:'70px',height:'14px',margin:'10px 10px 10px 10px'}}/>
            </div>
            <div className='blog-article-box'>
                <Skeleton style={{width:'290px',height:'150px',margin:'10px 10px 20px 10px'}}/>
                <Skeleton style={{width:'120px',height:'20px',margin:'0px 10px 10px 10px'}}/>
                <Skeleton count={2} style={{width:'270px',height:'20px',margin:'0px 10px 0px 10px'}}/>
                <Skeleton count={1} style={{width:'270px',height:'14px',margin:'0px 10px 0px 10px'}}/>
                <Skeleton count={1} style={{width:'170px',height:'14px',margin:'0px 10px 0px 10px'}}/>
                <Skeleton style={{width:'70px',height:'14px',margin:'10px 10px 10px 10px'}}/>
            </div>
            <div className='blog-article-box'>
                <Skeleton style={{width:'290px',height:'150px',margin:'10px 10px 20px 10px'}}/>
                <Skeleton style={{width:'120px',height:'20px',margin:'0px 10px 10px 10px'}}/>
                <Skeleton count={2} style={{width:'270px',height:'20px',margin:'0px 10px 0px 10px'}}/>
                <Skeleton count={1} style={{width:'270px',height:'14px',margin:'0px 10px 0px 10px'}}/>
                <Skeleton count={1} style={{width:'170px',height:'14px',margin:'0px 10px 0px 10px'}}/>
                <Skeleton style={{width:'70px',height:'14px',margin:'10px 10px 10px 10px'}}/>
            </div>
            <div className='blog-article-box'>
                <Skeleton style={{width:'290px',height:'150px',margin:'10px 10px 20px 10px'}}/>
                <Skeleton style={{width:'120px',height:'20px',margin:'0px 10px 10px 10px'}}/>
                <Skeleton count={2} style={{width:'270px',height:'20px',margin:'0px 10px 0px 10px'}}/>
                <Skeleton count={1} style={{width:'270px',height:'14px',margin:'0px 10px 0px 10px'}}/>
                <Skeleton count={1} style={{width:'170px',height:'14px',margin:'0px 10px 0px 10px'}}/>
                <Skeleton style={{width:'70px',height:'14px',margin:'10px 10px 10px 10px'}}/>
            </div>
            <div className='blog-article-box'>
                <Skeleton style={{width:'290px',height:'150px',margin:'10px 10px 20px 10px'}}/>
                <Skeleton style={{width:'120px',height:'20px',margin:'0px 10px 10px 10px'}}/>
                <Skeleton count={2} style={{width:'270px',height:'20px',margin:'0px 10px 0px 10px'}}/>
                <Skeleton count={1} style={{width:'270px',height:'14px',margin:'0px 10px 0px 10px'}}/>
                <Skeleton count={1} style={{width:'170px',height:'14px',margin:'0px 10px 0px 10px'}}/>
                <Skeleton style={{width:'70px',height:'14px',margin:'10px 10px 10px 10px'}}/>
            </div>
            <div className='blog-article-box'>
                <Skeleton style={{width:'290px',height:'150px',margin:'10px 10px 20px 10px'}}/>
                <Skeleton style={{width:'120px',height:'20px',margin:'0px 10px 10px 10px'}}/>
                <Skeleton count={2} style={{width:'270px',height:'20px',margin:'0px 10px 0px 10px'}}/>
                <Skeleton count={1} style={{width:'270px',height:'14px',margin:'0px 10px 0px 10px'}}/>
                <Skeleton count={1} style={{width:'170px',height:'14px',margin:'0px 10px 0px 10px'}}/>
                <Skeleton style={{width:'70px',height:'14px',margin:'10px 10px 10px 10px'}}/>
            </div>
          
          </div>

          </SkeletonTheme>
       
        }
        </div>

                            
    
  )
}

export default ListArticles