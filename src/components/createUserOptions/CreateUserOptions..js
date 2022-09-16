import {useState,useEffect} from 'react'
import Api from './../../axios/Axios'
import './createUserOptions.css'
import Messages from '../messages/Messages'


const CreateUserOptions = () => {

  const [user,setUser] = useState(null)
  const [userImg,setUserImg] = useState('3dpersonface.png')
  const [userCityFromCountry, setUserCityFromCountry] = useState([])
  const [file, setFile] = useState(false);
  const [stage,setStage] = useState(1)

  const [cityValue, setCityValue] = useState(null);
  const [countryValue, setCountryValue] = useState(null);
  const [goalValue, setGoalValue] = useState(null);
  const [whenValue, setWhenValue] = useState();
  const token = sessionStorage.getItem('token');



  const [message, setMessage] = useState({}) 
  function closeMessage(){
    setMessage({})
}

  const list = [{title:'Tirar passaporte' , description:'Colocar uma descrição.'},{title:'Comprar passagem' , description:'Colocar uma descrição.'},{title:'Reservar acomodação' , description:'Colocar uma descrição.'}, {title:'Ir ao médico' , description:'Colocar uma descrição.'}, {title:'Ir ao dentista' , description:'Colocar uma descrição.'}, {title:'Comprar remédios' , description:'Colocar uma descrição.'} , {title:'Vacinar' , description:'Colocar uma descrição.'}] 

  const country = [
    {title:'Selecione um pais', slug:null, city:[{title:'Selecione uma cidade'}]},
    {title:'Irlanda', slug:'ireland', city:[{title:'Selecione uma cidade'},{title:'Dublin'},{title:'Cork'},{title:'Galway'},{title:'Limerick'},{title:'Waterford'},]},
    {title:'Canadá', slug:'canada', city:[{title:'Selecione uma cidade'},{title:'Quebec'},{title:'Ottawa'},{title:'Montreal'},{title:'Toronto'},{title:'Vancouver'},]},
    {title:'Estados Unidos', slug:'usa', city:[{title:'Selecione uma cidade'},{title:'Quebec'},{title:'Ottawa'},{title:'Montreal'},{title:'Toronto'},{title:'Vancouver'},]},
    {title:'Austrália', slug:'australia', city:[{title:'Selecione uma cidade'},{title:'New York'},{title:'Los Angeles'},{title:'Chicago'},{title:'Denver'},{title:'California'},]},
    {title:'Nova Zelândia', slug:'newzeland', city:[{title:'Selecione uma cidade'},{title:'Wellington'},{title:'Christchurch'},{title:'Queenstown'},]},
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


    const body = {city: cityValue, country:countryValue, goal:goalValue, lang:'pt-BR', photo:userImg, when:whenValue}
    const customConfig = {
        headers: {
        'Content-Type': 'application/json',
        "Authorization" : `Bearer ${token}`
        }
    };


    Api.post('/user/useroptions/', body, customConfig).then((res)=>{

    })



  }

}

let listUser = []
function addList(value){
  console.log(
    listUser.indexOf(value)

  )
  if(listUser.includes(value)){
    listUser.splice(listUser.indexOf(value), 1);
  } else{
    listUser.push(value)

  }


}


function addClass(index){

  if(document.querySelector(`.btn-${index} `).classList.contains('btn-selected')){
    document.querySelector(`.btn-${index}`).classList.remove('btn-selected')  
  
  } else{
    document.querySelector(`.btn-${index}`).classList.add('btn-selected')
}

}


function createToDoList(){

  listUser.map((item)=>{

    const body = {title: item.title, description:item.description}
    const customConfig = {
        headers: {
        'Content-Type': 'application/json',
        "Authorization" : `Bearer ${token}`
        }
    };


    Api.post('/user/todolist/', body, customConfig).then((res)=>{
      console.log(res)
      setTimeout(() => {
        window.location.href = '/'
    }, 1000);
    })



  })
  console.log(listUser)
      
}

  return (
    <>
   {message.title !== undefined  ? 
    <Messages title={message.title} text={message.text} action={message.action} status={message.status} closeMessage={closeMessage}/> : ''}    <div className='create-options-box'>{user !== null ? <>
      {stage == 1 ?     
      <>
        <h2>Olá {(user.name).split(' ')[0]}!</h2>
        <p>Bem vindo a ferramenta que vai te ajudara realizar seu sonho de intercambista.</p>
        <p>Agora vamos configurar o seu “Dashboard”.</p>
        <div className="space-medium"></div>
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
                {country.map((item)=>(
                  <option key={item.slug} value={item.slug}>{item.title}</option>
                ))}
            </select>
          </label>
          <label>
            <h5>Qual a cidade?</h5>
            <select onChange={(e)=>{setCityValue(e.target.value)}} name="city">
              
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
                :
          <>
            <h2>Estamos quase lá!</h2>

            <h5>Lista de tarefas.</h5>
            <p>Por fim vamos te da algumas sugestões detarefas para realizar seu plano.</p>
            
    
              {list.map((item,index)=>(
                <button className={`btn-selections btn-${index} `}onClick={()=>{addList(item) 
                  addClass(index)}} key={item.title}>{item.title}</button>
                  ))}
                  <p>Lembrando que você poderá adicionar, editar, excluiressas e outras tarefas.</p>
                  <button
                className={`btn-success space-button`}
                onClick={()=>{createToDoList()}}>Finalizar</button>
           </>
                
                
                }
        </>
        :''}
    </div>

    </>
  )
}

export default CreateUserOptions