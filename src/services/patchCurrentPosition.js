import axios from 'axios'

const config = require('./config.json');

export function patchCurrentPosition (id, survivorPostData) {
  const request = axios.patch(`${config.BASE_URL}/people/${id}.json`, survivorPostData, {
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
    }
  }).then((response) => {
      return response.data
    }).catch((err) => {
      return Promise.reject(err)
    })

    return {
        payload: request
    }
}
