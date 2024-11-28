import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://13.59.73.251:3000/api/',
    timeout: 5000,
})

export const fetchData = async () => {
    try {
        const response = await apiClient.get('/drinks');
        return response.data;
    } catch (error){
        console.error('Error fetching data: ', error);
        throw error;
    }
};

export const createSession = async (payload) => {
    try {
        const response = await apiClient.post('/orders/create-session', payload);
         return response.data;
    } catch (error) {
        console.error('Erro creating session: ', error);
             throw error;
     }
};

export const fetchSession = async (sessionId) => {
    try {
        const response = await apiClient.get(`/orders/confirm-order`, {
            params: { session_id: sessionId },
        });

        return response.data;
    } catch (error) {
        console.error("Error fetching session:", error);
        throw error;
    }
};


