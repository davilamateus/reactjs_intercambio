import {useEffect, useState} from 'react'
import './FInance.css'
import Api from './../../axios/Axios'
import Chart from 'chart.js/auto';



const Finance = ({goal}) => {

  const token = sessionStorage.getItem('token');

  const [finance,setFinance] = useState(undefined)
  const [total,setTotal] = useState(0)
  const [lessToGoal ,setLessToGoal] = useState(0)
  const [porcents ,setPorcents] = useState(0)

  useEffect(()=>{


    const customConfig = {
      headers: {
      'Content-Type': 'application/json',
      "Authorization" : `Bearer ${token}`
      }
  };


    async function loadToDoList(){
      await Api('/user/finance' ,customConfig).then((data)=>{
        setFinance(data.data.data)
      })
    }
    loadToDoList()
  },[])
  


  useEffect(()=>{

    if(finance !== undefined){

        setTotal(calc())
        
      
    }
    
  },[finance])

  function calc(){
    let total = 0
    finance.map((item)=>{
        total = total + item.value
    })
    return total
  }


  useEffect(()=>{
    setLessToGoal((total-goal)*(-1) || 0)
    if(goal !== undefined){
      setPorcents(((total*100)/goal)+"%")

    }
  },[total])
  



  const ctx2 = document.getElementById('myChart2');

  if(lessToGoal !== null & total !== null && ctx2 !== null){

  if(finance!== undefined){
    let chartStatus2 = Chart.getChart("myChart2"); 
    if (chartStatus2 != undefined) {
      chartStatus2.destroy();
    }}
  





  var myChart2 = new Chart(ctx2, {
    type: 'doughnut',
    data: {
        labels: ['Falta', 'Investido'
    ],
        datasets: [{
            backgroundColor:[
                '#F5F4F4',
                '#9EC36E'],
            data: [(lessToGoal) , total],
            borderRadius:[0,12],
            borderWidth:10,
            borderColor: ['#34efae00', '#9EC36E'],
            borderAlign:'center',
            spacing:-2,
        }]
    },
    options: {
        responsive: true,
        plugins: {
            labels: {
                display: false,
            },
            legend: {
                display: false,
            },
        },
        scales: {
            
            y: {
                display: false,
            },
            x: {
                display: false ,
            }           
        }
    },
});
}




  
  return (
    <div className='finance-box'>
      <div className="box-header">
                <h6>Lista de Tarefas</h6>
                <img src="./../../../img/icons/addbtn.svg" alt="Adicionar" />
          </div>
          <div className='finance-container'>
            {finance !== undefined && total? 
            <>
            
                <div className="finance-left">
                  <div className="finance-left-top">
                    <p>Investido:</p>
                    <h2>{total}</h2>
                  </div>
                  <div className="finance-left-bottom">
                    <div>
                      <p>Faltam:</p>
                      <h4 className='finance-lessToFoal'>{lessToGoal}</h4>
                    </div>
                    <div>
                      <p>Planejamento:</p>
                      <h4 className='finance-goal'>{goal}</h4>
                    </div>
                  </div>
                </div>
                <div className="finance-right">
                <canvas id="myChart2" width="100px" height="50px"></canvas>
                <p className='finance-porcents'>{porcents}</p>

                </div>
            </>
            
            
            :''}

            </div>
    </div>
  )
}

export default Finance