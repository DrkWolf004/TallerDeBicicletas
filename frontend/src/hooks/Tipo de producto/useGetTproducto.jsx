import { useState, useEffect } from 'react';
import { getTproducts } from '@services/TipoProducto.service.js';

const useTipos = () => {
    const [Tipos, setTipos] = useState([]);

    const fetchTipos = async () => {
        try {
            const response = await getTproducts();
            const formattedData = response.map(tipoP => ({
                tipo: tipoP.tipo,
                createdAt: tipoP.createdAt
            }));
            setTipos(formattedData);
        } catch (error) {
            console.error("Error: ", error);
        }
    };

    useEffect(() => {
        fetchTipos();
    }, []);


    return { Tipos, fetchTipos, setTipos };
};

export default useTipos;