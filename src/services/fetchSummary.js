import axios from 'axios'

const config = require('./config.json');

export function fetchSummary () {
  const request = axios.all([
      axios.get(`${config.BASE_URL}/report/infected.json`),
      axios.get(`${config.BASE_URL}/report/non_infected.json`),
      axios.get(`${config.BASE_URL}/report/people_inventory.json`),
      axios.get(`${config.BASE_URL}/report/infected_points.json`)
    ])
    .then(axios.spread((infectedRes, nonInfectedRes, inventoryRes, pointRes) => {
      return [infectedRes, nonInfectedRes, inventoryRes, pointRes]
    })).catch((err) => {
      return Promise.reject(err)
    })

    return {
        payload: request
    }
}

