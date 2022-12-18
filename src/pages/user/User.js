import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import './User.css'
import Api from '../../axios/Axios'
import PhoneInput from 'react-phone-number-input'
import Messages from '../../components/messages/Messages'



const User = () => {
  const [loading, setLoading] = useState(false);
  const user = useSelector((state) => state.user)
  const [cities, setCities] = useState([])
  const [goalValue, setGoalValue] = useState(null);
  const [whenValue, setWhenValue] = useState();
  const [countrys, setCountrys] = useState([])
  const [countryValue, setCountryValue] = useState(null);
  const [cityValue, setCityValue] = useState(null);
  const [userCity, setUserCity] = useState(0)
  const [phone, setPhone] = useState()
  const [userImg, setUserImg] = useState('3dpersonface.png')
  const [file, setFile] = useState(false);
  const [message, setMessage] = useState({})
  const [btnSave, setBtnSave] = useState('Salvar')




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



    getCities()

  }, [countryValue, countrys])


  useEffect(() => {
    if (user.user !== false) {
      setLoading(true);
      setCountryValue(user.user.countryId)
      setCityValue(user.user.cityId)
      setWhenValue(user.user.when)
      setGoalValue(user.user.goal)
      setPhone(user.user.phone)
      setUserImg(user.user.photo)

    }
  }, [user])




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
      setUserImg(data)

    }).catch(() => {
      setMessage({ title: 'Apenas Imagens!', text: 'Você deve adicionar apenas arquivos, .jpeg, .jpg, .png.', status: 'atention', action: 'Fechar' })

    })
  };


  async function save() {

    if (whenValue !== undefined &&phone !== undefined &&goalValue !== '') {
      setBtnSave(<img src="https://www.boutiquejz.com/image/loader.gif" />)
      const config = {
        headers: { Authorization: `Bearer ${sessionStorage.getItem('token')}` }
      };
      const body = { cityId: cityValue, countryId: countryValue, goal: goalValue, lang: 'pt-BR', photo: userImg, when: whenValue, phone: phone }
      await Api.patch('/user/useroptions/', body, config).then((res) => {
        if (res.status === 200) {
          setBtnSave('Alterações salvas')

          setTimeout(() => {
            setBtnSave('Salvar')


          }, 2000);

        }
      }
      )

    } else {
      setMessage({ title: 'Erro de preenchimento', text: 'Verifique todos os campos e tente novamente.', status: 'atention', action: 'Fechar' })

    }




  }


  function closeMessage() {
    setMessage({})
  }


  return (
    <div className='page-user container'>
      {loading === true ?
        <>
          {message.title !== undefined ?
            <Messages title={message.title} text={message.text} action={message.action} status={message.status} closeMessage={closeMessage} /> : ''}
          <div className="page-user-top">

            <div className="user-photo">
              <h3>{user.user.user.name}</h3>
              <p>{user.user.user.email}</p>
              <h5>Minha Foto</h5>
              <div style={{ backgroundImage: `url(./../../../img/user/${userImg})` }} className="photouser-box">
                <div style={{ backgroundImage: `url("../../../img/icons/photo.png")` }}>
                  <input onChange={(e) => { handleInputChange(e) }} type="file" name="photo" />
                </div>              </div>
            </div>
            <div>
              <label>
                <h5>Qual pais você vai?</h5>
                <select
                  onChange={(e) => {
                    setCountryValue(e.target.value)
                  }} name="country">

                  {countrys.map((item) => (
                    item.id == user.user.countryId ?
                      <option key={item.id} value={item.id} selected>{item.title}</option>
                      :
                      <option key={item.id} value={item.id}>{item.title}</option>

                  ))}
                </select>
              </label>
              <label>
                <h5>Qual a cidade?</h5>
                {cities.length > 0 ?
                  <select
                    onChange={(e) => {
                      setCityValue(e.target.value)
                    }}
                    name="city"
                  >
                    {cities.map((item) => (
                      item.id == user.user.cityId ?

                        <option key={item.title} value={item.id} selected>{item.title}</option>
                        :
                        <option key={item.title} value={item.id} >{item.title}</option>

                    ))}
                  </select>
                  : ''}
              </label>
              <label>
                <h5>Quando pretente ir?</h5>
                <input value={whenValue} onChange={(e) => { setWhenValue(e.target.value) }} type="date" name="data" />
              </label>

            </div>
            <div>
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
                <h5>Quanto R$ você pretende gastar?</h5>
                <input value={goalValue} onChange={(e) => { setGoalValue(e.target.value) }} className='input-money' type="number" placeholder='R$ 3000' />
              </label>
              <label>
                <h5>Senha</h5>
                <div className="password-change-btn">
                  <p>********</p>
                  <button>Mudar senha</button>

                </div>
              </label>
              <button onClick={() => { save() }} className="btn-success">
                {btnSave}
              </button>
            </div>
          </div>
          <div className="page-user-bottom"></div>
        </>
        : ''}
    </div>

  )
}

export default User