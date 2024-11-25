import { deleteTproduct } from '@services/TipoProducto.service.js';
import { deleteDataAlert, showErrorAlert, showSuccessAlert } from '@helpers/sweetAlert.js';

const useDeleteTproducto = (fetchTipos, setDataTipo) => {
    const handleDelete = async (dataTipo) => {
        if (dataTipo.length > 0) {
            try {
                const result = await deleteDataAlert();
            if (result.isConfirmed) {
                const response = await deleteTproduct(dataTipo[0].id);
                if(response.status === 'Client error') {
                    return showErrorAlert('Error', response.details);
                }
                showSuccessAlert('¡Eliminado!','El tipo de producto ha sido eliminado correctamente.');
                await fetchTipos();
                setDataTipo([]);
            } else {
                showErrorAlert('Cancelado', 'La operación ha sido cancelada.');
            }
            } catch (error) {
                console.error('Error al eliminar el Tipo de producto:', error);
                showErrorAlert('Cancelado', 'Ocurrió un error al eliminar el tipo de producto.');
            }
        }
    };

    return {
        handleDelete
    };
};

export default useDeleteTproducto;