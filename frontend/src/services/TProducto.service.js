import axios from './root.service.js';
import { formatTproductData } from '@helpers/formatData.js';

export async function getTproducts() {
    try {
        const { data } = await axios.get('/TipoProducto/');
        const formattedData = data.data.map(formatTproductData);
        return formattedData;
    } catch (error) {
        return error.response.data;
    }
}

export async function postTproduct() {
    try {
        const { data } = await axios.post('/TipoProducto/post/');
        const formattedData = formatTproductData(data.data);
        return formattedData;
    } catch (error) {
        return error.response.data;
    }
}

export async function updateTproduct(data, id) {
    try {
        const response = await axios.patch(`/TipoProducto/detail/?id=${id}`, data);
        console.log(response);
        return response.data.data;
    } catch (error) {
        console.log(error);
        return error.response.data;
    }
}

export async function deleteTproduct(id) {
    try {
        const response = await axios.delete(`/TipoProducto/detail/?id=${id}`);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}