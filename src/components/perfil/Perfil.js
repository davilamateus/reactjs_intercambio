import {useEffect, useState} from 'react'
import './Perfil.css'

const Perfil = ({userPhoto}) => {

  const [photo, setPhoto] = useState(undefined)


  useEffect(()=>{

  },[])



  return (
    <div className='perfil-box'>
      <div style={{backgroundImage: `url(./../../../img/user/${userPhoto})`}}  className="photo-user">
        <img src="./../../../img/icons/btnpurper.svg" alt="Ver mais" />
    
      </div>
    </div>
  )
}

export default Perfil