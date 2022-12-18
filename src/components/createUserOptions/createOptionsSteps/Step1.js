
const Step1 = ({ res, changeStep }) => {


    return (
        <>

            <div className='create-options-box'>
                <h5>Você já sabe qual pais e cidade ir?</h5>
                <button
                    onClick={() => {
                        res(1)
                        changeStep(1)
                    }}
                    className='button-option01'>Sim</button>
                <button onClick={() => {
                    res(2)
                    changeStep(2)
                }}
                    className='button-option02'>Não</button>
            </div>
            <div className='create-options-img opacityOn'>
                <img src={`./../../../img/createoptions/skate.svg`} />
            </div>
        </>
    )
}

export default Step1