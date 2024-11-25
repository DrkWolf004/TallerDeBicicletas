"use strict";

import {
    createproductoService,
    deleteproductoService,
    getproductoService,
    getproductosService,
    updateproductoService,
}from "../services/Producto.service.js";

import{
    ProductBodyValidation,
    ProductQueryValidation,
} from "../validations/Producto.validation.js";

import {
  handleErrorClient,
  handleErrorServer,
  handleSuccess,
} from "../handlers/responseHandlers.js";

export async function postProduct(req,res) {
    try{
        const producto = req.body

        const { value, error } = ProductBodyValidation.validate(producto);

        if(error) return handleErrorClient(res, 400, error.message);

        const productosaved = await createproductoService(value);

        handleSuccess(res, 201, "Producto creado", productosaved);
    }catch(error){
        console.error("Error al crear el Producto:",error);
    }
}

export async function getProduct(req, res) {
  try {
    const { id } = req.query;

    const { error } = ProductQueryValidation.validate({ id });

    if (error) return handleErrorClient(res, 400, error.message);

    const [Producto, errorProducto] = await getproductoService({ id });

    if (errorProducto) return handleErrorClient(res, 404, errorProducto);

    handleSuccess(res, 200, "Producto encontrado", Producto);
  } catch (error) {
    handleErrorServer(res, 500, error.message);
  }
}

export async function getProducts(req, res) {
  try {
    const [Productos, errorProductos] = await getproductosService();

    if (errorProductos) return handleErrorClient(res, 404, errorProductos);

    tipos.length === 0
      ? handleSuccess(res, 204)
      : handleSuccess(res, 200, "Productos encontrados", Productos);
  } catch (error) {
    handleErrorServer(
      res,
      500,
      error.message,
    );
  }
}

export async function updateProduct(req, res) {
  try {
    const { id } = req.query;
    const { body } = req;

    const { error: queryError } = ProductQueryValidation.validate({
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

    const { error: bodyError } = ProductBodyValidation.validate(body);

    if (bodyError)
      return handleErrorClient(
        res,
        400,
        "Error de validación en los datos enviados",
        bodyError.message,
      );

    const [Producto, ProductoError] = await updateproductoService({ id }, body);

    if (ProductoError) return handleErrorClient(res, 400, "Error modificando el Produto", ProductoError);

    handleSuccess(res, 200, "Producto modificado correctamente", Producto);
  } catch (error) {
    handleErrorServer(res, 500, error.message);
  }
}

export async function deleteProduct(req, res) {
  try {
    const { id } = req.query;

    const { error: queryError } = ProductQueryValidation.validate({
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

    const [ProductoDelete, errorProductoDelete] = await deleteproductoService({
      id,
    });

    if (errorProductoDelete) return handleErrorClient(res, 404, "Error eliminado al usuario", errorProductoDelete);

    handleSuccess(res, 200, "Producto eliminado correctamente", ProductoDelete);
  } catch (error) {
    handleErrorServer(res, 500, error.message);
  }
}