import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://3.17.145.85:3000/api/',
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

export const createOrder = async (orderData) => {
    try {
        const response = await apiClient.post('/orders', orderData);
        return response.data;
    } catch (error) {
        console.error('Error creating order: ', error);
        throw error;
    }
}
