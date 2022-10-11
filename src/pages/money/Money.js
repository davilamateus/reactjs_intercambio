import {useState} from 'react'
import MoneyChart from '../../components/money/MoneyChart'
import MoneySimulator from '../../components/money/MoneySimulator'
import './MoneyPage.css'

const Money = () => {
  const [interval,setInterval] = useState(7)
  const [moneyNow,setMoneyNow] = useState(0)


  function setMoney(value){
    setMoneyNow(value)

  }
  console.log(moneyNow)

  return (
    <div className='money-page'>
      <div className="money-select">
            <select onChange={(e)=>{setInterval(e.target.value)}}>
                      <option value="7">7 Dias</option>
                      <option value="15">15 Dias</option>
                      <option value="30">30 Dias</option>
                    </select>
      </div>
      <div className="money-table">
          {interval== 7 ?  <MoneyChart days={7} setMoney={setMoney} />:''} 
          {interval== 15 ?  <MoneyChart days={15} setMoney={setMoney} />:''} 
          {interval== 30 ?  <MoneyChart days={30} setMoney={setMoney} />:''} 

      </div>
      <div className="money-simulator">
       {moneyNow !== 0 ?<MoneySimulator moneyNow={moneyNow} /> :''} 
      </div>

    </div>
  )
}

export default Money