import {useState, useEffect} from 'react'
import './weather.css'

const WeatherComponet = ({city,country}) => {


    const listCountry = [{slug:'ie', title:'Ireland'}]
    const [countryTitle, setCountryTitle] = useState('')
    const [weather, setWeather] = useState(false)

    useEffect(()=>{


        async function requestApi () {
             let  api = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=82dc6076ac2dc00fcd49a3b1d3f698fc`
             fetch(api).then(response => response.json()).then(result => setWeather(result)).catch(()=>{setWeather(false)});
         }
     
         
         requestApi()


         listCountry.map((item)=>{
            if(item.slug === country){
                setCountryTitle(item.title)
            }
         })

         
        },[country])
        


  return (
      <div>
       <div className='city-div'>
        <div className="city-box">
            <h1>{city}</h1>
            <p>{countryTitle}</p>
        </div>
       { weather.weather!== undefined ? 
       <div className='weather-box'>
            <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={weather.weather[0].main} />
            <h1>{`${parseFloat((weather.main.temp)-273.15).toFixed(1)}°`}</h1>
            <p>{weather.weather[0].main}</p>
       </div>

            :<h1>.....</h1>}
        </div>
    </div>
  )
}

export default WeatherComponet