import axios from 'axios'

const BASE_URL = 'http://zssn-backend-example.herokuapp.com/api'

export function survivorList () {
  axios.get(`${BASE_URL}/people.json`).then((response) => {
      console.log(response.data)
    }).catch((err) => {
      console.log(err)
    });
}
