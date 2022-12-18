import {useState, useEffect} from 'react'
import './weather.css'
import 'react-loading-skeleton/dist/skeleton.css'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import {useSelector} from 'react-redux'



const WeatherComponet = () => {

    const userStore = useSelector((state) => state.user);
    const cityStore = useSelector((state) => state.city);

    const [when, setWhen] = useState(undefined)
    const city = cityStore.city
    const [weather, setWeather] = useState(false)
    const [loading,setLoading]  = useState(false)
    const [days,setDays] = useState(0);
    const [calcDays,setCalcDays] = useState(0);

    useEffect(()=>{
        if(userStore.user !== undefined){
            setWhen(userStore.user.when)
        }
    },[userStore])




        useEffect(()=>{
            if(city!== false){
                requestApi()
            }
        },[city])

        async function requestApi () {
            let  api = `https://api.openweathermap.org/data/2.5/weather?q=${city.title},${city.country.slug}&appid=82dc6076ac2dc00fcd49a3b1d3f698fc`
            fetch(api)
            .then(response => response.json())
            .then(result => {
                setWeather(result)

            }
                )
                .catch(()=>{
                    setTimeout(() => {
                        requestApi()
                    }, 5000);
                })
                
            }
 
    

  

  

 useEffect(()=>{

    if(when!== undefined){

        const whenUser = new Date(when).getTime();
        const now = new Date().getTime();

        
        setCalcDays((whenUser-now))
    }
  },[when])
  
  
  useEffect(()=>{
    setDays(Math.ceil(calcDays/86400000))

  },[calcDays])

  useEffect(()=>{
    if(when !== undefined && weather!== false){
        setLoading(true)
    }
  },[days, weather])


      return (
        <SkeletonTheme baseColor="var(--background)" highlightColor="var(--higher)">
        <div className='city-div'>
         {loading == true? 
            <>
                 <div className="city-box">
                 <p>Você estará em <span className='daysToTravel-city'>{city.title}</span></p>
                <h1>{days >= 0? days : 0}</h1>
                <p>dias.</p>
                 </div>
            <div className='weather-box'>
                 <img height={'30px'} src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={weather.weather[0].main} />
                 <h4>{`${parseFloat((weather.main.temp)-273.15).toFixed(1)}°`}</h4> 
                 <p>{weather.weather[0].main || <Skeleton style={{width:'50px',height:'20px'}}/>}</p>
              </div>
             </>
         : 
             <>
                 <div className="city-box">
                 <Skeleton style={{width:'130px',height:'16px'}}/>
                <Skeleton style={{width:'50px',height:'25px'}} count={1} />
                <Skeleton style={{width:'35px',height:'15px'}} count={1} />
            </div>
            <div className="weather-box">
                <Skeleton style={{width:'30px',height:'16px'}}/>
                <Skeleton style={{width:'70px',height:'30px'}} count={1} />
                <Skeleton style={{width:'60px',height:'16px'}} count={1} />
                </div>
             </>}
    
         </div>
         </SkeletonTheme>
      )
    }
    
    export default WeatherComponet