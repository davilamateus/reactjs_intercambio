import React from 'react'

const Step3 = ({ res, changeStep }) => {
    return (
        <>
            <div className='create-options-box'>
                <h5>Eu prefiro morar em cidade…</h5>
                <button
                    onClick={() => {
                        res(1)
                        changeStep(1)
                    }}
                    className='button-option01'>Pequena</button>
                <button onClick={() => {
                    res(2)
                    changeStep(1)
                }}
                    className='button-option02'>Média</button>
                <button onClick={() => {
                    res(2)
                    changeStep(1)
                }}
                    className='button-option03'>Grande</button>
            </div>
            <div className='create-options-img opacityOn'>
                <img src={`./../../../img/createoptions/7.svg`} />
            </div>
        </>
    )
}

export default Step3