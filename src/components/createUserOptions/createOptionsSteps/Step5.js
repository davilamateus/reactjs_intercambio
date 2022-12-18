import React from 'react'

const Step5 = ({ res, changeStep }) => {
    return (
        <>
            <div className='create-options-box'>
                <h5>Quando se trata de dias frios eu…</h5>
                <button
                    onClick={() => {
                        res(1)
                        changeStep(1)
                    }}
                    className='button-option01'>Eu amo</button>
                <button onClick={() => {
                    res(2)
                    changeStep(1)
                }}
                    className='button-option02'>Não me importo</button>
                <button onClick={() => {
                    res(2)
                    changeStep(1)
                }}
                    className='button-option03'>Detesto</button>
            </div>
            <div className='create-options-img opacityOn'>
                <img src={`./../../../img/createoptions/3.svg`} />
            </div>
        </>
    )
}

export default Step5