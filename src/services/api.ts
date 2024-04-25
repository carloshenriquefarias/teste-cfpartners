import axios from "axios";
import { AppError } from "../utils/AppError";

const baseURL = () => {
    return 'https://techsoluctionscold.com.br'
}

const api = axios.create({
    baseURL: baseURL()
});

api.interceptors.response.use((response) => response, error => {

    if(error.response && error.response.data) {       
        return Promise.reject(new AppError(error.response.data.message))

    } else {
        return Promise.reject(new AppError('An error occurred while connecting to the server, please try again later'))
    }
});

export { api , baseURL};
