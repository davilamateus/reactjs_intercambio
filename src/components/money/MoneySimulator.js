import {useState, useEffect} from 'react'
import './MoneySimulator.css'

const MoneySimulator = ({moneyNow}) => {

    const [simulator ,setSimulator] = useState(1)
    const [inputValue,setInputValue] = useState(1000)

    const wise = {title:'Wise', taxa:1.3, others:false, img:'https://www.finder.com/niche-builder/604174075a35c.png'}
    const remessa = {title:'Remessa Online', taxa:1.1, others:10, img:'https://lulufive.com.br/wp-content/uploads/parceiro-remessa-online-1.png'}
    const paypal = {title:'PayPal', taxa:1.2, others:10, img:'https://pngimg.com/uploads/paypal/paypal_PNG22.png'}

let calc = ''
    function converter(){
        if(moneyNow !== undefined){
            if(simulator == 1){
                calc = (inputValue / moneyNow).toFixed(2)
                
            } else{
                calc = (inputValue * moneyNow).toFixed(2)

            }

        }
    }
    converter()

    useEffect(()=>{
        converter()
    },[simulator])



  return (
    <div className='money-simulador-box'>
        <div className="money-simulator-values">
            <h5>Selecione o modo</h5>
            <select onChange={(e)=>{setSimulator(e.target.value)}}>
                <option value="1">BRL para EUR</option>
                <option value="2">EUR para BRL</option>
            </select>
            <h5>Valor</h5>
            <input onChange={(e)=>{(setInputValue(e.target.value))}} type="text" placeholder='1000'/>

        </div>
        <div className="simulator-infors">
            <div className="wise">
                <img src={wise.img} alt={wise.title} />

                <p>Taxa = {wise.taxa}</p>
                <h5>{(calc-(calc)/wise.taxa).toFixed(2)}</h5>
                <p>Total</p>
                <h4>{((calc)/wise.taxa).toFixed(2)}</h4>

            </div>
            <div className="Remessa Online">
                <img src={remessa.img} alt={remessa.title} />

                <p>Taxa = {remessa.taxa}</p>
                <h5>{(calc-(calc)/remessa.taxa).toFixed(2)}</h5>
                <p>Total</p>
                <h4>{((calc)/remessa.taxa).toFixed(2)}</h4>

            </div>
            <div className="Paypal">
                <img src={paypal.img} alt={paypal.title} />

                <p>Taxa = 1.3</p>
                <h5>{(calc-(calc)/paypal.taxa).toFixed(2)}</h5>
                <p>Total</p>
                <h4>{((calc)/paypal.taxa).toFixed(2)    }</h4>

            </div>

        </div>



    </div>
  )
}

export default MoneySimulator