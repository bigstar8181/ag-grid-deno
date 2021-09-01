import axios from 'axios';

const API = {
  async getCarManufactures() {
    return axios.get('https://api.myjson.com/bins/oeu8r');
  },

  async getCarPartsByManufacture() {
    return axios.get('https://api.myjson.com/bins/ms03z');
  }
};
export default API;
