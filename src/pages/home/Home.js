import React from 'react'
import Api from '../../axios/Axios'
import BlogDashboard from '../../components/blog/BlogDashboard';
import Header from '../../components/header/Header';
import {useState, useEffect} from 'react'
import './home.css'
import WeatherComponet from '../../components/weather/WeatherComponet';
import Radio from './../../components/radio//Radio'

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
            window.location.href = '/createuseroptions'
          } else{
            setUser(data.data[0])

          }
        })
      }
    },[])


  return (
    <>  
        <div className='page-container'>
          <WeatherComponet country={user.country} city={user.city}/>
          <BlogDashboard countryId={user.country}/>
          <Radio country={user.country}/>
        </div>
    </>
  )
}

export default Home