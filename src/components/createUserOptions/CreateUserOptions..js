import {useState,useEffect} from 'react'
import Api from './../../axios/Axios'
import './createUserOptions.css'
import Messages from '../messages/Messages'


const CreateUserOptions = () => {

  const [user,setUser] = useState(null)
  const [userImg,setUserImg] = useState('3dpersonface.png')
  const [userCityFromCountry, setUserCityFromCountry] = useState([])
  const [file, setFile] = useState(false);
  const [stage,setStage] = useState(0)

  const [cityValue, setCityValue] = useState(null);
  const [countryValue, setCountryValue] = useState(null);
  const [goalValue, setGoalValue] = useState(null);
  const [whenValue, setWhenValue] = useState();
  const token = sessionStorage.getItem('token');


  const [resCity, setResCity] = useState(null);
  const [cityInfor, setCityInfor] = useState(undefined);
  const [resAlreadyKnow,setResAlreadyKnow] = useState(false)
  const [resAlreadyBuy,setResAlreadyBuy] = useState(false)
  const [resQuestion01,setResQuestion01] = useState(false)
  const [resQuestion02,setResQuestion02] = useState(false)
  const [resQuestion03,setResQuestion03] = useState(false)
  const [resQuestion04,setResQuestion04] = useState(false)
  const [resQuestion05,setResQuestion05] = useState(false)
  const [resQuestionStage, setResQuestionStage] = useState(-1)



  const [message, setMessage] = useState({}) 
  function closeMessage(){
    setMessage({})
}

  const list = [
    {title:'Tirar passaporte' , category:"documents", description:'Ir na agencia da policia federal mais próxima a minha casa carregando minha certidão de nascimento ou de casamento e a indentidade.'},
    {title:'Comprar passagem' ,category:"shop", description:'Pesquisar nos principais sites a passagem área.'},
    {title:'Reservar acomodação' ,category:"shop", description:'Resevar acomodação temporária ou fixa.'}, 
    {title:'Ir ao médico' , category:"health",description:'Fazer um checkup completo.'}, 
    {title:'Ir ao dentista' ,category:"health", description:'Fazer um checkup completo.'}, 
    {title:'Comprar remédios' , category:"shop",description:'Pegar receitas e comprar os medicamentos.'} , 
  ] 

  const country = [
    {title:'Irlanda', slug:'ie', city:[ {title:'Dublin'},{title:'Cork'},{title:'Galway'},{title:'Limerick'},{title:'Waterford'},]},
    {title:'Canadá', slug:'ca', city:[ {title:'Quebec'},{title:'Ottawa'},{title:'Montreal'},{title:'Toronto'},{title:'Vancouver'},]},
    {title:'Estados Unidos', slug:'eu', city:[ {title:'Quebec'},{title:'Ottawa'},{title:'Montreal'},{title:'Toronto'},{title:'Vancouver'},]},
    {title:'Austrália', slug:'au', city:[ {title:'New York'},{title:'Los Angeles'},{title:'Chicago'},{title:'Denver'},{title:'California'},]},
    {title:'Nova Zelândia', slug:'nz', city:[ {title:'Wellington'},{title:'Christchurch'},{title:'Queenstown'},]},
  ]


  function userCity(value){
      country.map((item)=>{
        if(item.slug == value){
          console.log(item)
          setUserCityFromCountry(item.city)
        }
      })

  }
      useEffect(()=>{
        userCity('selection')
        async function getUser(){

         await Api.get('/user' , { headers: {"Authorization" : `Bearer ${token}`} })
          .then((res) => {
          setUser((res.data))     
        })
      }
      
      getUser()
},[])



const handleInputChange = (event) => {
  setFile(event.target.files[0]);
  
};

useEffect(()=>{
  if(file){
    upload()

  }
},[file])

const upload = (e) => {
  let formData = new FormData();
  formData.append("file", file);
  Api({
    method: "post",
    url: "/user/photo",
    data: formData
  }).then(({ data }) => {
    console.log(data)
    setUserImg(data)

  }).catch(()=>{
    setMessage({title:'Apenas Imagens!', text:'Você deve adicionar apenas arquivos, .jpeg, .jpg, .png.',status:'atention', action:'Fechar'})

  })
};


function nextConfig(){
  if(cityValue == null || countryValue == null || goalValue == null || whenValue == null){
    setMessage({title:'Falta Informações', text:'Por favor preencha os campos com as informações do seu intercâmbio.',status:'atention', action:'Fechar'})
  } else{
    setStage(2)



  }

}

let listUser = []
function addList(value){
  if(listUser.includes(value)){
    listUser.splice(listUser.indexOf(value), 1);
  } else{
    listUser.push(value)
    
  }
  
  console.log(listUser)


}


function addClass(index){

  if(document.querySelector(`.btn-${index} `).classList.contains('todolist-selected')){
    document.querySelector(`.btn-${index}`).classList.remove('todolist-selected')  
  
  } else{
    document.querySelector(`.btn-${index}`).classList.add('todolist-selected')
}

}


function createOptions(){

  const body = {city: cityValue,  country:countryValue, goal:goalValue, lang:'pt-BR', photo:userImg, when:whenValue}
  const bodyCommercial = {responser01:resAlreadyKnow,
    responser02:resAlreadyBuy, 
    responser03:resQuestion01,
    responser04:resQuestion02,
    responser05:resQuestion03,
    responser06:resQuestion04,
    responser07:resQuestion05,}
  const customConfig = {
      headers: {
      'Content-Type': 'application/json',
      "Authorization" : `Bearer ${token}`
      }
  };


  Api.post('/user/useroptions/', body, customConfig).then((res)=>{
  })

  Api.post('/user/commercial/', bodyCommercial, customConfig).then((res)=>{
  })

  
  Api.post('/admin/study/create', body, customConfig).then((res)=>{

  })


  listUser.map((item)=>{

    const body = {title: item.title, description:item.description, category:item.category}
    const customConfig = {
        headers: {
        'Content-Type': 'application/json',
        "Authorization" : `Bearer ${token}`
        }
    };


    Api.post('/user/todolist/', body, customConfig).then((res)=>{
      setTimeout(() => {
        window.location.href = '/'
    }, 100);
    })



  })

 
}




let Citys = [
  {country:'ie',city:"Dublin", question01:[0,3,6], question02:[2,1,1], question03:[2,2,0], question04:[2,0,1], question05:[2,1,0]} ,
  {country:'ie',city:"Galway", question01:[2,1,0], question02:[2,1,1], question03:[2,2,0], question04:[2,0,1], question05:[0,1,5]},
  {country:'ie',city:"Limerick", question01:[1,1,0], question02:[0,1,1], question03:[2,0,0], question04:[1,0,1], question05:[0,5,2]},

]

let resultToCity = []

function next(){
  if(resQuestionStage == 5){
  }
  setResQuestionStage(resQuestionStage+1)

}

useEffect(()=>{
  if(resQuestion05 !== false){
      calc()
  }
},[resQuestion05])


function calc(){

      for(let i = 0; i<Citys.length ;i++){
          
          resultToCity.push(Citys[i].question01[resQuestion01] 
          +  Citys[i].question02[resQuestion02] 
          +  Citys[i].question03[resQuestion03] 
          +  Citys[i].question04[resQuestion04] 
          +  Citys[i].question05[resQuestion05] )

      }



}

useEffect(()=>{
  if(resultToCity[0] !== undefined){
      console.log(`Resposta é${resultToCity}`)

     setResCity(Citys[resultToCity.indexOf( resultToCity.reduce(function(prev, current) { 
      return prev > current ? prev : current; 
  }))].city)
          
}
},[resultToCity])


useEffect(()=>{
if(resCity !== null){
  console.log('ksldlfkdl')
  console.log(resCity)
  async function getCityInfor(){
      await Api.get(`/city?city=${resCity}`).then((res)=>{
          setCityInfor(res.data[0])
      })
  }
  getCityInfor()
}
},[resCity])

useEffect(()=>{
if(cityInfor !== undefined){
  console.log(cityInfor)

}
},[cityInfor])
    
  return (
    
    <>
   {message.title !== undefined  ? 
    <Messages title={message.title} text={message.text} action={message.action} status={message.status} closeMessage={closeMessage}/> : ''}    <div className='create-options-box'>{user !== null ? <>
     
     {stage ===0 ? 
     <>
         <div className='question-citys'>

        {resQuestionStage === -1? <>
          <h3>Olá {(user.name).split(' ')[0]}!</h3>
        <p>Bem vindo a ferramenta que vai te ajudara realizar seu sonho de intercambista.
          <br /> <br/>Vamos começar te fazendo algumas perguntas.
        </p>
            <span>
            <h5>Você já sabe qual pais e cidade ir?</h5>
            <button onClick={()=>{ setResAlreadyKnow(true)
                next() }} className='button-option01'>Sim</button>
            <button onClick={()=>{
             setResQuestionStage(1)}}className='button-option02'>Não</button>

        </span>
        
        </>:''}

        {resQuestionStage === 0? <>
          <h3>Legal! {(user.name).split(' ')[0]}!</h3>
        <p>Bem vindo a ferramenta que vai te ajudara realizar seu sonho de intercambista.
          <br /> <br/>Vamos começar te fazendo algumas perguntas.
        </p>
            <span>
            <h5>Você já comprou o seu curso??</h5>
            <button onClick={()=>{setStage(1) 
            setResAlreadyBuy(true)
                }} className='button-option01'>Sim</button>
            <button onClick={()=>{setResQuestion01(1)
             setStage(1) }}className='button-option02'>Não</button>

        </span>
        
        </>:''}
        {resQuestionStage === 1 ?
        
        <span>
                  <h3>Legal!</h3>
        <p>Agora nos diga qual resposta mais se parece com você.
         
        </p>
            <h5>Eu prefiro morar em cidade…</h5>
            <button onClick={()=>{setResQuestion01(0) 
                next()}} className='button-option01'>Pequena</button>
            <button onClick={()=>{setResQuestion01(1)
             next()}}className='button-option02'>Média</button>
            <button onClick={()=>{setResQuestion01(2)
             next()}}className='button-option03'>Grande</button>
        </span>
         :''}
                 {resQuestionStage === 2 ?
        <span>
                  <h3>Legal!</h3>
        <p>Agora nos diga qual resposta mais se parece com você.
         
        </p>
            <h5>Viajar para outros países durante o intercambio é…</h5>
            <button onClick={()=>{setResQuestion02(0)
             next()}} className='button-option01'>Essencial</button>
            <button onClick={()=>{setResQuestion02(1)
             next()}}className='button-option02' >Diferencial</button>
            <button onClick={()=>{setResQuestion02(2)
             next()}}className='button-option03'>Inrelevante</button>
        </span>
         :''}
                 {resQuestionStage === 3?
        <span>
                            <h3>Legal!</h3>
        <p>Agora nos diga qual resposta mais se parece com você.
         
        </p>
            <h5>Quando se trata de dias frios eu…</h5>
            <button onClick={()=>{setResQuestion03(0)
             next()}} className='button-option01'>Eu amo</button>
            <button onClick={()=>{setResQuestion03(1)
             next()}}className='button-option02' >Não me importo</button>
            <button onClick={()=>{setResQuestion03(2)
             next()}}className='button-option03'>Detesto</button>
        </span>
         :''}
                 {resQuestionStage === 4 ?
        <span>
                            <h3>Legal!</h3>
        <p>Agora nos diga qual resposta mais se parece com você.
         
        </p>
            <h5>Prefiro cidades…</h5>
            <button onClick={()=>{setResQuestion04(0)
             next()}} className='button-option01'>Históricas</button>
            <button onClick={()=>{setResQuestion04(1)
             next()}}className='button-option02' >Modernas</button>
            <button onClick={()=>{setResQuestion04(2)
             next()}}className='button-option03'>Ambas</button>
        </span>
         :''}
                 {resQuestionStage === 5 ?
        <span>
                            <h3>Legal!</h3>
        <p>Agora nos diga qual resposta mais se parece com você.
         
        </p>
            <h5>Me interesso mais por…</h5>
            <button onClick={()=>{setResQuestion05(0)
             next()}} className='button-option01'>Baladas</button>
            <button onClick={()=>{setResQuestion05(1)
             next()}} className='button-option02' >Trilhas e acampamentos</button>
            <button onClick={()=>{setResQuestion05(2)
             next()}}className='button-option03'>Ficar em casa</button>
        </span>
         :''}
                          {cityInfor !== undefined?
        <div>
          <h3>Eba! {(user.name).split(' ')[0]}!</h3>
        <p>De acordo com nosso questionário a cidade que mais se adapta a sua personalidade é {cityInfor.title}.
        </p>
             <div style={{backgroundImage:`url(${cityInfor.img})`}} className="city-img"></div>   
             <div className="city-header">
                 <h3>{cityInfor.title}</h3>
                 <div className="city-country">
                  <h5>{cityInfor.country.title}</h5>
                  <div style={{backgroundImage:`url(${cityInfor.country.flag})`}} className="city-country-flag"></div>

                 </div>

              </div>          

            <p className='city-description'>{cityInfor.description}</p>
            <button className='btn-success space-button' onClick={()=>{setStage(1)}}>Continuar</button>
        </div>
         :''}
    </div>
      </> : ''}
      {stage == 1 ?     
      <>  <div className='space'></div>
         <h3>Olá {(user.name).split(' ')[0]}!</h3>
        <p>Agora vamos configurar o seu “Dashboard”.</p>
        <form >
          <label>
            <h5>Adicione uma photo sua.</h5>
              <div className='photouser-box' style={{backgroundImage: `url("../../../img/user/${userImg}")`}}>
                <div style={{backgroundImage: `url("../../../img/icons/photo.png")`}}>
                    <input  onChange={(e)=>{handleInputChange(e)}} type="file" name="photo" />
                </div>
              </div>
          </label>
          <label>
            <h5>Qual pais você vai?</h5>
            <select onChange={(e)=>{userCity(e.target.value)
                                    setCountryValue(e.target.value)}} name="country"> 
                        <option value={undefined}>Selecione um pais</option>

                {country.map((item)=>(
                  <option key={item.slug} value={item.slug}>{item.title}</option>
                ))}
            </select>
          </label>
          <label>
            <h5>Qual a cidade?</h5>
            <select onChange={(e)=>{setCityValue(e.target.value)}} name="city">
                  <option value={undefined}>Selecione uma cidade</option>
                {userCityFromCountry.map((item)=>(
                  <option key={item.title} value={item.title}>{item.title}</option>
                ))}
            </select>
          </label>
          <label>
                  <h5>Quando pretente ir?</h5>
                  <input onChange={(e)=>{setWhenValue(e.target.value)}} type="date" name="data"  />
          </label>
          <label>
            <h5>Quanto R$ você pretende gastar?</h5>
            <input onChange={(e)=>{setGoalValue(e.target.value)}} className='input-money' type="number" placeholder='R$ 3000'/>
          </label>
        </form>
          <button
                className={`btn-success space-button`}
                onClick={()=>{nextConfig()}}>Avançar</button>
                </>
                :'' }
                {stage ==2 ?
          <>
            <h3>Estamos quase lá!</h3>

            <h5>Lista de tarefas.</h5>
            <p>Por fim vamos te da algumas sugestões detarefas para realizar seu plano.</p>
            
    
              {list.map((item,index)=>(
                <button className={`todolist-item-box btn-${index} `}onClick={()=>{addList(item) 
                  addClass(index)}} key={item.title}>
                    <div className={`todolist-color-${item.category}`}></div>
                    <div className="todolist-text">
                        <div className="todolist-status">
                          <div className='todolist-status-open'></div>
                          <p>Open</p>
                        </div>
                        <div className="todolist-container">
                          <p>{item.title}</p>

                          {item.description.split('') !== undefined ? 
                          <p className="todolist-description">
                            
                            {item.description.split('').length < 37 ? item.description :
                            item.description.split('').slice(0,40).join('') +'...'
                          }
                          </p>
                          :''}

                    </div>

                    </div>
                  </button>
                  ))}
                  <p>Lembrando que você poderá adicionar, editar, excluir essas e outras tarefas.</p>
                  <button
                className={`btn-success space-button`}
                onClick={()=>{createOptions()}}>Finalizar</button>
           </>
               
                :''}
        </>
        :''}
    </div>

    </>
  )
}

export default CreateUserOptions