import { useState } from 'react';
import { updateTproduct } from '@services/TProducto.service.js';
import { showErrorAlert, showSuccessAlert } from '@helpers/sweetAlert.js';
import { formatPostUpdate } from '@helpers/formatData.js';

const useEditUser = (setUsers) => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [dataTipo, setDataTipo] = useState([]);
    
    const handleClickUpdate = () => {
        if (dataTipo.length > 0) {
            setIsPopupOpen(true);
        }
    };

    const handleUpdate = async (updatedTproductData) => {
        if (updatedTproductData) {
            try {
            const updatedTipo = await updateTproduct(updatedTproductData, dataTipo[0].id);
            showSuccessAlert('¡Actualizado!','El usuario ha sido actualizado correctamente.');
            setIsPopupOpen(false);
            const formattedUser = formatPostUpdate(updatedTipo);

            setDataTipo([]);
            } catch (error) {
                console.error('Error al actualizar el usuario:', error);
                showErrorAlert('Cancelado','Ocurrió un error al actualizar el usuario.');
            }
        }
    };

    return {
        handleClickUpdate,
        handleUpdate,
        isPopupOpen,
        setIsPopupOpen,
        dataTipo,
        setDataTipo
    };
};

export default useEditUser;