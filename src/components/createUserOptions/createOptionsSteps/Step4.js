import React from 'react'

const Step4 = ({ res, changeStep }) => {
    return (
        <>
            <div className='create-options-box'>
                <h5>Viajar para outros países durante o intercambio é…</h5>
                <button
                    onClick={() => {
                        res(1)
                        changeStep(1)
                    }}
                    className='button-option01'>Essencial</button>
                <button onClick={() => {
                    res(2)
                    changeStep(1)
                }}
                    className='button-option02'>Diferencial</button>
                <button onClick={() => {
                    res(2)
                    changeStep(1)
                }}
                    className='button-option03'>Não me importo</button>
            </div>
            <div className='create-options-img opacityOn'>
                <img src={`./../../../img/createoptions/2.svg`} />
            </div>
        </>
    )
}

export default Step4