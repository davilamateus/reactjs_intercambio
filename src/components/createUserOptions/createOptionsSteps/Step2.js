
const Step2 = ({res,changeStep}) => {
    


    return (
        <>
            <div className='create-options-box'>
                <h5>Você ja comprou um curso?</h5>
                <button 
                    onClick={() => { 
                        res(1) 
                        changeStep(7)
                        }} 
                    className='button-option01'>Sim</button>
                <button onClick={() => {
                            res(2) 
                            changeStep(7)
                            }} 
                       className='button-option02'>Não</button>
            </div>
            <div className='create-options-img opacityOn'>
                <img src={`./../../../img/createoptions/2.svg`} />
            </div>
        </>
    )
}

export default Step2