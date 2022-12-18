import {useEffect, useState} from 'react'
import './ListCategory.css'
import Api from '../../axios/Axios'
import { Link ,useParams} from 'react-router-dom'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'


const ListCategory = () => {

  let params = useParams()
  const category= params.id


    const [categories, setCategories] = useState(undefined);
    const [loading,setLoading] = useState(false)



  
      useEffect(()=>{
  
            async function getCategories(){

                await Api.get('/blog/categories' ).then((data)=>{
                    setCategories(data.data)
                    setLoading(true)
                })
            }
            getCategories()
      
    },[])






  return (


            <div className='blog-list-category container'>
              {loading === true? 
                <ul>  
                    <Link className={category === undefined? 'categorySelected':''} to="/blog"><li>Todas as categorias</li></Link>
                    {categories.map((item)=>(
                      <Link className={category == item.id? 'categorySelected':''} key={item.id} to={`/blog/category/${item.id}`}>  <li >{item.title}</li></Link>
                    ))}
               </ul>
               :
          <SkeletonTheme baseColor="var(--8)" highlightColor="var(--11)" >
            <div style={{display:'flex'}}>
               <Skeleton style={{width:'150px',height:'30px', margin:'10px'}}/>
               <Skeleton style={{width:'150px',height:'30px', margin:'10px'}}/>
               <Skeleton style={{width:'150px',height:'30px', margin:'10px'}}/>
               <Skeleton style={{width:'150px',height:'30px', margin:'10px'}}/>
               <Skeleton style={{width:'150px',height:'30px', margin:'10px'}}/>

            </div>
           </SkeletonTheme>
               
               
               }
            </div>
        

  )
}

export default ListCategory