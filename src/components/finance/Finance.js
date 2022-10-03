import {useEffect, useState, useRef} from 'react'
import './FInance.css'
import Api from './../../axios/Axios'
import Chart from 'chart.js/auto';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'




const Finance = ({goal}) => {

  const token = sessionStorage.getItem('token');

  const [finance,setFinance] = useState([{value:0}])
  const [total,setTotal] = useState(0)
  const [lessToGoal ,setLessToGoal] = useState(0)
  const [porcents ,setPorcents] = useState(0)
  const [graficStatus, setGraficStatus] = useState(false)
  const [loading,setLoading] = useState(false)

  useEffect(()=>{


    const customConfig = {
      headers: {
      'Content-Type': 'application/json',
      "Authorization" : `Bearer ${token}`
      }
  };


    async function loadToDoList(){
      await Api('/user/finance' ,customConfig).then((data)=>{
        setFinance(data.data)
        setLoading(true)
      })
    }
    loadToDoList()
  },[])
  



  
      

  const ctx2  = document.getElementById('myChart2')

  useEffect(()=>{
    if(goal !== undefined){
      setLessToGoal(goal-total)
      setGraficStatus(true)
      
    }

  },[goal])
  
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
      setPorcents(((total*100)/goal).toFixed(1))

    }
  },[total])
  

  const ctx = document.getElementById('myChart2');
  if(ctx!== undefined){

  
    let chartStatus = Chart.getChart("myChart2"); // <canvas> id
    if (chartStatus != undefined) {
      chartStatus.destroy();
    }
  


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
            {loading == true ? 
                <>
      <div className="box-header">
                <h5>Financeiro</h5>
                <img src="./../../../img/icons/btnpurper.svg" alt="Adicionar" />
          </div>
          <div className='finance-container'>
            
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
                  { <canvas  id="myChart2" width="100px" height="50px"></canvas>
}
                <p className='finance-porcents'>{porcents}%</p>

                </div>
              
            </div>
            </>
            :
            
            <SkeletonTheme baseColor="var(--8)" highlightColor="var(--11)">
                <Skeleton style={{width:'150px',height:'30px', margin:'10px'}}/>
                  <div style={{display:'flex'}}>
                    <div>
                      <Skeleton style={{width:'100px',height:'20px', margin:'3px 10px' }}/>
                      <Skeleton style={{width:'120px',height:'30px', margin:'3px 10px 25px 10px' }}/>
                      <Skeleton style={{width:'100px',height:'20px', margin:'3px 10px' }}/>
                      <Skeleton style={{width:'120px',height:'30px', margin:'3px 10px 25px 10px' }}/>
                      <Skeleton style={{width:'100px',height:'20px', margin:'3px 10px' }}/>
                      <Skeleton style={{width:'120px',height:'30px', margin:'3px 10px 25px 10px' }}/>

                    </div>
                    <div>
                      <Skeleton style={{width:'150px',height:'150px', margin:'40px 10px',borderRadius:'100px' }}/>

                    </div>
                  </div>
            </SkeletonTheme>
            
          }

          </div>
  )
}

export default Finance