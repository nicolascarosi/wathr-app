const endpoints = {
    BASE_URL: 'http://api.weatherapi.com/v1',
    SEARCH: `/search.json?key=${process.env.REACT_APP_WEATHER_API_KEY}`,
    CURRENT: `/current.json?key=${process.env.REACT_APP_WEATHER_API_KEY}&aqi=no`,
}



export default endpoints;