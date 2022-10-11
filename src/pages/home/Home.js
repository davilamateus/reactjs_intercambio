import Api from '../../axios/Axios'
import BlogDashboard from '../../components/blog/BlogDashboard';
import {useState, useEffect} from 'react'
import './home.css'
import WeatherComponet from '../../components/weather/WeatherComponet';
import Radio from './../../components/radio//Radio'
import Money from './../../components/money/Money'
import ToDoList from '../../components/toDoList/ToDoListDashboard';
import Ads from './../../components/ads/Ads'
import Seach from './../../components/search/Seach'
import Finance from './../../components/finance/Finance'
import Study from './../../components/study/Study'
import DaysToTravel from '../../components/daysToTravel/DaysToTravel';
import InforsBtns from '../../components/inforsBtns/InforsBtns';

const Home = () => {

    const local = localStorage.getItem('token');
    const session = sessionStorage.getItem('token');
    const [user,setUser] = useState([])
    let token = ''

    if(!session){
        if(!local){
            window.location.href = '/login'
        } else{
          token = local
            sessionStorage.setItem('token',local)
        }
    } else{
      token = session



      
    }
    
    useEffect(()=>{
      getOptions()
      async function getOptions(){
        const config = {
          headers: { Authorization: `Bearer ${token}` }
      };
        await Api.get('/user/useroptions', config).then((data)=>{
          if(!data.data[0]){
            //window.location.href = '/createuseroptions'
          } else{
            setUser(data.data[0])

          }
        })
      }
    },[])


    /*
              <Ads country={user.countryId}/>
              <Study/>

              <Money/>
              <Finance goal={user.goal}/>
              <DaysToTravel when={user.when} city={user.city}/>
              <InforsBtns/>
    */

   

  return (
    <>  

        <div className='home container'>
          <WeatherComponet country={user.countryId} city={user.city}/>
          <BlogDashboard countryId={user.countryId}/>
          <Radio country={user.countryId}/>
          <ToDoList/>
        </div>
    </>
  )
}

export default Home