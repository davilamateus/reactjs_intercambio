import React from 'react'

const Step8 = ({userName, cityInfor,changeStep}) => {



    return (
        <>

            <div className='create-options-box'>
            <h3>Eba! {(userName).split(' ')[0]}!</h3>
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
            <button className='btn-success space-button' onClick={() => { changeStep(1) }}>Continuar</button>
            </div>
            <div className='create-options-img '>
                <img src={`./../../../img/createoptions/6.svg`} />
            </div>
        </>
    )
}

export default Step8