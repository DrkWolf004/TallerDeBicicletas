"use strict";
import{
    deleteEncargadoService,
    getEncargadoService,
    getEncargadosService,
    updateEncargadoService,
}from "../services/encargado.service.js";
import{
    encargadoBodyValidation,
    encargadoQueryValidation,
}from "../validations/encargado.validation.js";
import{
    handleErrorClient,
    handleErrorServer,
    handleSuccess,
}from "../handlers/responseHandlers.js";

export async function getEncargado(req, res){
    try{
        const { rut, id, email , nombreCompleto } = req.query;
        
        const { error } = encargadoQueryValidation.validate({ rut, id, email });
        
        if(error) return handleErrorClient(res, 400, error.message);
        
        const [encargado, errorEncargado] = await getEncargadoService({ rut, id, email });
        
        if(errorEncargado) return handleErrorClient(res, 404, errorEncargado);
        
        handleSuccess(res, 200, "Encargado encontrado", encargado);
        }catch(error){
            handleErrorServer(res, 500, error.message);
    }
}

export async function getEncargados(req, res){
    try{
        const [encargados, errorEncargados] = await getEncargadosService();
        
        if(errorEncargados) return handleErrorClient(res, 404, errorEncargados);
        
        encargados.length === 0
        ? handleSuccess(res, 204)
        : handleSuccess(res, 200, "Encargados encontrados", encargados);
    }catch(error){
        handleErrorServer(res, 500, error.message);
    }
}

export async function updateEncargado(req, res){
    try{
        const { rut, id, email, nombreCompleto } = req.query;
        const { body } = req;
        
        const { error: queryError } = encargadoQueryValidation.validate({
            rut,
            id,
            email,
            nombreCompleto
        });
        
        if(queryError){
             return handleErrorClient(
            res,
            400,
            queryError.message
            );
        }
        
        const { error: bodyError } = encargadoBodyValidation.validate(body);
        
        if(bodyError){
            return handleErrorClient(
            res,
            400,
            bodyError.message
            );
        }
        const [updatedEncargado, errorUpdate] = await updateEncargadoService({ rut, id, email }, body);
        
        if(errorUpdate) return handleErrorClient(res, 404,"Error al actualizar el encargado", errorUpdate);
        
        handleSuccess(res, 200, "Encargado actualizado", updatedEncargado);
    }catch(error){
        handleErrorServer(res, 500, error.message);
    }
}

export async function deleteEncargado(req, res){
    try{
        const { rut, id, email ,nombreCompleto } = req.query;
        
        const { error } = encargadoQueryValidation.validate({ 
            rut,
            id,
            email,
            nombreCompleto
        });
        
        if(error) return handleErrorClient(res,
            400,
            error.message
        );
        
        const [deletedEncargado, errorDelete] = await deleteEncargadoService({ 
            rut,
            id,
            email 
        });
        
        if(errorDelete) return handleErrorClient(res, 404,"Error al eliminar el encargado", errorDelete);
        
        handleSuccess(res, 200, "Encargado eliminado", deletedEncargado);
    }catch(error){
        handleErrorServer(res, 500, error.message);
    }
}


