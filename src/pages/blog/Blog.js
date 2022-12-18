import {useState, useEffect} from 'react'
import ListArticles from '../../components/blog/ListArticles'
import ListCategory from '../../components/blog/ListCategory'
import Seach from './../../components/blog/search/Seach'
import './BlogPage.css'
import {useSelector} from 'react-redux'

const Blog = () => {
  const [user,setUser] = useState(false)

  const userStore = useSelector((state) => state.user);

  useEffect(()=>{
    if(userStore.user!== false){
      setUser(userStore.user)
    }
  },[userStore])





  return (
    <>  

    <div className='blog-page'>
        <Seach/>
        <ListCategory/>
        <ListArticles user={user}/>
    </div>
</>
  )
}

export default Blog