import React from 'react'
import './CreateUserOptions.css'
import CreateUserOptionsComponent from '../../components/createUserOptions/CreateUserOptions.'


const CreateUserOptions = () => {
  return (
    <div className='create-options-page'>
        <div className="create-options-left">
          <CreateUserOptionsComponent/>
        </div>
        <div className="create-options-right">
          <img src="./../../../img/3dperson2.png"  />
        </div>
    </div>
  )
}

export default CreateUserOptions