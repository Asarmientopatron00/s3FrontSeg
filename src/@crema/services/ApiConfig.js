import axios from 'axios';
require('dotenv').config();

export default axios.create({
  baseURL: process.env.API_ROUTE, //YOUR_API_URL HERE
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Authorization':'Bearer ' + localStorage.token,
  },
});