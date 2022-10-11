import {useState, useEffect} from 'react'
import Api from '../../axios/Axios';
import './Finance.css'
import Chart from 'chart.js/auto';



const Finance = () => {

  const [loading,setLoading] = useState(false);
  const [finance,setFinance] = useState(undefined)
  const [aCategory,setACategory] =useState(0)
  const [bCategory,setBCategory] =useState(0)
  const [cCategory,setCCategory] =useState(0)
  const [dCategory,setDCategory] =useState(0)
  const [eCategory,setECategory] =useState(0)
  const [total,setTotal]= useState(0)
  const [userGoals, setUserGoals]=useState(0)
  const [showAdd, setAddShow] = useState(false)

  const customConfig = {
    headers: {
    'Content-Type': 'application/json',
    "Authorization" : `Bearer ${sessionStorage.getItem('token')}`
    }
};

useEffect(()=>{
  async function loadToDoList(){
    await Api('/user/finance' ,customConfig).then((data)=>{
      setFinance(data.data)
      setLoading(true)
    })
  }
  loadToDoList()
},[])


let a = []
let b = []
let c = []
let d = []
let e = []


useEffect(()=>{

  if(finance !== undefined){
    let res = 0
    finance.map((item)=>{
      res = res+ item.value
      setTotal(res)
      if(item.category == 1){
        a.push(item.value)
      } else if(item.category==2){
        b.push(item.value)
      } else if(item.category==3){
        c.push(item.value)
      } else if(item.category==4){
        d.push(item.value)
      } else if(item.category==5){
        e.push(item.value)
      }
    })
  }



},[finance])

function calc(category){
  let res  = 0
  if(category.length>0){
    for(let i = 0; i<category.length; i++){
      res = res+ category[i]
    }
  }
  return res

}


useEffect(()=>{
  if(a.length>0){
   setACategory((calc(a)))
  }
},[a])

useEffect(()=>{
  if(b.length>0){
   setBCategory((calc(b)))
  }
},[b])

useEffect(()=>{
  if(c.length>0){
   setCCategory((calc(c)))
  }
},[c])

useEffect(()=>{
  if(d.length>0){
   setDCategory((calc(d)))
  }
},[d])

useEffect(()=>{
  if(e.length>0){
   setECategory((calc(e)))
  }
},[e])


useEffect(()=>{


if( userGoals>0){
const ctx2 = document.getElementById('myChart2');
if(ctx2!== undefined){


  let chartStatus = Chart.getChart("myChart2"); // <canvas> id
  if (chartStatus != undefined) {
    chartStatus.destroy();
  }



var myChart2 = new Chart(ctx2, {
  type: 'doughnut',
  data: {
      labels: ['Prenejados', 'Investido'
  ],
      datasets: [{
          backgroundColor:[
              '#F5F4F4',
              '#9EC36E'],
          data: [(userGoals) , total],
          borderRadius:[0,12],
          borderWidth:6,
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
}
},[userGoals])
function getUser(item){
  setUserGoals(item.goal)
}

function titleCategory(i){
  let categoryDados =[]
  if(i ==1){
    categoryDados = ['Câmbio','var(--1)']
  } else if(i==2){
    categoryDados = ['Curso','var(--2)']

  }else if(i==3){
    categoryDados = ['Passagem','var(--3)']

  }else if(i==4){
    categoryDados = ['Documentos','var(--4)']

  }else if(i==5){
    categoryDados = ['Outros','var(--5)']

  }
  return categoryDados
}




  return (
    <>  
    {loading == true? 
    <>


        <div className="todolist-header-page">
            <button onClick={()=>{setAddShow(true)}} className='btn-add-new'>
              <svg xmlns="http://www.w3.org/2000/svg" width="17.371" height="17.371" viewBox="0 0 17.371 17.371">
                <g id="ic-actions-close" transform="matrix(0.719, -0.695, 0.695, 0.719, 2.5, 8.578)">
                  <line id="Linha_16" data-name="Linha 16" x1="8.749" y1="8.749" transform="translate(0 0)" fill="none" stroke="#fff" />
                  <line id="Linha_17" data-name="Linha 17" y1="8.749" x2="8.749" transform="translate(0 0)" fill="none" stroke="#fff" />
                </g>
              </svg>
              <p>
              Adicionar Tarefa
              </p>
            </button>
          </div>
        <div className="finance-grafics-box">
              <div className="finance-grafics">
                  <div style={{width:'20px', height:(aCategory*100)/total, backgroundColor:'var(--2)'}} className="finance-grafic-bar"></div>
              <div className='finance-grafic-text'>
                    <p>Câmbio</p>
                    <h5>R$ {aCategory}</h5>
                    <p>{((aCategory*100)/total).toFixed(1)}%</p>
                  </div>
              </div>

              <div className="finance-grafics">
                  <div style={{width:'20px', height:(bCategory*100)/total, backgroundColor:'var(--3)'}} className="finance-grafic-bar"></div>
              <div className='finance-grafic-text'>
                    <p>Curso</p>
                    <h5>R$ {bCategory}</h5>
                    <p>{((bCategory*100)/total).toFixed(1)}%</p>
                  </div>
              </div>

              <div className="finance-grafics">
                  <div style={{width:'20px', height:(cCategory*100)/total, backgroundColor:'var(--1)'}} className="finance-grafic-bar"></div>
              <div className='finance-grafic-text'>
                    <p>Passagem</p>
                    <h5>R$ {cCategory}</h5>
                    <p>{((cCategory*100)/total).toFixed(1)}%</p>
                  </div>
              </div>

              <div className="finance-grafics">
                  <div style={{width:'20px', height:(dCategory*100)/total, backgroundColor:'var(--10)'}} className="finance-grafic-bar"></div>
              <div className='finance-grafic-text'>
                    <p>Documentos</p>
                    <h5>R$ {dCategory}</h5>
                    <p>{((dCategory*100)/total).toFixed(1)}%</p>
                  </div>
              </div>

              <div className="finance-grafics">
                  <div style={{width:'20px', height:(eCategory*100)/total, backgroundColor:'var(--4)'}} className="finance-grafic-bar"></div>
              <div className='finance-grafic-text'>
                    <p>Outros</p>
                    <h5>R$ {eCategory}</h5>
                    <p>{((eCategory*100)/total).toFixed(1)}%</p>
                  </div>
              </div>
              <div className='finance-grafic-total'>
                  <div className='finance-grafic-text'>
                        <p>Total</p>
                        <h5>R$ {total}</h5>
                        <p>{((total*100)/userGoals).toFixed(1)}%</p>
                      </div>
                <div className="finance-grafic-total-grafic">
                  <canvas  id="myChart2" width="100px" height="50px"></canvas>
                </div>
              </div>
        </div>
        <div className="finance-table-box">
          <div  style={{  height:'400px', overflow:'scroll' }}className="finance-table">
            <table  >
              <tr  className='finance-table-header'>
                <td>Titulo</td>
                <td width={'150px'}>Categoria</td>
                <td width={'150px'}>Valor</td>
                <td>Ações</td>
              </tr>
              <div style={{margin:'20px'}}></div>
                
              {finance.map((item)=>(
                <tr className='finance-table-item' height={'40px'} key={item.id}>
                  <td className='finance-table-title'>{item.title}</td>
                  <td style={{color:titleCategory(item.category)[1]}}>{titleCategory(item.category)[0]}</td>
                  <td>R${item.value}</td>
                  <td className='finance-table-btn'>
                    <button>
                      <img src="./../../../img/icons/iconedit.svg"  />
                      Editar
                      </button>
                    <button>
                      <img src="./../../../img/icons/icondelete.svg"  />
                      Excluir</button>
                  </td>
                </tr>
              ))}
            </table>
          </div>

        </div>
        </>
        :''}
    </>  )
}

export default Finance