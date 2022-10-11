import {useState, useEffect, useRef, Key} from 'react'
import './Radio.css'
import Api from './../../axios/Axios'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'


const Radio = ({country}) => {
  const [listRadio,setListRadio] = useState(false)
  const [page, setPage] = useState(0)
  const [radioStatus,setRadioStatus] = useState('play')
  const audioRef = useRef()
  const [volume,setVolume] = useState(50)
  const [loading,setLoading] = useState(false)


useEffect(()=>{

      async function loadRadio(){
        await Api.get(`/radios?countryId=${country}`).then((data)=>{
          setListRadio(data.data)
          setLoading(true)

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
    {listRadio.length> 0 ? 
    <>
      <div style={{backgroundImage: `url("${listRadio[page].img}")`}} className='radio-img'></div>
      <div className="radio-controls">
        <p>Você esta ouvindo</p>
        <h5>{listRadio[page].title}</h5>
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
      :
      <SkeletonTheme baseColor="var(--8)" highlightColor="var(--11)">
          <Skeleton style={{width:'130px',height:'130px',margin:'10px'}}/>
          <div style={{width:'120px', margin:'0 auto', display:'flex', justifyContent:'center',flexDirection:'column'}}>
            <Skeleton style={{width:'90px',height:'16px',margin:'0 auto'}}/>
            <Skeleton style={{width:'110px',height:'26px',margin:'0px 0px'}}/>
            <Skeleton style={{width:'110px',height:'10px',margin:'10px 0px'}}/>
            <div style={{display:'flex', alignItems:'center'}}>
            <Skeleton style={{width:'30px',height:'30px',margin:'0 auto'}}/>
            <Skeleton style={{width:'50px',height:'50px',margin:'0 2px'}}/>
            <Skeleton style={{width:'30px',height:'30px',margin:'0 auto'}}/>

            </div>

          </div>
    </SkeletonTheme>
      
      }
    </div>
  )
}

export default Radio