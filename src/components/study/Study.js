import { useState, useEffect } from 'react'
import Api from './../../axios/Axios'
import './Study.css'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'



const Study = () => {


  const [flashCardsUser, setFlashCardsUser] = useState(null);
  const [flashCardsFilter, setFlashCardsFilter] = useState([]);
  const [findFlashCardsUser, setFindFlashCadsUser] = useState(false)
  const [flashCard, setFlashCard] = useState(false)
  const [oldFlashCard, setOldFlashCard] = useState([])

  const [responserStatus, setResponserStatus] = useState(false)
  const [loading, setLoading] = useState(false)




// estapa 1 pegar lista do usuario
  async function getFlashCadsUser() {
    await Api('/study/user/flashcards', {
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${sessionStorage.getItem('token')}`
      }
    }).then((data) => {
      if(data.data.length >0){
        setFlashCardsUser(data.data)
      } else{
        getMoreFlashCards()
      }
    })
  }
  useEffect(() => {
    getFlashCadsUser()
  }, [])
  

  
  
  // verificar se a lista do usuario esta vazia
  useEffect(()=>{
  
    if(flashCardsUser !== null){
      flashCardsUser.map((item)=>{
        if(item.when < Date.now()){
          // Item atrasado
          setOldFlashCard(prev => [...prev, item])
        } 
      })
      
    }
    
  },[flashCardsUser])
  
  
  useEffect(()=>{

    if(flashCardsUser !== null){
        if(oldFlashCard[0]!== undefined ){
          setFlashCard(oldFlashCard[0])
          setLoading(true)
        } 
        else{
          getMoreFlashCards()
        }

    }

  },[oldFlashCard,flashCardsUser])


  // pegar nova frase 
  async function getMoreFlashCards() {
    console.log('geti')
    await Api('/study/flashcard').then((data) => {
      //alreadyThisFlashCard(data.data[0])
      
    })
  }

  

  // verificar se palavra ja foi feita pelo usuario

  function alreadyThisFlashCard(flashCard) {
    let index = flashCardsUser.findIndex(item => item.flashcardId == flashCard.id);
    if (index <0) {
      setFlashCard({flashCard:flashCard})
      setTimeout(() => {
        //setLoading(true)
      }, 2000);
    } else {
      getMoreFlashCards()
      
    }
  }

  /*

  async function addOrEditFlashCardUser(level) {

    setResponserStatus(false)


    const customConfig = {
      headers: {
        'Content-Type': 'application/json',
        "authorization": `Bearer ${sessionStorage.getItem('token')}`
      }
    };


    // Origigem do item USUARIO
    if (flashCardsFilter.length > 0) {
      const body = { flashcardId: flashCard.flashCard.id, level: level, id: flashCard.flashCard.id }
      await Api.patch(`/study/user/flashcards`, body, customConfig).then((data) => {
        getFlashCadsUser()

      })
    } else {
      const body = { flashcardId: flashCard.flashCard.id, level: level }
      await Api.post(`/study/user/flashcards`, body, customConfig).then((data) => {
        getFlashCadsUser()


      })

    }
  }

  


  useEffect(() => {
    setFlashCard(flashCardsFilter[0])
    if (findFlashCardsUser == true) {
      console.log('lkasdflkasjd')
      console.log(flashCardsFilter)
      if (flashCardsFilter.length > 0) {

      } else {
        //Não existe
        getMoreFlashCards()
      }

    }

  }, [findFlashCardsUser])


// Se nao exitir lista ou todo os elementos estão em dias.


          <button className='study-btn-trans' onClick={() => { setResponserStatus(true) }}>Ver tradução</button>
          <button className='study-btn-hard' onClick={() => { addOrEditFlashCardUser(1) }}>Dificl</button>
          <button className='study-btn-medium' onClick={() => { addOrEditFlashCardUser(3) }}>Médio</button>
          <button className='study-btn-easy' onClick={() => { addOrEditFlashCardUser(flashCard.flashCard.level + 1) }}>Fácil</button>

*/


  const synth = window.speechSynthesis;


  function speak(value) {
    const text = value.split('')
    const index = text.findIndex((item) => item == '“')
    const text2 = text.slice(index, 1000)
    const text3 = (text2.join(''))


    const voices = synth.getVoices();
    const utterThis = new SpeechSynthesisUtterance(text3);
    utterThis.lang = 'en-US';
    utterThis.voice = voices[15];
    if (synth.speaking) {
      synth.cancel();
    }
    utterThis.addEventListener('error', () => {
    });
    utterThis.rate = 0.6;
    synth.speak(utterThis);

  }





  return (
    <div className='study-div'>
      {loading !== false ? <>
        <div className="box-header">
          <h5>Pratique o Idioma</h5>
          <img src="./../../../img/icons/btnpurper.svg" alt="Ver mais" />
        </div>
        <div className="study-text">
          <h5 className='translation'>{flashCard !== false && responserStatus !== false ? flashCard.flashcard.portuguese : ''}</h5>
          <h5>{flashCard !== false ? flashCard.flashcard.original : ''}</h5>
        </div>
        <div className="study-btn-levels">


        </div>
      </>
        : <>
          <SkeletonTheme baseColor="var(--background)" highlightColor="var(--higher)">

            <Skeleton style={{ width: '130px', height: '16px', margin: '10px' }} />
            <Skeleton style={{ width: '280px', height: '36px', margin: '10px ' }} />
            <div className="study-btn-skeletons">
              <Skeleton style={{ width: '110px', height: '26px', margin: '10px' }} />
              <Skeleton style={{ width: '70px', height: '26px', margin: '10px' }} />
              <Skeleton style={{ width: '70px', height: '26px', margin: '10px' }} />
              <Skeleton style={{ width: '70px', height: '26px', margin: '10px' }} />

            </div>

          </SkeletonTheme>


        </>}
    </div>
  )
}

export default Study