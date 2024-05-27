import axios from 'axios';

//Instância do axios com configuração personalizada
export const api = axios.create({
    // Configuração da URL base para todas as requisições feitas com esta instância do axios
    baseURL: "http://127.0.0.1:5000"
});

//Interceptor para incluir o token JWT em todas as requisições
api.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, error => {
    return Promise.reject(error);
});
