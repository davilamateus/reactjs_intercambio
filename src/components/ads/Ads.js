import {useEffect,useState} from 'react'
import './Ads.css'
import Api from './../../axios/Axios'

const Ads = ({country}) => {

 const [adsList, setAdsList] = useState(undefined)


useEffect(()=>{

  async function loadAds(){
    await Api.get(`/ads?country=${country}`).then((data)=>{
      setAdsList(data.data[0])
      console.log(data.data)
    })
  }
loadAds()
},[country])
console.log(adsList)



  return (
    <div className='ads-box'>
      {adsList !== undefined?  
      <a  target={'bank'} href={adsList.link}>
          <div style={{backgroundImage : `url(${adsList.img})`}}> </div> 
      </a>
      : ''}
    </div>
  )
}

export default Ads