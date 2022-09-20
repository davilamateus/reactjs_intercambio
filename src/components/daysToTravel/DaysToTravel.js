import {useState,useEffect} from 'react'
import './daysToTravel.css'

const DaysToTravel = ({city, when}) => {



  const [days,setDays] = useState(0);
  const [calcDays,setCalcDays] = useState(0);

 useEffect(()=>{
   const whenUser = new Date(when).getTime();
   const now = new Date().getTime();

   console.log(whenUser)
   console.log(now)
   setCalcDays((whenUser-now))
   console.log(when)
  },[when])
  
  
  useEffect(()=>{
    setDays(Math.ceil(calcDays/86400000))

  },[calcDays])
  

  return (
    <div className='daysToTravel-box'>
      <h4>Você estará em <span className='daysToTravel-city'>{city}</span></h4>
      <h1>{days}</h1>
      <h4>dias.</h4>
    </div>
  )
}

export default DaysToTravel



