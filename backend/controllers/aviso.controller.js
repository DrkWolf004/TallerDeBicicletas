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
        const texto = req.texto;
        const avisosaved = await createAvisoService(value);
        if(error) return handleErrorClient(res, 400, error.message);
        handleSuccess(res, 201, "Aviso creado", avisosaved);
    } catch (error) {
        console.error("Error al crear el aviso", error);
    }
}


export async function getAviso(req, res) {
    try {
        const { id } = req.query;
    
        const { error } = AvisoQueryValidation.validate({ id });
    
        if (error) return handleErrorClient(res, 400, error.message);
    
        const [tipo, errorTipo] = await getTproductoService({ id });
    
        if (errorTipo) return handleErrorClient(res, 404, errorTipo);
    
        handleSuccess(res, 200, "Tipo de producto encontrado", tipo);
      } catch (error) {
        handleErrorServer(res, 500, error.message);
      }
}

export async function getAvisos(req, res) {
    try {
        const [avisos, errorAvisos] = await getAvisosService();
    } catch (error) {
        console.error("Error al obtener los avisos", error);
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
  
      const [tipo, tipoError] = await updateTproductoService({ id }, body);
  
      if (tipoError) return handleErrorClient(res, 400, "Error modificando el tipo de produto", tipoError);
  
      handleSuccess(res, 200, "Tipo de producto modificado correctamente", tipo);
    } catch (error) {
      handleErrorServer(res, 500, error.message);
    }
  }
  
  export async function deleteTipo(req, res) {
    try {
      const { id } = req.query;
  
      const { error: queryError } = TipoQueryValidation.validate({
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
  
      handleSuccess(res, 200, "Aviso eliminado correctamente", tipoDelete);
    } catch (error) {
      handleErrorServer(res, 500, error.message);
    }
  }