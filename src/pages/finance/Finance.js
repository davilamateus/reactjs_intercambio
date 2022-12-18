import { useState, useEffect } from 'react'
import Api from '../../axios/Axios';
import './Finance.css'
import Chart from 'chart.js/auto';
import { useSelector } from 'react-redux'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import AddFinance from '../../components/finance/AddFinance';
import EditFinance from '../../components/finance/EditFinance';
import FinanceCard from '../../components/finance/FinanceCard';






const Finance = () => {

  const userStore = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const [finance, setFinance] = useState(undefined)
  const [aCategory, setACategory] = useState(0)
  const [bCategory, setBCategory] = useState(0)
  const [cCategory, setCCategory] = useState(0)
  const [dCategory, setDCategory] = useState(0)
  const [eCategory, setECategory] = useState(0)
  const [total, setTotal] = useState(0)
  const [userGoals, setUserGoals] = useState(false)
  const [showAdd, setAddShow] = useState(false)


  function closeAdd() {
    setAddShow(false)
  }







  async function loadFinance() {
    await Api('/user/finance', {
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${sessionStorage.getItem('token')}`
      }
    }).then((data) => {
      setFinance(data.data)
      setLoading(true)
    })
  }
  useEffect(() => {
    loadFinance()
  }, [])

  useEffect(() => {
    if (userStore.user !== false) {
      setUserGoals(userStore.user.goal)
    }
  }, [userStore])


  let a = []
  let b = []
  let c = []
  let d = []
  let e = []


  useEffect(() => {

    if (finance !== undefined) {
      let res = 0
      finance.map((item) => {
        res = res + item.value
        setTotal(res)
        if (item.category == 1) {
          a.push(item.value)
        } else if (item.category == 2) {
          b.push(item.value)
        } else if (item.category == 3) {
          c.push(item.value)
        } else if (item.category == 4) {
          d.push(item.value)
        } else if (item.category == 5) {
          e.push(item.value)
        }
      })
    }



  }, [finance])

  function calc(category) {
    let res = 0
    if (category.length > 0) {
      for (let i = 0; i < category.length; i++) {
        res = res + category[i]
      }
    }
    return res

  }


  useEffect(() => {
    if (a.length > 0) {
      setACategory((calc(a)))
    }
  }, [a])

  useEffect(() => {
    if (b.length > 0) {
      setBCategory((calc(b)))
    }
  }, [b])

  useEffect(() => {
    if (c.length > 0) {
      setCCategory((calc(c)))
    }
  }, [c])

  useEffect(() => {
    if (d.length > 0) {
      setDCategory((calc(d)))
    }
  }, [d])

  useEffect(() => {
    if (e.length > 0) {
      setECategory((calc(e)))
    }
  }, [e])


  useEffect(() => {


    if (userGoals !== false) {
      const ctx2 = document.getElementById('myChart2');

      if (ctx2 !== undefined) {


        let chartStatus = Chart.getChart("myChart2"); // <canvas> id
        if (chartStatus != undefined) {
          chartStatus.destroy();
        }



        var myChart2 = new Chart(ctx2, {
          type: 'doughnut',
          data: {
            labels: ['', ''
            ],
            datasets: [{
              backgroundColor: [
                '#F5F4F4',
                '#68D9A5'],
                data: [(userGoals-total) , total],
                borderRadius: [0, 12],
              borderWidth: 6,
              borderColor: ['#34efae00', '#68D9A5'],
              borderAlign: 'center',
              spacing: -2,
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
                display: false,
              }
            }
          },
        });


      }
    }
  }, [total])







  return (
    <>
      <div className="todolist-header-page container">
        <button onClick={() => { setAddShow(true) }} className='btn-add-new'>
          <img src="./../../img/icons/icomore.svg" />

          <p>
            Adicionar Tarefa
          </p>
        </button>
      </div>
      {loading == true ?
        <>
          <div className="finance-grafics-box container">
            <div className="finance-grafics">
              <div style={{ width: '20px', height: (aCategory * 100) / total, backgroundColor: '#68D9A5' }} className="finance-grafic-bar"></div>
              <div className='finance-grafic-text'>
                <p>Câmbio</p>
                <h5>R$ {aCategory}</h5>
                <p>{((aCategory * 100) / total).toFixed(1)}%</p>
              </div>
            </div>

            <div className="finance-grafics">
              <div style={{ width: '20px', height: (bCategory * 100) / total, backgroundColor: '#F1F180' }} className="finance-grafic-bar"></div>
              <div className='finance-grafic-text'>
                <p>Curso</p>
                <h5>R$ {bCategory}</h5>
                <p>{((bCategory * 100) / total).toFixed(1)}%</p>
              </div>
            </div>

            <div className="finance-grafics">
              <div style={{ width: '20px', height: (cCategory * 100) / total, backgroundColor: '#FA385F' }} className="finance-grafic-bar"></div>
              <div className='finance-grafic-text'>
                <p>Passagem</p>
                <h5>R$ {cCategory}</h5>
                <p>{((cCategory * 100) / total).toFixed(1)}%</p>
              </div>
            </div>

            <div className="finance-grafics">
              <div style={{ width: '20px', height: (dCategory * 100) / total, backgroundColor: '#6958A3' }} className="finance-grafic-bar"></div>
              <div className='finance-grafic-text'>
                <p>Documentos</p>
                <h5>R$ {dCategory}</h5>
                <p>{((dCategory * 100) / total).toFixed(1)}%</p>
              </div>
            </div>

            <div className="finance-grafics">
              <div style={{ width: '20px', height: (eCategory * 100) / total, backgroundColor: '#17a6f9' }} className="finance-grafic-bar"></div>
              <div className='finance-grafic-text'>
                <p>Outros</p>
                <h5>R$ {eCategory}</h5>
                <p>{((eCategory * 100) / total).toFixed(1)}%</p>
              </div>
            </div>
            <div className='finance-grafic-total'>
              <div className='finance-grafic-text'>
                <p>Total</p>
                <h5>R$ {total}</h5>
                <p>{((total * 100) / userGoals).toFixed(1)}%</p>
              </div>
              <div className="finance-grafic-total-grafic">
                <canvas id="myChart2" width="100px" height="50px"></canvas>
              </div>
            </div>
          </div>
          <div className="finance-table-box container">

            {finance.map((item) => (
                <FinanceCard item={item} key={item.id}  refresh={loadFinance} />
            ))}

          </div>
          {showAdd === true ?
            <AddFinance closeAdd={closeAdd} refresh={loadFinance} />
            : ''}

        </>
        :


        <>
          <SkeletonTheme baseColor="var(--background)" highlightColor="var(--higher)">
            <div className="finance-grafics-box container">
              <div className="finance-grafics">
                <div className='finance-grafic-text'>
                  <Skeleton style={{ width: '70px', height: '20px', marginLeft: '43px ' }} />
                  <Skeleton style={{ width: '90px', height: '20px', marginLeft: '43px ' }} />
                  <Skeleton style={{ width: '50px', height: '20px', marginLeft: '43px ' }} />
                </div>
              </div>
              <div className="finance-grafics">
                <div className='finance-grafic-text'>
                  <Skeleton style={{ width: '70px', height: '20px', marginLeft: '43px ' }} />
                  <Skeleton style={{ width: '90px', height: '20px', marginLeft: '43px ' }} />
                  <Skeleton style={{ width: '50px', height: '20px', marginLeft: '43px ' }} />
                </div>
              </div>
              <div className="finance-grafics">
                <div className='finance-grafic-text'>
                  <Skeleton style={{ width: '70px', height: '20px', marginLeft: '43px ' }} />
                  <Skeleton style={{ width: '90px', height: '20px', marginLeft: '43px ' }} />
                  <Skeleton style={{ width: '50px', height: '20px', marginLeft: '43px ' }} />
                </div>
              </div>
              <div className="finance-grafics">
                <div className='finance-grafic-text'>
                  <Skeleton style={{ width: '70px', height: '20px', marginLeft: '43px ' }} />
                  <Skeleton style={{ width: '90px', height: '20px', marginLeft: '43px ' }} />
                  <Skeleton style={{ width: '50px', height: '20px', marginLeft: '43px ' }} />
                </div>
              </div>
              <div className="finance-grafics">
                <div className='finance-grafic-text'>
                  <Skeleton style={{ width: '70px', height: '20px', marginLeft: '43px ' }} />
                  <Skeleton style={{ width: '90px', height: '20px', marginLeft: '43px ' }} />
                  <Skeleton style={{ width: '50px', height: '20px', marginLeft: '43px ' }} />
                </div>
              </div>
              <div className="finance-grafic-total">
                <div className='finance-grafic-total-grafic '>
                  <Skeleton style={{ width: '70px', height: '20px', marginLeft: '43px ' }} />
                  <Skeleton style={{ width: '90px', height: '20px', marginLeft: '43px ' }} />
                  <Skeleton style={{ width: '50px', height: '20px', marginLeft: '43px ' }} />
                </div>
              </div>
            </div>
            <div className="finance-table-box container">
              <Skeleton style={{ width: '100%', height: '60px', marginBottom: '8px' }} />
              <Skeleton style={{ width: '100%', height: '60px', marginBottom: '8px' }} />
              <Skeleton style={{ width: '100%', height: '60px', marginBottom: '8px' }} />
              <Skeleton style={{ width: '100%', height: '60px', marginBottom: '8px' }} />
              <Skeleton style={{ width: '100%', height: '60px', marginBottom: '8px' }} />
              <Skeleton style={{ width: '100%', height: '60px', marginBottom: '8px' }} />




            </div>

          </SkeletonTheme>
        </>}
    </>)
}

export default Finance