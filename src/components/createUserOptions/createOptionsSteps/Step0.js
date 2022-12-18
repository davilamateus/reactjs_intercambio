
const Step0 = ({ userName, changeStep }) => {


  return (
    <>

      <div className='create-options-box'>
        <h3>Olá {(userName).split(' ')[0]}!</h3>
        <p>Bem vindo a ferramenta que vai te ajudar a realizar seu sonho de intercambista.
          <br />Queremos te oferecer a melhor experiência, por isto vamos lhe fazer algumas perguntas, para configuramos o seu ‘Dashboard’.
        </p>
        <button onClick={() => changeStep(1)} className="btn-success">Continuar</button>
      </div>
      <div className='create-options-img'>
        <img src={`./../../../img/createoptions/0.svg`} />
      </div>
    </>
  )
}

export default Step0