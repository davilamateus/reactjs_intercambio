import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Api from '../../axios/Axios';
import './createOptionsSteps.css'

import Step0 from './createOptionsSteps/Step0';
import Step1 from './createOptionsSteps/Step1';
import Step2 from './createOptionsSteps/Step2';
import Step3 from './createOptionsSteps/Step3';
import Step4 from './createOptionsSteps/Step4';
import Step5 from './createOptionsSteps/Step5';
import Step6 from './createOptionsSteps/Step6';
import Step7 from './createOptionsSteps/Step7';
import Step8 from './createOptionsSteps/Step8';
import Step9 from './createOptionsSteps/Step9';

const CreateOptionsSteps = () => {

    const [stepNumber, setStepNumber] = useState(0);
    const [user, setUser] = useState(false)
    const [loading, setLoading] = useState(false);

    const [question1, setQuestion1] = useState(false);
    const [question2, setQuestion2] = useState(false);
    const [question3, setQuestion3] = useState(false);
    const [question4, setQuestion4] = useState(false);
    const [question5, setQuestion5] = useState(false);
    const [question6, setQuestion6] = useState(false);
    const [question7, setQuestion7] = useState(false);
    const [cityInfor, setCityInfor] = useState(null);



    useEffect(() => {
        async function getUser() {
            await Api.get('/user', { headers: { "Authorization": `Bearer ${sessionStorage.getItem('token')}` } })
                .then((res) => {
                    setUser((res.data))
                    setLoading(true)

                });
        }
        getUser()
    }, [])





    useEffect(() => {
        if (question7 !== false) {
            calc()
        }
    }, [question7])

    let resultToCity = []
    let citiesPoints = [
        { country: 'ie', city: "Dublin", question01: [0, 3, 16], question02: [2, 1, 1], question03: [2, 2, 0], question04: [2, 0, 1], question05: [2, 1, 0] },
        { country: 'ie', city: "Galway", question01: [2, 11, 0], question02: [2, 1, 1], question03: [2, 2, 0], question04: [2, 0, 1], question05: [0, 1, 5] },
        { country: 'ie', city: "Limerick", question01: [13, 1, 0], question02: [0, 1, 1], question03: [2, 0, 0], question04: [1, 0, 1], question05: [0, 5, 2] },

    ]
    function calc() {
        
        for (let i = 0; i < citiesPoints.length; i++) {

            resultToCity.push(citiesPoints[i].question01[question3]
                + citiesPoints[i].question02[question4]
                + citiesPoints[i].question03[question5]
                + citiesPoints[i].question04[question6]
                + citiesPoints[i].question05[question7])
        }
    }

    useEffect(() => {
        if (resultToCity[0] !== undefined) {

          let res = citiesPoints[resultToCity.indexOf(resultToCity.reduce(function (prev, current) {
            return prev > current ? prev : current;
          }))]
          async function getCityInfor() {
            await Api.get(`/city?cityName=${res.city}`).then((res) => {
              setCityInfor(res.data)
            })
          }
          getCityInfor()
    
        }
      }, [resultToCity])




    function changeStep(n) {
        setStepNumber(stepNumber + (n))

    }

    async function createCommercial(){
        const config = {
            headers: { Authorization: `Bearer ${sessionStorage.getItem('token')}` }
          };
    
    
        const bodyCommercial = {
            responser01: question1,
            responser02: question2,
            responser03: question3,
            responser04: question4,
            responser05: question5,
            responser06: question6,
            responser07: question7,
          }
         await Api.post('/user/commercial/', bodyCommercial, config).then((res) => {
          })
 
    }



    return (
        <div className='create-options-steps'>
            {stepNumber === 0 && loading == true ? <Step0 changeStep={changeStep} userName={user.name} /> : ''}
            {stepNumber === 1 ? <Step1 changeStep={changeStep} res={setQuestion1} /> : ''}
            {stepNumber === 2 ? <Step2 changeStep={changeStep} res={setQuestion2} /> : ''}
            {stepNumber === 3 ? <Step3 changeStep={changeStep} res={setQuestion3} /> : ''}
            {stepNumber === 4 ? <Step4 changeStep={changeStep} res={setQuestion4} /> : ''}
            {stepNumber === 5 ? <Step5 changeStep={changeStep} res={setQuestion5} /> : ''}
            {stepNumber === 6 ? <Step6 changeStep={changeStep} res={setQuestion6} /> : ''}
            {stepNumber === 7 ? <Step7 changeStep={changeStep} res={setQuestion7} /> : ''}
            {stepNumber === 8 && cityInfor !== null? <Step8 changeStep={changeStep} userName={user.name} cityInfor={cityInfor} /> : ''}
            {stepNumber === 9 ? <Step9 changeStep={changeStep} userName={user.name} createCommercial={createCommercial} /> : ''}
        </div>
    )
}

export default CreateOptionsSteps