
import axios from 'axios';

const token = localStorage.getItem('token');

axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
// axios.defaults.baseURL = 'http://localhost:8080/api/';
// axios.defaults.baseURL = 'https://nodejsclusters-124154-0.cloudclusters.net/api/'; //UAT
axios.defaults.baseURL = 'https://nodejsclusters-40083-0.cloudclusters.net/api/'; //PRODUCTION

export default axios;
