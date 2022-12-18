import './home.css'
import BlogDashboard from '../../components/blog/BlogDashboard';
import WeatherComponet from '../../components/weather/WeatherComponet';
import Radio from './../../components/radio//Radio'
import Money from './../../components/money/Money'
import ToDoList from '../../components/toDoList/ToDoListDashboard';
import Ads from './../../components/ads/Ads'
import Finance from './../../components/finance/Finance'
import Study from './../../components/study/Study'
import InforsBtns from '../../components/inforsBtns/InforsBtns';
import { useSelector } from 'react-redux'

const Home = () => {
  const userStore = useSelector((state) => state.user);
  const cityStore = useSelector((state) => state.city);

  /*


  
  
  
  */
 
 
 return (
   <div className='home container'>
      <WeatherComponet />
      <BlogDashboard countryId={cityStore.city.countryId} />
      <Radio country={cityStore.city.countryId} />

      <ToDoList />
      <Money />
      <Finance />
     <Study />
     <Ads />
     <InforsBtns />

    </div>
  )
}

export default Home