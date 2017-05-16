import Axios from 'axios'

let root = 'http://192.168.1.113:8080/api/'
// let root = 'http://localhost:8080/api/'
let axios = Axios

// 导出自己的api
export default {
  get(url, params, success, error) {
    axios.get(root + url, params)
      .then(success)
      .catch(error)
  },
  get(url, success, error) {
    axios.get(root + url)
      .then(success)
      .catch(error)
  },
  post(url, params, success, error) {
    axios.post(root + url, params)
      .then(success)
      .catch(error)
  },
  post(url, success, error) {
    axios.post(root + url)
      .then(success)
      .catch(error)
  }
}
