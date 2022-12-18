import {useState,useEffect} from 'react'
import './daysToTravel.css'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'


const DaysToTravel = ({city, when}) => {



  const [days,setDays] = useState(0);
  const [calcDays,setCalcDays] = useState(0);
  const [loading,setLoading] = useState(false)
  

  

 useEffect(()=>{
   const whenUser = new Date(when).getTime();
   const now = new Date().getTime();

   setCalcDays((whenUser-now))
   setLoading(true)
  },[when])
  
  
  useEffect(()=>{
    setDays(Math.ceil(calcDays/86400000))

  },[calcDays])
  

  return (

          <div className='daysToTravel-box'>
            {loading == true ?
            <>
                <h4>Você eseetará em <span className='daysToTravel-city'>{city}</span></h4>
                <h1>{days >= 0? days : 0}</h1>
                <h4>dias.</h4>
            </>
            :        
              <SkeletonTheme baseColor="var(--8)" highlightColor="var(--11)">
                  <Skeleton style={{width:'110px',height:'16px',margin:'10px'}}/>
                  <Skeleton style={{width:'170px',height:'70px',margin:'0px 10px'}}/>
                  <Skeleton style={{width:'110px',height:'16px',margin:'10px'}}/> 
              </SkeletonTheme>}
            </div>
  )
}

export default DaysToTravel



