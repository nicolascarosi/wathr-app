import axios from "axios";
import endpoints from "config/weatherApiEndpoints";

axios.defaults.baseURL = endpoints.BASE_URL

export const weatherService = {
    get: async (query: string) => 
        await axios.get(`${endpoints.SEARCH}&q=${query}`)
        .then((response) => response.data),
        
    getByName: async (query: string) => 
        await axios.get(`${endpoints.CURRENT}&q=${query}`)
        .then((response) => response.data)
}
