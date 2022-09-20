import {useEffect,useState} from 'react'
import './Study.css'
import Api from './../../axios/Axios'


const Study = () => {

  const [listStudy, setListStudy] = useState(undefined);
  const [itemCount,setItemCount]= useState(0)
  const [page,setPage]= useState(1)
  const [responserStatus, setResponserStatus] = useState(false)



  
  const synth = window.speechSynthesis;
  
  
  function speak(value) {
    const text = value.split('')
    const index = text.findIndex((item) => item == '“')
    const text2 = text.slice(index,1000)
    const text3 = (text2.join(''))

    
    const voices = synth.getVoices();
    const utterThis = new SpeechSynthesisUtterance(text3);
    utterThis.lang = 'en-US';
    utterThis.voice = voices[15];
    if (synth.speaking) {
      synth.cancel();
    }
    utterThis.addEventListener('error', () => {
      console.error('SpeechSynthesisUtterance error');
    });
    utterThis.rate = 0.6;
    synth.speak(utterThis);

  }

  const token = sessionStorage.getItem('token');
  async function loadList(){

    const customConfig = {
      headers: {
      'Content-Type': 'application/json',
      "authorization" : `Bearer ${token}`
      }
  };
    await Api.get(`/study?page=${page}`,customConfig).then((data)=>{
      
      setListStudy(data.data)
      
      console.log('carregou')
    })
  }
  useEffect(()=>{


    loadList()
    
    
  },[])
  
  async function editStudy(level){
    setResponserStatus(false)
    if(itemCount == 19){
      loadList()
      setItemCount(0)
    } else{
      setItemCount(itemCount+1)
  
      const body = {level: level, questionId:listStudy[itemCount].id}
  
      const token = sessionStorage.getItem('token');
      const customConfig = {
        headers: {
          'Content-Type': 'application/json',
          "authorization" : `Bearer ${token}`
        }
      };
      console.log(customConfig)
      await Api.patch(`/study`,body, customConfig).then((data)=>{
        
        console.log(data)
      
      })

    }
  }




  return (
    <div className='study-box'>
                 <div className="box-header">
                <h6>Pratique o seu inglês</h6>
                <img src="./../../../img/icons/btnpurper.svg" alt="Adicionar" />
          </div>
          {listStudy !== undefined? <>
          
            <div>
              <div className='study-container'>
                  {responserStatus === true? <p>{listStudy[itemCount].portuguese}</p>: <p></p>}
                  <div>
                      <h2>{listStudy[itemCount].english}</h2>
                      <button onClick={()=>{speak(listStudy[itemCount].english)}} className="study-listen">
                           <img src="./../../../img/icons/iconlisten.svg" />
                      </button>

                  </div>
              </div>
              <div className="study-btn-levels">
                  <button className='study-btn-trans' onClick={()=>{setResponserStatus(true)}}>Ver tradução</button>
                  <button className='study-btn-hard' onClick={()=>{editStudy(2)}}>Dificl</button>
                  <button className='study-btn-medium' onClick={()=>{editStudy(1)}}>Médio</button>
                  <button  className='study-btn-easy'onClick={()=>{editStudy(0)}}>Fácil</button>

              </div>
            </div>

          </>
          
          
          
          
          :<></>}
    </div>
  )
}

export default Study