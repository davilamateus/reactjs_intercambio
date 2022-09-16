import {useState, useEffect, useRef, Key} from 'react'
import './Radio.css'
import Api from './../../axios/Axios'

const Radio = ({country}) => {
  const [listRadio,setListRadio] = useState(false)
  const [page, setPage] = useState(0)
  const [radioStatus,setRadioStatus] = useState('play')
  const audioRef = useRef()
  const [volume,setVolume] = useState(50)


useEffect(()=>{

      async function loadRadio(){
        await Api.get(`/radios?country=${country}`).then((data)=>{
          setListRadio(data.data)

        })
      }

      loadRadio()


},[country])



function backRadioChange(value){
  if(page-1 ===-1){
    setPage(listRadio.length-1)
  } else{setPage(page+(value))}

}

function nextRadioChange(value){
  if(page+1 === listRadio.length){
    setPage(0)
  } else{setPage(page+(value))}

}

function playStatus(){
  if(radioStatus=='play'){
    setRadioStatus('pause')
    audioRef.current.play()
  } else{
    setRadioStatus('play')
    audioRef.current.pause()

  }
}


function playRadio(){
  console.log('teste')
  
}

useEffect(()=>{
  if(audioRef.current){
    audioRef.current.volume = volume/100

  }

},[volume])


return (
  <div className='radio-box'>
    {listRadio[0] !== undefined ? 
    <>
      <div style={{backgroundImage: `url("${listRadio[page].img}")`}} className='radio-img'></div>
      <div className="radio-controls">
        <p>Você esta ouvindo</p>
        <h4>{listRadio[page].title}</h4>
        <div className="radios-btns-controler">
          <div className="radio-volume">
                   <audio ref={audioRef}   >
                     <source   src={listRadio[0].link} />
                   </audio>
                   <div className='radio-volume-bg'>
                    <div style={{width: volume + '%'}} className="radio-volume-barra"></div>
                  <input  type="range" min="1" max="100"   onChange={(e)=>{setVolume(e.target.value)}}/> 
                   </div>
          </div>
          <div className="radios-bts">
            <img onClick={()=>{backRadioChange(-1)}}src="./../../../img/icons/radio-back.svg" alt="back radio" />
            <img onClick={()=>{playStatus()}} src={`./../../../img/icons/${radioStatus}.svg`} alt={radioStatus} />
            <img onClick={()=>{nextRadioChange(1)}} src="./../../../img/icons/radio-next.svg" alt="next radio" />
          </div>
        </div>
      </div>
      </>
      :<div>adfasdfsdf</div>}
    </div>
  )
}

export default Radio