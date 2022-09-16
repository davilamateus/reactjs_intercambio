import React, { useEffect, useState } from 'react'
import './messages.css'

const Messages = ({title, text, status, action, closeMessage}) => {
    const [animation,setAnimation] = useState('')
    const [bgAnimation,setBgAnimation] = useState('')


    useEffect(()=>{
            setTimeout(() => {
                setAnimation('message-box-animation')
                setBgAnimation('message-bg-animation')
                
            }, 10);
    },[])


  return (
    <div className='message-page'>
        <div className={`message-page-bg ${bgAnimation}`} onClick={()=>{closeMessage()}}></div>
        <div className={`message-box ${animation}`}  >
            <h3>{title}</h3>
            <p>{text}</p>
            <button
            className={`btn-${status} space-button`}
             onClick={()=>{closeMessage()}}>{action}</button>
        </div>
    </div>
  )
}

export default Messages