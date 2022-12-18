import React from 'react'

const Step7 = ({ res, changeStep }) => {
    return (
        <>
            <div className='create-options-box'>
                <h5>Me interesso mais por…</h5>
                <button
                    onClick={() => {
                        res(1)
                        changeStep(1)
                    }}
                    className='button-option01'>Baladas</button>
                <button onClick={() => {
                    res(2)
                    changeStep(1)
                }}
                    className='button-option02'>Trilhas e acampamentos</button>
                <button onClick={() => {
                    res(2)
                    changeStep(1)
                }}
                    className='button-option03'>Ficar em casa</button>
            </div>
            <div className='create-options-img opacityOn'>
                <img src={`./../../../img/createoptions/2.svg`} />
            </div>
        </>
    )
}

export default Step7