import { useEffect, useState } from 'react'
import PhoneInput from 'react-phone-number-input'
import Api from '../../../axios/Axios';
import CardSuggestion from '../../toDoList/CardSuggestion'



const Step9 = ({ userName ,createCommercial}) => {
    const [file, setFile] = useState(false);
    const [userImg, setUserImg] = useState('3dpersonface.png')
    const [message, setMessage] = useState({})
    const [phone, setPhone] = useState()
    const [countrys, setCountrys] = useState([])
    const [cityValue, setCityValue] = useState(null);
    const [countryValue, setCountryValue] = useState(null);
    const [goalValue, setGoalValue] = useState(null);
    const [whenValue, setWhenValue] = useState();
    const [cities, setCities] = useState([])
    const [listToDoList, setListToDoList] = useState([]);
    const [step, setStep] = useState(0)


    useEffect(() => {
        async function getCountrys() {
            await Api.get('/country')
                .then((res) => {
                    setCountrys((res.data))
                })
        }
        getCountrys()
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






    let listUser = []
    function addUserToDoListSection(value) {
      addClassSelectionTodoList(value.id)
      if (listUser.includes(value)) {
        listUser.splice(listUser.indexOf(value), 1);
      } else {
        listUser.push(value)
      }
    }
  
  
  
    function addClassSelectionTodoList(index) {
  
      if (document.querySelector(`.item-${index} `).classList.contains('todolist-selected')) {
        document.querySelector(`.item-${index}`).classList.remove('todolist-selected')
  
      } else {
        document.querySelector(`.item-${index}`).classList.add('todolist-selected')
      }
  
    }
  
  
  
  
      const body = { phone:phone, cityId: cityValue, countryId: countryValue, goal: goalValue, lang: 'pt-BR', photo: userImg, when: whenValue }

      const config = {
        headers: { Authorization: `Bearer ${sessionStorage.getItem('token')}` }
      };
  
      async function createOptions(){
         await Api.post('/user/useroptions/', body, config).then((res) => {
            addListAction()
      
          }).catch((error) => { console.log(error) })

      }


    
      function addListAction(){

          listUser.map((item) => {
            addTodoList(item)
            })
           }
      
   async function addTodoList(item){
    const body = { title: item.title, description: item.description, category: item.category }
    const customConfig = {
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${sessionStorage.getItem('token')}`
      }    }
        await  Api.post('/user/todolist/', body, customConfig).then((res) => {
                setTimeout(() => {
                        window.location.href = '/'
                }, 100);
            })

    
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


    return (
        step === 0 ?
            <>
            <div className='create-option-box'>
                    <div>
                        <h3>Olá {(userName).split(' ')[0]}!</h3>
                        <p>Agora vamos configurar o seu “Dashboard”.</p>
                        <label>
                            <h5>Adicione uma photo sua.</h5>
                            <div className='photouser-box' style={{ backgroundImage: `url("../../../img/user/${userImg}")` }}>
                                <div style={{ backgroundImage: `url("../../../img/icons/photo.png")` }}>
                                    <input onChange={(e) => { handleInputChange(e) }} type="file" name="photo" />
                                </div>
                            </div>
                        </label>
                        <label>
                            <h5>Qual é o seu número?</h5>
                            <PhoneInput
                                placeholder="XXX-XXX-XXX"
                                value={phone}
                                onChange={setPhone}
                                defaultCountry="BR"
                            />
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
                        <button
                            className={`btn-success space-button`}
                            onClick={() => { setStep(1)}}>Avançar</button>
                    </div>
                </div>
                <div className='create-options-img '>
                    <img src={`./../../../img/createoptions/7.svg`} />
                </div>
            </>
            :


            <>
            <div className='create-options-box'>

                <h3>Estamos quase lá!</h3>

                <h5>Lista de tarefas.</h5>
                <p>Por fim vamos te da algumas sugestões detarefas para realizar seu plano.</p>

                <div className="todolist-suggetion-div">
                    {listToDoList.map((item,) => (
                        <div key={item.id} onClick={() => { addUserToDoListSection(item) }} className={`item-${item.id}`} >
                            <div className='todolist-check'>
                            </div>
                            <CardSuggestion item={item} />
                        </div>
                    ))}
                </div>
                <p>Lembrando que você poderá adicionar, editar, excluir essas e outras tarefas.</p>
                <button
                    className={`btn-success space-button`}
                    onClick={() => { 
                        createOptions() 
                        createCommercial()
                        }}>Finalizar</button>
                    </div>
                    <div className="image-create-options">
                    <img src={`./../../../img/createoptions/8.svg`} />
                </div>
            </>

    )
}

export default Step9