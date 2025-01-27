import axios from "axios";

const api = axios.create({
    baseURL: 'https://6145-179-191-140-138.ngrok-free.app/'
    
});

export default api;