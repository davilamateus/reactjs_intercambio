import {useEffect, useState} from 'react'
import './Perfil.css'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import Api from '../../axios/Axios'


const Perfil = ({userFather}) => {

  const [loading,setLoading] = useState(false)
  const [user,setUser] = useState([])


  const [photo, setPhoto] = useState(undefined)



    
  useEffect(()=>{
    getOptions()
    async function getOptions(){
      const config = {
        headers: { Authorization: `Bearer ${sessionStorage.getItem('token')}` }
    };
      await Api.get('/user/useroptions', config).then((data)=>{
        if(!data.data[0]){
          window.location.href = '/createuseroptions'
        } else{
          setUser(data.data[0])
          setLoading(true)


        }
      })
    }
  },[])


  useEffect(()=>{
      if(user.id!==undefined && userFather!== undefined){
        userFather(user)

      }
  },[user])


  return (
    <div className='perfil-box'>
      {loading == true? 
        <>
        <div className='perfil-text'>
          <h5>{user.user.name}</h5>
          <p>{user.city}{user.country}</p>
        </div>
          <div style={{backgroundImage: `url(./../../../img/user/${user.photo})`}}  className="photo-user">
            <img src="./../../../img/icons/btnpurper.svg" alt="Ver mais" />
          </div>
      </>
      :
      <SkeletonTheme baseColor="var(--8)" highlightColor="var(--11)">
                    <Skeleton style={{width:'50px',height:'50px',margin:'10px -0px 00px 0px', borderRadius:'40px'}}/>

        </SkeletonTheme>
      }
    </div>
  )
}

export default Perfil