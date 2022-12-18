import React from 'react'

const Step6 = ({ res, changeStep }) => {
    return (
        <>
            <div className='create-options-box'>
                <h5>Prefiro cidades…</h5>
                <button
                    onClick={() => {
                        res(1)
                        changeStep(1)
                    }}
                    className='button-option01'>Históricas</button>
                <button onClick={() => {
                    res(2)
                    changeStep(1)
                }}
                    className='button-option02'>Modernas</button>
                <button onClick={() => {
                    res(2)
                    changeStep(1)
                }}
                    className='button-option03'>Ambas</button>
            </div>
            <div className='create-options-img opacityOn'>
                <img src={`./../../../img/createoptions/2.svg`} />
            </div>
        </>
    )
}

export default Step6