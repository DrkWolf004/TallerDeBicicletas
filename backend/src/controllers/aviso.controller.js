"use strict";
import{
    createAvisoService,
    deleteAvisoService,
    getAvisoService,
    getAvisosService,
    updateAvisoService,
} from "../services/aviso.service.js";
import{
  AvisoQueryValidation,
  TextoBodyValidation,
} from "../validations/aviso.validation.js";
import{
    handleErrorClient,
    handleErrorServer,
    handleSuccess,
} from "../handlers/responseHandlers.js";

export async function createAviso(req, res) {
    try {
        const texto = req.body;
        const { value, error } = TextoBodyValidation.validate(texto);

        if(error) return handleErrorClient(res, 400, error.message);

        const avisosaved = await createAvisoService(value);

        handleSuccess(res, 201, "Aviso de producto creado", avisosaved);
    } catch (error) {
        console.error("Error al crear el aviso", error);
    }
}


export async function getAviso(req, res) {
    try {
        const { id } = req.query;
    
        const { error } = AvisoQueryValidation.validate({ id });
    
        if (error) return handleErrorClient(res, 400, error.message);
    
        const [aviso, errorAviso] = await getAvisoService({ id });
    
        if (errorAviso) return handleErrorClient(res, 404, errorAviso);
    
        handleSuccess(res, 200, "Aviso de producto encontrado", aviso);
      } catch (error) {
        console.error("Error creando el aviso", error);
      }
}

export async function getAvisos(req, res) {
    try {
        const [avisos, errorAvisos] = await getAvisosService();
        if (errorAvisos) return handleErrorClient(res, 404, errorAvisos);


        if(errorAvisos) return handleErrorClient(res, 404, errorAvisos);

        avisos.length===0
        ?handleSuccess(res, 204)
        : handleSuccess(res, 200, "Avisos encontrados", avisos);

    } catch (error) {
        handleErrorServer(res, 500, error.message);
    }
}

  
  export async function updateAviso(req, res) {
    try {
      const { id } = req.query;
      const { body } = req;
  
      const { error: queryError } = AvisoQueryValidation.validate({
        id,
      });
  
      if (queryError) {
        return handleErrorClient(
          res,
          400,
          "Error de validación en la consulta",
          queryError.message,
        );
      }
  
      const { error: bodyError } = TextoBodyValidation.validate(body);
  
      if (bodyError)
        return handleErrorClient(
          res,
          400,
          "Error de validación en los datos enviados",
          bodyError.message,
        );
  
      const [aviso, avisoError] = await updateAvisoService({ id }, body);
  

      if (avisoError) return handleErrorClient(res, 400, "Error modificando el aviso de produto", avisoError);
  
      handleSuccess(res, 200, "Aviso de producto modificado correctamente", aviso);

    } catch (error) {
      handleErrorServer(res, 500, error.message);
    }
  }
  
  export async function deleteAviso(req, res) {
    try {
      const { id } = req.query;
  
      const { error: queryError } = AvisoQueryValidation.validate({
        id,
      });
  
      if (queryError) {
        return handleErrorClient(
          res,
          400,
          "Error de validación en la consulta",
          queryError.message,
        );
      }
  
      const [avisoDelete, erroravisoDelete] = await deleteAvisoService({
        id,
      });
  
      if (erroravisoDelete) return handleErrorClient(res, 404, "Error eliminado al aviso", erroravisoDelete);
  
      handleSuccess(res, 200, "Aviso eliminado correctamente", avisoDelete);
    } catch (error) {
      handleErrorServer(res, 500, error.message);
    }
  }