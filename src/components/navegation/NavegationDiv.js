import React from 'react';
import PageTitle from './pageTitle/PageTitle';
import Perfil from './perfil/Perfil'
import './navegationDiv.css'

const NavegationDiv = () => {
  return (
    <div className='navegationDiv container '>
      <PageTitle/>
      <Perfil/>
    </div>
  )
}

export default NavegationDiv;