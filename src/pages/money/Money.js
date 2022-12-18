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

  return (
    <div className='money-page container'>
      <div className="money-select">
      <button className={interval == 7? 'categorySelected' : 'btn-finance-interval'} onClick={()=>{setInterval(7)}} value="7">7 Dias</button>
      <button className={interval == 15? 'categorySelected' : 'btn-finance-interval'} onClick={()=>{setInterval(15)}} value="15">15 Dias</button>
          <button className={interval == 30? 'categorySelected' : 'btn-finance-interval'} onClick={()=>{setInterval(30)}} value="30">30 Dias</button>

      </div>
      <div className="money-table ">
          {interval== 7 ?  <MoneyChart days={7} setMoney={setMoney} />:''} 
          {interval== 15 ?  <MoneyChart days={15} setMoney={setMoney} />:''} 
          {interval== 30 ?  <MoneyChart days={30} setMoney={setMoney} />:''} 

      </div>
      <div className="money-simulator ">
       {moneyNow !== 0 ?<MoneySimulator moneyNow={moneyNow} /> :''} 
      </div>

    </div>
  )
}

export default Money