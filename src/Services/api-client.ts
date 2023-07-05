import axios, { AxiosRequestConfig } from "axios";

export interface FetchResponse<T>{
    results: T[];
    page: string | null;
  }

const axiosInstance = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    params: {
        api_key: '3171b031bea93a9972cd7b17398bcebf'
    }
})

class APIClient<T>{
    endpoint: string;

    constructor(endpoint: string){
        this.endpoint = endpoint
    }
    getAll = (config: AxiosRequestConfig) =>{
        return axiosInstance.get<FetchResponse<T>>(this.endpoint, config).
        then(res => res.data);
    }
    get = () =>{
        return  axiosInstance.get<FetchResponse<T>>(this.endpoint)
         .then(res => res.data)
     }
}

export default APIClient;