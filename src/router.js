import {BrowserRouter, Route, Routes  } from 'react-router-dom';
import Login from './pages/login/Login';
import ConfirmEmail from './pages/confirm-email/confirmEmail';
import Home from './pages/home/Home';
import ForgetPassword from './pages/forget-password/ForgetPassword';
import CreateUserOptions from './pages/createUserOptions/CreateUserOptions';
import ToDoList from './pages/toDoList/ToDoList';
import Money from './pages/money/Money';
import Finance from './pages/finance/Finance';
import Blog from './pages/blog/Blog';
import User from './pages/user/User';
import {useEffect, useState} from 'react'
import Header from './components/header/Header';
import Style from './components/Style/Style'
import Articles from './pages/blog/Articles';
import NavegationDiv from './components/navegation/NavegationDiv'
import Api from './axios/Axios';


const Routers = () => {
  const [use,setUser] = useState()

  useEffect(()=>{
    getOptions()
    async function getOptions(){
      const config = {
        
        headers: { Authorization: `Bearer ${window.sessionStorage.getItem('token')}` }
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

  return (
    
   
    <BrowserRouter>
        <Routes>
            <Route element={<Login/>} path='/login' />
            <Route element={<ConfirmEmail/>} path='/confirm-email/:token' />
            <Route element={<ForgetPassword/>} path='/forget-password/:token' />
            <Route element={<CreateUserOptions/>} path='/createuseroptions' />
                    <Route element={<><Header/><NavegationDiv/> <Home/>  </>} path='/' />
                    <Route element={<><Header/><NavegationDiv/><ToDoList/> </>} path='/listadetarefas' />
                    <Route element={<><Header/><NavegationDiv/><Money/>  </>} path='/cotacao' />
                    <Route element={<><Header/><NavegationDiv/><Finance/> </>} path='/financeiro' />
                    <Route element={<><Header/><NavegationDiv/><Blog/> </>} path='/blog/category/:id' />
                    <Route element={<><Header/><NavegationDiv/><Blog/> </>} path='/blog/search/:search' />
                    <Route element={<><Header/><NavegationDiv/><Articles/> </>} path='/blog/article/:article' />
                    <Route element={<><Header/><NavegationDiv/><Blog/> </>} path='/blog/' />
                    <Route element={<><Header/><NavegationDiv/><User/>  </>} path='/minhaconta' />
        </Routes>
    </BrowserRouter>
 

  


  )
}

export default Routers