import { useState, useEffect } from 'react'
import Api from './../../axios/Axios'
import './createUserOptions.css'
import Messages from '../messages/Messages'
import CardSuggestion from '../toDoList/CardSuggestion'
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'


const CreateUserOptions = () => {

  const [value, setValue] = useState()

  // States User
  const [user, setUser] = useState(null)
  const [userImg, setUserImg] = useState('3dpersonface.png')
  const [userCityFromCountry, setUserCityFromCountry] = useState([])
  const [file, setFile] = useState(false);
  const [cityValue, setCityValue] = useState(null);
  const [countryValue, setCountryValue] = useState(null);
  const [goalValue, setGoalValue] = useState(null);
  const [whenValue, setWhenValue] = useState();
  const [phone, setPhone] = useState();

  //Stage Page
  const [stage, setStage] = useState(0)
  const [cities, setCities] = useState([])
  const [countrys, setCountrys] = useState([])
  const [resCity, setResCity] = useState(null);
  const [cityInfor, setCityInfor] = useState(undefined);
  const [message, setMessage] = useState({})
  const [listToDoList, setListToDoList] = useState([])

  // States Questions
  const [resAlreadyKnow, setResAlreadyKnow] = useState(false)
  const [resAlreadyBuy, setResAlreadyBuy] = useState(false)
  const [resQuestion01, setResQuestion01] = useState(false)
  const [resQuestion02, setResQuestion02] = useState(false)
  const [resQuestion03, setResQuestion03] = useState(false)
  const [resQuestion04, setResQuestion04] = useState(false)
  const [resQuestion05, setResQuestion05] = useState(false)
  const [resQuestionStage, setResQuestionStage] = useState(-1)

  const token = sessionStorage.getItem('token');

  useEffect(() => {
    async function getUser() {
      await Api.get('/user', { headers: { "Authorization": `Bearer ${token}` } })
        .then((res) => {
          setUser((res.data))

        });
    }
    getUser()


    async function getCountrys() {
      await Api.get('/country')
        .then((res) => {
          setCountrys((res.data))
        })
    }
    getCountrys()

    setTimeout(() => {
      animationOpacity('.image-create-options', 100)
      animationOpacity('.button-option01', 100)
      animationOpacity('.button-option02', 200)
      animationOpacity('.button-option03', 300)

    }, 500);

  }, [])



  useEffect(() => {

    // function getCities
    async function getCities() {
      await Api.get(`/cities?countryId=${countryValue}`,)
        .then((res) => {
          setCities((res.data))
        })
    }

    // function getToDoListSuggestion
    async function getToDoListSuggestion() {
      await Api.get(`/todolistsuggestion?countryId=${countryValue}`,)
        .then((res) => {
          setListToDoList((res.data.data))
        })
    }
    if (countryValue !== null) {
      getCities()
      getToDoListSuggestion()
    }
  }, [countryValue])



  function closeMessage() {
    setMessage({})
  }




  // Update Photos
  const handleInputChange = (event) => {
    setFile(event.target.files[0]);

  };

  useEffect(() => {
    if (file) {
      upload()

    }
  }, [file])

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

    }).catch(() => {
      setMessage({ title: 'Apenas Imagens!', text: 'Você deve adicionar apenas arquivos, .jpeg, .jpg, .png.', status: 'atention', action: 'Fechar' })

    })
  };


  function nextConfig() {
    if (cityValue == null || countryValue == null || goalValue == null || whenValue == null) {
      setMessage({ title: 'Falta Informações', text: 'Por favor preencha os campos com as informações do seu intercâmbio.', status: 'atention', action: 'Fechar' })
    } else {
      setStage(2)
    }
  }


  // ToDoList Sujeston





  let listUser = []
  function addUserToDoListSection(value) {
    console.log('teste')
    addClassSelectionTodoList(value.id)
    if (listUser.includes(value)) {
      listUser.splice(listUser.indexOf(value), 1);
    } else {
      listUser.push(value)
    }
    console.log(value.id)
  }



  function addClassSelectionTodoList(index) {

    if (document.querySelector(`.item-${index} `).classList.contains('todolist-selected')) {
      document.querySelector(`.item-${index}`).classList.remove('todolist-selected')

    } else {
      document.querySelector(`.item-${index}`).classList.add('todolist-selected')
    }

  }


  function createOptions() {

    const body = { cityId: cityValue, countryId: countryValue, goal: goalValue, lang: 'pt-BR', photo: userImg, when: whenValue, phone: phone }
    const bodyCommercial = {
      responser01: resAlreadyKnow,
      responser02: resAlreadyBuy,
      responser03: resQuestion01,
      responser04: resQuestion02,
      responser05: resQuestion03,
      responser06: resQuestion04,
      responser07: resQuestion05,
    }
    const config = {
      headers: { Authorization: `Bearer ${sessionStorage.getItem('token')}` }
    };


    Api.post('/user/useroptions/', body, config).then((res) => {

    }).catch((error) => { console.log(error) })

    Api.post('/user/commercial/', bodyCommercial, config).then((res) => {
    })



    listUser.map((item) => {

      const body = { title: item.title, description: item.description, category: item.category }
      const customConfig = {
        headers: {
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${token}`
        }
      };


      Api.post('/user/todolist/', body, customConfig).then((res) => {
        setTimeout(() => {
          // window.location.href = '/'
        }, 100);
      })



    })


  }




  let citiesPoints = [
    { country: 'ie', city: "Dublin", question01: [0, 3, 16], question02: [2, 1, 1], question03: [2, 2, 0], question04: [2, 0, 1], question05: [2, 1, 0] },
    { country: 'ie', city: "Galway", question01: [2, 11, 0], question02: [2, 1, 1], question03: [2, 2, 0], question04: [2, 0, 1], question05: [0, 1, 5] },
    { country: 'ie', city: "Limerick", question01: [13, 1, 0], question02: [0, 1, 1], question03: [2, 0, 0], question04: [1, 0, 1], question05: [0, 5, 2] },

  ]


  function animationOpacity(element, time) {
    setTimeout(() => {
      if (document.querySelector(element)) {
        document.querySelector(element).classList.add('opacityOn')
      }

    }, time);
  }

  function next() {
    animationOpacity('.image-create-options', 100)

    if (stage !== 0) {
    }

    setTimeout(() => {
      setResQuestionStage(resQuestionStage + 1)

    }, 100);



  }

  useEffect(() => {
    setTimeout(() => {

      animationOpacity('.image-create-options', 100)
      animationOpacity('.button-option01', 100)
      animationOpacity('.button-option02', 200)
      animationOpacity('.button-option03', 300)


    }, 10);

  }, [resQuestionStage, stage, cityInfor])

  useEffect(() => {
    if (resQuestion05 !== false) {
      calc()
    }
  }, [resQuestion05])

  let resultToCity = []
  function calc() {

    for (let i = 0; i < citiesPoints.length; i++) {

      resultToCity.push(citiesPoints[i].question01[resQuestion01]
        + citiesPoints[i].question02[resQuestion02]
        + citiesPoints[i].question03[resQuestion03]
        + citiesPoints[i].question04[resQuestion04]
        + citiesPoints[i].question05[resQuestion05])
    }
  }

  useEffect(() => {
    if (resultToCity[0] !== undefined) {
      console.log(`Resposta é${resultToCity}`)
      console.log(citiesPoints)
      let res = citiesPoints[resultToCity.indexOf(resultToCity.reduce(function (prev, current) {
        return prev > current ? prev : current;
      }))]
      setResCity(res)


    }
  }, [resultToCity])


  useEffect(() => {
    if (resCity !== null) {
      console.log('ksldlfkdl')
      console.log(resCity)
      async function getCityInfor() {
        await Api.get(`/city?cityName=${resCity.city}`).then((res) => {
          setCityInfor(res.data)
        })
      }
      getCityInfor()
    }
  }, [resCity])

  useEffect(() => {
    if (cityInfor !== undefined) {
      console.log(cityInfor)

    }
  }, [cityInfor])

  return (

    <>
      {message.title !== undefined ?
        <Messages title={message.title} text={message.text} action={message.action} status={message.status} closeMessage={closeMessage} /> : ''}    <div className='create-options-box'>{user !== null ? <>

          {stage === -1 ?

            <div>

            </div>

            : ''}
          {stage === 0 ?
            <>

              <div className='question-cities'>

                {resQuestionStage === -1 ? <>
                  <div className="image-create-options">
                    <img src={`./../../../img/createoptions/jupping.svg`} />
                  </div>
                  <h3>Olá {(user.name).split(' ')[0]}!</h3>
                  <p>Bem vindo a ferramenta que vai te ajudara realizar seu sonho de intercambista.
                    <br /><br />Vamos começar te fazendo algumas perguntas.
                  </p>
                  <span>
                    <h5>Você já sabe qual pais e cidade ir?</h5>
                    <button onClick={() => {
                      setResAlreadyKnow(true)
                      next()
                    }} className='button-option01'>Sim</button>
                    <button onClick={() => {
                      setResQuestionStage(1)
                    }} className='button-option02'>Não</button>

                  </span>

                </> : ''}

                {resQuestionStage === 0 ? <>
                  <div className="image-create-options">
                    <img src={`./../../../img/createoptions/1.svg`} />
                  </div>
                  <h3>Legal! {(user.name).split(' ')[0]}!</h3>
                  <p>Bem vindo a ferramenta que vai te ajudara realizar seu sonho de intercambista.
                    <br /> <br />Vamos começar te fazendo algumas perguntas.
                  </p>
                  <span>
                    <h5>Você já comprou o seu curso??</h5>
                    <button onClick={() => {
                      setStage(1)
                      setResAlreadyBuy(true)
                    }} className='button-option01'>Sim</button>
                    <button onClick={() => {
                      setResQuestion01(1)
                      setStage(1)
                    }} className='button-option02'>Não</button>

                  </span>

                </> : ''}
                {resQuestionStage === 1 ?


                  <span>
                    <div className="image-create-options">
                      <img src={`./../../../img/createoptions/skate.svg`} />
                    </div>
                    <h3>Legal!</h3>
                    <p>Agora nos diga qual resposta mais se parece com você.

                    </p>
                    <h5>Eu prefiro morar em cidade…</h5>
                    <button onClick={() => {
                      setResQuestion01(0)
                      next()
                    }} className='button-option01'>Pequena</button>
                    <button onClick={() => {
                      setResQuestion01(1)
                      next()
                    }} className='button-option02'>Média</button>
                    <button onClick={() => {
                      setResQuestion01(2)
                      next()
                    }} className='button-option03'>Grande</button>
                  </span>
                  : ''}
                {resQuestionStage === 2 ?
                  <span>
                    <div className="image-create-options">
                      <img src={`./../../../img/createoptions/2.svg`} />
                    </div>
                    <h3>Legal!</h3>
                    <p>Agora nos diga qual resposta mais se parece com você.

                    </p>
                    <h5>Viajar para outros países durante o intercambio é…</h5>
                    <button onClick={() => {
                      setResQuestion02(0)
                      next()
                    }} className='button-option01'>Essencial</button>
                    <button onClick={() => {
                      setResQuestion02(1)
                      next()
                    }} className='button-option02' >Diferencial</button>
                    <button onClick={() => {
                      setResQuestion02(2)
                      next()
                    }} className='button-option03'>Inrelevante</button>
                  </span>
                  : ''}
                {resQuestionStage === 3 ?
                  <span>
                    <div className="image-create-options">
                      <img src={`./../../../img/createoptions/3.svg`} />
                    </div>
                    <h3>Legal!</h3>
                    <p>Agora nos diga qual resposta mais se parece com você.

                    </p>

                    <h5>Quando se trata de dias frios eu…</h5>
                    <button onClick={() => {
                      setResQuestion03(0)
                      next()
                    }} className='button-option01'>Eu amo</button>
                    <button onClick={() => {
                      setResQuestion03(1)
                      next()
                    }} className='button-option02' >Não me importo</button>
                    <button onClick={() => {
                      setResQuestion03(2)
                      next()
                    }} className='button-option03'>Detesto</button>
                  </span>
                  : ''}
                {resQuestionStage === 4 ?
                  <span>
                    <div className="image-create-options">
                      <img src={`./../../../img/createoptions/4.svg`} />
                    </div>
                    <h3>Legal!</h3>
                    <p>Agora nos diga qual resposta mais se parece com você.

                    </p>
                    <h5>Prefiro cidades…</h5>
                    <button onClick={() => {
                      setResQuestion04(0)
                      next()
                    }} className='button-option01'>Históricas</button>
                    <button onClick={() => {
                      setResQuestion04(1)
                      next()
                    }} className='button-option02' >Modernas</button>
                    <button onClick={() => {
                      setResQuestion04(2)
                      next()
                    }} className='button-option03'>Ambas</button>
                  </span>
                  : ''}
                {resQuestionStage === 5 ?
                  <span>
                    <div className="image-create-options">
                      <img src={`./../../../img/createoptions/5.svg`} />
                    </div>
                    <h3>Legal!</h3>
                    <p>Agora nos diga qual resposta mais se parece com você.

                    </p>
                    <h5>Me interesso mais por…</h5>
                    <button onClick={() => {
                      setResQuestion05(0)
                      next()
                    }} className='button-option01'>Baladas</button>
                    <button onClick={() => {
                      setResQuestion05(1)
                      next()
                    }} className='button-option02' >Trilhas e acampamentos</button>
                    <button onClick={() => {
                      setResQuestion05(2)
                      next()
                    }} className='button-option03'>Ficar em casa</button>
                  </span>
                  : ''}
                {cityInfor !== undefined ?
                  <div>
                    <div className="image-create-options">
                      <img src={`./../../../img/createoptions/6.svg`} />
                    </div>
                    <h3>Eba! {(user.name).split(' ')[0]}!</h3>
                    <p>De acordo com nosso questionário a cidade que mais se adapta a sua personalidade é {cityInfor.title}.
                    </p>
                    <div style={{ backgroundImage: `url(${cityInfor.img})` }} className="city-img"></div>
                    <div className="city-header">
                      <h3>{cityInfor.title}</h3>
                      <div className="city-country">
                        <h5>{cityInfor.country.title}</h5>
                        <div style={{ backgroundImage: `url(${cityInfor.country.flag})` }} className="city-country-flag"></div>

                      </div>

                    </div>

                    <p className='city-description'>{cityInfor.description}</p>
                    <button className='btn-success space-button' onClick={() => { setStage(1) }}>Continuar</button>
                  </div>
                  : ''}
              </div>
            </> : ''}
          {stage == 1 ?

            <>
              <div className="image-create-options">
                <img src={`./../../../img/createoptions/7.svg`} />
              </div>

              <div className='space'></div>
              <h3>Olá {(user.name).split(' ')[0]}!</h3>
              <p>Agora vamos configurar o seu “Dashboard”.</p>
              <form >
                <label>
                  <h5>Adicione uma photo sua.</h5>
                  <div className='photouser-box' style={{ backgroundImage: `url("../../../img/user/${userImg}")` }}>
                    <div style={{ backgroundImage: `url("../../../img/icons/photo.png")` }}>
                      <input onChange={(e) => { handleInputChange(e) }} type="file" name="photo" />
                    </div>
                  </div>
                </label>
                <label>
                  <PhoneInput
                    placeholder="Enter phone number"
                    value={value}
                    onChange={e=>setPhone(e.target.value)} />
                </label>
                <label>
                  <h5>Qual pais você vai?</h5>
                  <select onChange={(e) => {
                    setCountryValue(e.target.value)
                  }} name="country">
                    <option value={undefined}>Selecione um pais</option>

                    {countrys.map((item) => (
                      <option key={item.id} value={item.id}>{item.title}</option>
                    ))}
                  </select>
                </label>
                <label>
                  <h5>Qual a cidade?</h5>
                  <select onChange={(e) => { setCityValue(e.target.value) }} name="city">
                    <option value={undefined}>Selecione uma cidade</option>
                    {cities.map((item) => (
                      <option key={item.title} value={item.id}>{item.title}</option>
                    ))}
                  </select>
                </label>
                <label>
                  <h5>Quando pretente ir?</h5>
                  <input onChange={(e) => { setWhenValue(e.target.value) }} type="date" name="data" />
                </label>
                <label>
                  <h5>Quanto R$ você pretende gastar?</h5>
                  <input onChange={(e) => { setGoalValue(e.target.value) }} className='input-money' type="number" placeholder='R$ 3000' />
                </label>
              </form>
              <button
                className={`btn-success space-button`}
                onClick={() => { nextConfig() }}>Avançar</button>
            </>
            : ''}
          {stage == 2 ?
            <>
              <div className="image-create-options">
                <img src={`./../../../img/createoptions/8.svg`} />
              </div>
              <h3>Estamos quase lá!</h3>

              <h5>Lista de tarefas.</h5>
              <p>Por fim vamos te da algumas sugestões detarefas para realizar seu plano.</p>

              <div className="todolist-suggetion-div">
                {listToDoList.map((item,) => (
                  <div key={item.id} onClick={() => { addUserToDoListSection(item) }} className={`item-${item.id}`} >
                    <div className='todolist-check'>
                      <img src="../../../img/icons/checklist.svg" alt="Check" />
                    </div>
                    <CardSuggestion item={item} />
                  </div>
                ))}
              </div>
              <p>Lembrando que você poderá adicionar, editar, excluir essas e outras tarefas.</p>
              <button
                className={`btn-success space-button`}
                onClick={() => { createOptions() }}>Finalizar</button>
            </>

            : ''}
        </>
          : ''}
      </div>

    </>
  )
}

export default CreateUserOptions