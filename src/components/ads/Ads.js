import {useEffect,useState} from 'react'
import './Ads.css'
import Api from './../../axios/Axios'
import {useSelector} from 'react-redux'


const Ads = () => {

 const [adsList, setAdsList] = useState(false)
 const userStore = useSelector((state) => state.user);
 const [userCommercial, setUserCommercial] = useState(false)


 useEffect(()=>{
  if(userStore.user!== false){
    getCommercial()
    
  }
},[userStore])

useEffect(()=>{
  if(userCommercial !== false){
    loadAds(userStore.user.countryId)  
  }
},[userCommercial])

const customConfig = {
  headers: {
  'Content-Type': 'application/json',
  "Authorization" : `Bearer ${sessionStorage.getItem('token')}`
  }
};

  async function loadAds(country){
    await Api.get(`/ads?country=${country}&commercial=${userCommercial}`).then((data)=>{
      setAdsList(data.data[0])

    })
  }
  async function getCommercial(){
    await Api.get(`/user/commercial/`, customConfig ).then((data)=>{
      setUserCommercial(data.data[0].responser02)

    })
  }



  return (
    <div className='ads-box'>
      {adsList !== false?  
      <>
          <a className='ads-web' target={'bank'} href={adsList.link}>
              <div style={{backgroundImage : `url(${adsList.imgWeb})`}}> </div> 
          </a>
           <a  className='ads-mobile'  target={'bank'} href={adsList.link}>
              <div style={{backgroundImage : `url(${adsList.imgMobile})`}}> </div> 
          </a>
      </>
      
      : ''}
    </div>
  )
}

export default Ads