import {useEffect, useState} from 'react'
import './Perfil.css'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import Api from '../../../axios/Axios'
import {useDispatch, useSelector} from 'react-redux'


const Perfil = () => {

  const [loading,setLoading] = useState(false)
  const [user,setUser] = useState([])



  const userStore = useSelector((state) => state.user);
  const cityStore = useSelector((state) => state.city);




  useEffect(()=>{

    if(sessionStorage.getItem('token') ){
      if(userStore.user == false){
      getOptions(sessionStorage.getItem('token'))
      } 
    } else if(localStorage.getItem('token')){
      sessionStorage.setItem('token', localStorage.getItem('token'))
      if(userStore.user == false){
        getOptions(localStorage.getItem('token'))
      }
    } else{ window.location.href = '/login'}

  },[])

  
  async function getOptions(token){
      const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
      await Api.get('/user/useroptions', config)
      .then((data)=>{
        if(data.status==201){
          window.location.href = '/createuseroptions'
        } else if(data.status == 200){
          setStore(data.data)
          setUser(data.data)
          getCity(data.data.cityId)
        } else{
          window.location.href = '/login'

        }
      })
    }

    async function getCity(cityId){
      const config = {
        headers: { Authorization: `Bearer ${sessionStorage.getItem('token')}` }
    };
      await Api.get(`/city?cityId=${cityId}`, config).then((data)=>{
          setCity(data.data)
          setLoading(true)
      })
    }

  

    const dispatch = useDispatch();
    function setStore(user){
      dispatch({
        type: '@user/SET_USER', user
      })
     }
     function setCity(city){
      dispatch({
        type: '@user/SET_CITY', city
      })
  
     }
  
  return (
    <div className='perfil-box'>
      {loading == true? 
        <>
        <div className='perfil-text'>
          <h5>{user.user.name}</h5>
          <p>{cityStore.city.title }</p>
        </div>
          <div style={{backgroundImage: `url(./../../../img/user/${user.photo})`}}  className="photo-user">
            <img src="./../../../img/icons/btnpurper.svg" alt="Ver mais" />
          </div>
      </>
      :
      <SkeletonTheme baseColor="var(--background)" highlightColor="var(--higher)">
        <div style={{textAlign:'right'}}>
            <Skeleton style={{width:'150px',height:'23px',margin:'10px -0px 00px 0px'}}/>
            <Skeleton style={{width:'90px',height:'15px',margin:'5px -0px 00px 0px'}}/>
        </div>
        <Skeleton style={{width:'60px',height:'60px',margin:'10px -0px 00px 0px', borderRadius:'40px'}}/>
        </SkeletonTheme>
      }
    </div>
  )
}
export default Perfil 
