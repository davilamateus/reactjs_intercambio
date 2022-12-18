import axios from 'axios'

const BASE_URL = 'http://localhost:3000/';
//const BASE_URL = 'http://23.22.63.63:3000/';
//const BASE_URL = 'https://planejadordeintercambio.herokuapp.com/';
//const BASE_URL = 'https://nodejsintercambio-production.up.railway.app/';

const Api = axios.create({
    baseURL: BASE_URL
})



export default Api;