import axios from 'axios'

const http = {

  getJSON(url) {
    return new Promise((resolve, reject) => {
      axios.get(url).then(res => {
        resolve (res)
      }).catch(err => {
        reject (err)
      })
    })

  },
  postJOSN() {

  }
}
export default {
  http
}

