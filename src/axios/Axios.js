import axios from 'axios'

const BASE_URL = 'https://theup.herokuapp.com/';

const Api = axios.create({
    baseURL: BASE_URL
})



export default Api