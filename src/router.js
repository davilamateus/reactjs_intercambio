import {BrowserRouter, Routes, Route ,Sw} from 'react-router-dom';
import Login from './pages/login/login';
import ConfirmEmail from './pages/confirm-email/confirmEmail';
import Home from './pages/home/Home';
import ForgetPassword from './pages/forget-password/ForgetPassword';
import CreateUserOptions from './pages/createUserOptions/CreateUserOptions';
import ToDoList from './pages/toDoList/ToDoList';
import Money from './pages/money/Money';
import Finance from './pages/finance/Finance';
import Blog from './pages/blog/Blog';
import User from './pages/user/User';
import React from 'react'
import Header from './components/header/Header';
import Style from './components/Style/Style'
import Articles from './pages/blog/Articles';


const Routers = () => {
  return (
    
    <>
    <Style/>
    <BrowserRouter>
        <Routes>
            <Route element={<Login/>} path='/login' />
            <Route element={<ConfirmEmail/>} path='/confirm-email/:token' />
            <Route element={<ForgetPassword/>} path='/forget-password/:token' />
            <Route element={<CreateUserOptions/>} path='/createuseroptions' />
                    <Route element={<><Home/> <Header/></>} path='/' />
                   <Route element={<><ToDoList/> <Header/></>} path='/listadetarefas' />
                    <Route element={<><Money/>  <Header/></>} path='/cotacao' />
                    <Route element={<><Finance/> <Header/></>} path='/financeiro' />
                    <Route element={<><Blog/> <Header/></>} path='/blog/category/:id' />
                    <Route element={<><Blog/> <Header/></>} path='/blog/search/:search' />
                    <Route element={<><Articles/> <Header/></>} path='/blog/article/:article' />
                    <Route element={<><Blog/> <Header/></>} path='/blog/' />
                    <Route element={<><User/> <Header/></>} path='/minhaconta' />
        </Routes>
    </BrowserRouter>
    </>

  


  )
}

export default Routers