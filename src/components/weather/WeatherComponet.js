import {useState, useEffect} from 'react'
import './weather.css'
import 'react-loading-skeleton/dist/skeleton.css'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'


const WeatherComponet = ({city,country}) => {


    const listCountry = [{slug:'ie', title:'Ireland'}]
    const [weather, setWeather] = useState(false)
    const [loading,setLoading]  = useState(false)

    const countrySlug = ['ie',]
    const countryTitle = ['Irlanda',]

    useEffect(()=>{


        async function requestApi () {

            if(city !== undefined && country !== undefined){
                console.log(countrySlug[country-1])
                let  api = `https://api.openweathermap.org/data/2.5/weather?q=${city},${countrySlug[country-1]}&appid=82dc6076ac2dc00fcd49a3b1d3f698fc`
                fetch(api)
                        .then(response => response.json())
                        .then(result => {
                            setWeather(result)
                            setLoading(true)})
                        .catch((error)=>{

                            setTimeout(() => {
                                requestApi()
                                console.log('Try Again')
                            }, 5000);
                        })

            }
         }
     
         
         requestApi()

         
        },[country])
        


  return (
    <SkeletonTheme baseColor="var(--8)" highlightColor="var(--11)">
       <div className='city-div'>
        <div className="city-box">
            <>
                <h1>{city ||  <Skeleton style={{width:'90px',height:'50px'}}  count={1} />} </h1> 
                <p>{countryTitle[country-1]||  <Skeleton style={{width:'70px',height:'20px'}}  count={1} /> } </p>  
            </>

        </div>
       <div className='weather-box'>
        {loading == true? 
            <>
                <img height={'30px'} src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={weather.weather[0].main} />
                <h1>{`${parseFloat((weather.main.temp)-273.15).toFixed(1)}°`}</h1> 
                <p>{weather.weather[0].main || <Skeleton style={{width:'50px',height:'20px'}}/>}</p>
            </>
        : 
            <>
            <Skeleton style={{width:'30px',height:'30px'}}/>
            <Skeleton style={{width:'90px',height:'50px'}} count={1} />
            <Skeleton style={{width:'60px',height:'30px'}} count={1} />
            </>}

             </div>
        </div>
        </SkeletonTheme>
  )
}

export default WeatherComponet