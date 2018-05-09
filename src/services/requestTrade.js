import axios from 'axios'

const config = require('./config.json');

export function requestTrade (id, tradeData) {
  const request = axios.post(`${config.BASE_URL}/people/${id}/properties/trade_item.json`, tradeData, {
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
