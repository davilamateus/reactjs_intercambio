import {useState, useEffect,useRef}from 'react'
import Chart from 'chart.js/auto';
import './Money.css'
import { getRelativePosition } from 'chart.js/helpers';



const Money = () => {
  const [data,setData ]= useState(undefined);
  const [color,setColor] = useState('#9dc3660d')
  const [colorBorder,setColorBorder] = useState('#9DC366')

  useEffect(()=>{
    async function requestApi () {
      let  api = "https://economia.awesomeapi.com.br/json/daily/EUR-BRL/15"
      fetch(api).then(response => response.json()).then(result => setData(result)).catch(()=>{setData(undefined)});
    }
    requestApi()
  },[])
  
  
  
  
  const ctx = document.getElementById('myChart');
  if(data!== undefined){
    let chartStatus = Chart.getChart("myChart"); // <canvas> id
    if (chartStatus != undefined) {
      chartStatus.destroy();
    }


    const myChart = new Chart(ctx, {
      type: 'line',
      data: {
          labels: [, '3 day go', '2 day go', '1 day go', 'Today'],
          datasets: [{
              label: "EUR",
              display: true,
              data: [data[5].ask, data[4].ask, data[3].ask, data[2].ask, data[1].ask],
              pointRadius: 0,
              backgroundColor: [
                 `${color}`
                ],
              borderColor: colorBorder,
              borderWidth: 2,
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
                  display: false,                     
              },
              x: {
                  display: false ,
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


  useEffect(()=>{

    if(data !==undefined){

        if(data[1].ask<data[2].ask){
          setColor('#9dc3660d')
          setColorBorder('#9DC366')

        } else{
          setColor('#FA385F0a')
          setColorBorder('#FA3850')
        }
          
  }
  },[data])








  return (
    <div className='money-div'>
            <div className="box-header">
                <h6>Cotação</h6>
            <img src="./../../../img/icons/btnpurper.svg" alt="Ver mais" />
            </div>
            <div className='box-Chart'>
            {data !==undefined ? 
              <h5 style={{color:colorBorder}} className='Cot-number'>R$ {data[1].ask}</h5>
              :''}
               <canvas id="myChart" width="100px" height="50px"></canvas>

            </div>
    </div>
  )
}

export default Money