import {useState, useEffect} from 'react'
import LastArticles from '../../components/blog/LastArticles'
import ListArticles from '../../components/blog/ListArticles'
import ListCategory from '../../components/blog/ListCategory'
import Seach from '../../components/search/Seach'
import Api from '../../axios/Axios'
import Perfil from '../../components/perfil/Perfil'
import './BlogPage.css'
const Blog = () => {



  const [user,setUser] = useState(undefined)
  let token = ''

  const local = localStorage.getItem('token');
  const session = sessionStorage.getItem('token');
  if(!session){
      if(!local){
          window.location.href = '/login'
      } else{
        token = local
          sessionStorage.setItem('token',local)
      }
  } else{
    token = session



    
  }



  useEffect(()=>{

      getOptions()
      async function getOptions(){
        const config = {
          headers: { Authorization: `Bearer ${token}` }
      };
        await Api.get('/user/useroptions', config).then((data)=>{
          if(!data.data[0]){
            window.location.href = '/createuseroptions'
          } else{
            setUser(data.data[0])

          }
        })
      }
    },[])

  return (
    <>  
      <div className='home-top'>
        <h2 className='dashboard-title'>Blog</h2>
          <Perfil />
      </div>
    <div className='blog-page'>
        <Seach/>
        <ListCategory/>
        <ListArticles user={user}/>
    </div>
</>
  )
}

export default Blog