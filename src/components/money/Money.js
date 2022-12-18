import {useState, useEffect,useRef}from 'react'
import Chart from 'chart.js/auto';
import './Money.css'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'



const Money = () => {
  const [data,setData ]= useState(undefined);
  const [color,setColor] = useState('#9dc3660d')
  const [colorBorder,setColorBorder] = useState('#9DC366')
  const [loading,setLoading] = useState(false)

  useEffect(()=>{
    async function requestApi () {
      let  api = "https://economia.awesomeapi.com.br/json/daily/EUR-BRL/15"
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
  
  
  
  
  const ctx = document.getElementById('myChart');
  if(data!== undefined){
    let chartStatus = Chart.getChart("myChart"); // <canvas> id
    if (chartStatus != undefined) {
      chartStatus.destroy();
    }


    const myChart = new Chart(ctx, {
      type: 'line',
      data: {
          labels: ['7 day go', '6 day go', '5 day go', '4 day go', '3 day go', '2 day go', '1 day go', 'Today'],
          datasets: [{
              label: "EUR",
              display: true,
              data: [ data[8].ask, data[7].ask, data[6].ask, data[5].ask, data[4].ask, data[3].ask, data[2].ask, data[1].ask],
              pointRadius: 0,
              backgroundColor: [
                 `${color}`
                ],
              borderColor: colorBorder,
              borderWidth: 5,
              tension: 0.3, 
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
          setColor('rgb(0,0,0,0)')
          setColorBorder('#6AD9A8')

        } else{
          setColor('rgb(0,0,0,0)')
          setColorBorder('#FA3850')
        }
          
  }
  },[data])








  return (
    <div className='money-div'>

      {loading == true? 
          <>
          

            <div className="box-header">
                <h5>Cotação</h5>
            <img src="./../../../img/icons/btnpurper.svg" alt="Ver mais" />
            </div>
            <div className='box-Chart'>
            {data !==undefined ? 
              <h5 style={{color:colorBorder}} className='Cot-number'>R$ {data[1].ask}</h5>
              :''}
               <canvas id="myChart" width="100px" height="50px"></canvas>

            </div>
            </>
        :
        <SkeletonTheme baseColor="var(--8)" highlightColor="var(--11)">
            <Skeleton style={{width:'110px',height:'20px',margin:'10px'}}/>
            <Skeleton style={{width:'130px',height:'30px',margin:'0px 10px'}}/>
            <Skeleton style={{width:'310px',height:'80px',margin:'10px 0px 0px 0px',opacity:'0.4'}}/>

          </SkeletonTheme>
        
        }
    </div>
  )
}

export default Money