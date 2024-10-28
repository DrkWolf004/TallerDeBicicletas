"use strict";

import {
    createTproductoService,
    deleteTproductoService,
    getTproductoService,
    getTproductosService,
    updateTproductoService,
}from "../services/TipoProducto.service.js";

import{
    TipoBodyValidation,
    TipoQueryValidation,
} from "../validations/TipoProducto.validation.js";

import {
  handleErrorClient,
  handleErrorServer,
  handleSuccess,
} from "../handlers/responseHandlers.js";

export async function postTipo(req,res) {
    try{
        const tipo = req.body

        const { value, error } = TipoBodyValidation.validate(tipo);

        if(error) return handleErrorClient(res, 400, error.message);

        const tiposaved = await createTproductoService(value);

        handleSuccess(res, 201, "Tipo de producto creado", tiposaved);
    }catch(error){
        console.error("Error al crear el tipo de producto:",error);
    }
}

export async function getTipo(req, res) {
  try {
    const { id } = req.query;

    const { error } = TipoQueryValidation.validate({ id });

    if (error) return handleErrorClient(res, 400, error.message);

    const [tipo, errorTipo] = await getTproductoService({ id });

    if (errorTipo) return handleErrorClient(res, 404, errorTipo);

    handleSuccess(res, 200, "Tipo de producto encontrado", tipo);
  } catch (error) {
    handleErrorServer(res, 500, error.message);
  }
}

export async function getTipos(req, res) {
  try {
    const [tipos, errorTipos] = await getTproductosService();

    if (errorTipos) return handleErrorClient(res, 404, errorTipos);

    tipos.length === 0
      ? handleSuccess(res, 204)
      : handleSuccess(res, 200, "Tipos de productos encontrados", tipos);
  } catch (error) {
    handleErrorServer(
      res,
      500,
      error.message,
    );
  }
}

export async function updateTipo(req, res) {
  try {
    const { id } = req.query;
    const { body } = req;

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

    const { error: bodyError } = TipoBodyValidation.validate(body);

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

    const [tipoDelete, errorTipoDelete] = await deleteTproductoService({
      id,
    });

    if (errorTipoDelete) return handleErrorClient(res, 404, "Error eliminado al usuario", errorTipoDelete);

    handleSuccess(res, 200, "Tipo de producto eliminado correctamente", tipoDelete);
  } catch (error) {
    handleErrorServer(res, 500, error.message);
  }
}