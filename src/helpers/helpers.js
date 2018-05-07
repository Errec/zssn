export default {
  getCurrentCoordinates () {
    const options = {
      enableHighAccuracy: false,
      timeout: 5000,
      maximumAge: 0
    }
    return new Promise(function (success, error) {
      navigator.geolocation.getCurrentPosition(success, error, options)
    })
  }
}
