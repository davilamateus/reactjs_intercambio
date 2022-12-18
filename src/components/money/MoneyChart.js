import {useState, useEffect,useRef}from 'react'
import Chart from 'chart.js/auto';
import './Money.css'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'



const MoneyChart = ({days ,setMoney}) => {
  const [data,setData ]= useState(undefined);
  const [color,setColor] = useState('#9dc36600')
  const [colorBorder,setColorBorder] = useState('#68D9A5')
  const [loading,setLoading] = useState(false)

  useEffect(()=>{
    async function requestApi () {
      let  api = "https://economia.awesomeapi.com.br/json/daily/EUR-BRL/32"
      fetch(api).then(response => response.json()).then((result) => 
      {setData(result) 
            setLoading(true)}
            )
            .catch((error)=>{
              setTimeout(() => {
                setData(undefined)
                  requestApi()
                  console.log('Try Again')
              }, 5000);
          })
    }
    requestApi()
  },[])
  
  
  let labels = []
  let results = []

  useEffect(()=>{
    if(data !== undefined){
      setMoney((data[0].ask))
      if(days==7){
       labels = ['7 dias atrás', '6 dias atrás', '5 dias atrás', '4 dias atrás', '3 dias atrás', '2 dias atrás', 'Ontem', 'Hoje']
       results = [ data[7].ask, data[6].ask, data[5].ask, data[4].ask, data[3].ask, data[2].ask, data[1].ask, data[0].ask]
      }
      if(days==15){
        labels = ['15 dias atrás', '11 dias atrás', '9 dias atrás', '5 dias atrás', '3 dias atrás', 'Hoje']
        results = [  data[14].ask, data[11].ask, data[9].ask, data[5].ask, data[2].ask, data[0].ask]
       }
       if(days==30){
        labels = ['30 dias atrás', '27 dias atrás', '23 dias atrás', '17 dias atrás', '13 dias atrás', '8 dias atrás', '5 dias atrás', 'Hoje']
        results = [ data[30].ask, data[27].ask, data[23].ask, data[19].ask, data[14].ask, data[9].ask, data[4].ask, data[0].ask]
       }

    }

  

    const ctx = document.getElementById('chart');

      if(data!== undefined && labels.length>0){

        let chartStatus = Chart.getChart("chart"); // <canvas> id
        if (chartStatus != undefined) {
          chartStatus.destroy();
        }

    

        const myChart = new Chart(ctx, {
          type: 'line',
          data: {
              labels: labels,
              datasets: [{
                  label: "EUR",
                  display: true,
                  data: results,
                  pointRadius: 3,
                  backgroundColor: [
                    `${color}`
                    ],
                  borderColor: colorBorder,
                  borderWidth: 4,
                  tension: 0.4, 
              }]
          },
          options: {
              fill: true,
              options:{
                aspectRatio:1 //(width/height)
          },
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
                      display: true,                     
                  },
                  x: {
                      display: true  ,
                  }
                      
              }
          },
          responsive: true,
          maintainAspectRatio: false,
          scales: {
              yAxes: [{
                  ticks: {
                      beginAtZero:true,
                      stepSize: 1
                  }
              }]
          }
      });
           
      }
    
    },[data])
  
  


  useEffect(()=>{

    if(data !==undefined){

      if(days ==7){
        if(data[0].ask<data[1].ask){
          setColor('#9dc36600')
          setColorBorder('#68D9A5')
  
        } else{
          setColor('#FA385F0a')
          setColorBorder('#FA3850')
        }

      }

      if(days ==15){
        if(data[0].ask<data[2].ask){
          setColor('#9dc36600')
          setColorBorder('#68D9A5')
  
        } else{
          setColor('#FA385F0a')
          setColorBorder('#FA3850')
        }

      }

      if(days ==30){
        if(data[0].ask<data[4].ask){
          setColor('#9dc36600')
          setColorBorder('#68D9A5')
  
        } else{
          setColor('#FA385F0a')
          setColorBorder('#FA3850')
        }

      }

          
  }
  },[data])








  return (
    <div className=''>

      {loading == true? 
          <>

            <div className='moneyFullChar-Box'>

               <canvas id="chart" width="100px" height="50px"></canvas>


            </div>
            </>
        :
        <SkeletonTheme baseColor="var(--background)" highlightColor="var(--higher)">
            <Skeleton style={{width:'110px',height:'20px',margin:'10px'}}/>
            <Skeleton style={{width:'130px',height:'30px',margin:'0px 10px'}}/>
            <Skeleton style={{width:'310px',height:'80px',margin:'10px 0px 0px 0px',opacity:'0.4'}}/>

          </SkeletonTheme>
        
        }
    </div>
  )
}

export default MoneyChart