import {useEffect,useState} from 'react'
import './Ads.css'
import Api from './../../axios/Axios'

const Ads = ({country}) => {

 const [adsList, setAdsList] = useState(undefined)


useEffect(()=>{

  async function loadAds(){
    await Api.get(`/ads?country=${country}`).then((data)=>{
      setAdsList(data.data[0])

    })
  }
loadAds()
},[country])



  return (
    <div className='ads-box'>
      {adsList !== undefined?  
      <>
          <a className='ads-web' target={'bank'} href={adsList.link}>
              <div style={{backgroundImage : `url(./../../../img/ads/${adsList.imgWeb})`}}> </div> 
          </a>
          <a className='ads-tablet'  target={'bank'} href={adsList.link}>
              <div style={{backgroundImage : `url(./../../../img/ads/${adsList.imgTablet})`}}> </div> 
          </a>
           <a  className='ads-mobile'  target={'bank'} href={adsList.link}>
              <div style={{backgroundImage : `url(./../../../img/ads/${adsList.imgMobile})`}}> </div> 
          </a>
      </>
      
      : ''}
    </div>
  )
}

export default Ads