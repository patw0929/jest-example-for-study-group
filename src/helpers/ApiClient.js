import axios from 'axios';

const methods = ['get', 'post', 'put', 'patch', 'del'];

export default class ApiClient {
  constructor() {
    methods.forEach(method => {
      this[method] = path => axios({
        method,
        url: path,
        responseType: 'json',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      });
    });
  }
}
