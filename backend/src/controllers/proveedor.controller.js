"user strict";
import {
    createProveedorService,
    deleteProveedorService,
    getProveedoresService,
    getProveedorService,
    updateProveedorService,
} from "../services/proveedor.service.js";
import{
    proveedorBodyValidation,
    proveedorQueryValidation,
}from "../validations/proveedor.validation.js";
import{
    handleErrorClient,
    handleErrorServer,
    handleSuccess,
}from "../handlers/responseHandlers.js";
import { userBodyValidation } from "../validations/user.validation.js";

export async function createproveedor(req,res) {
    try{
        const proveedor = req.body

        const { value, error } = proveedorBodyValidation.validate(proveedor);

        if(error) return handleErrorClient(res, 400, error.message);

        const proveedorsaved = await createProveedorService(value);

        handleSuccess(res, 201, "Proveedor creado", proveedorsaved);
    }catch(error){
        console.error("Error al crear el proveedor:",error);
    }
}

export async function getProveedor(req, res) {
    try {
        const { id, email, telefono, direccion } = req.query;

        const { error } = proveedorQueryValidation.validate({ id, email, telefono, direccion });

        if (error) return handleErrorClient(res, 400, error.message);

        const [proveedor, errorProveedor] = await getProveedorService({ id, email });

        if (errorProveedor) return handleErrorClient(res, 404, errorProveedor);

        handleSuccess(res, 200, "Proveedor encontrado", proveedor);
    } catch (error) {
        handleErrorServer(res, 500, error.message);
    }
}

export async function getProveedores(req, res) {
    try {
        const [proveedores, errorProveedores] = await getProveedoresService();

        if (errorProveedores) return handleErrorClient(res, 404, errorProveedores);

        proveedores.length === 0
            ? handleSuccess(res, 204)
            : handleSuccess(res, 200, "Proveedores encontrados", proveedores);
    } catch (error) {
        handleErrorServer(
            res,
            500,
            error.message,
        );
    }
}

export async function updateProveedor(req, res) {
    try {
        const { id, email } = req.query;
        const { body } = req;

        const { error: queryError } = proveedorQueryValidation.validate({
            id,
            email,
        });

        if (queryError){ 
            return handleErrorClient(
                res,
                400,
                "Error de validación en la consulta",
                queryError.message);
        }
       const { error: bodyError } = proveedorBodyValidation.validate(body);

        if (bodyError)
            return handleErrorClient(
            res,
            400,
            "Error de validación en la consulta",
            bodyError.message,
        );

        const [proveedor, errorProveedor] = await updateProveedorService({ id, email }, body);

        if (errorProveedor)
            return handleErrorClient(
            res,
            404,
            "Error de validación en la consulta",
            errorProveedor
        );
        handleSuccess(res, 200, "Proveedor actualizado", proveedor);
    } catch (error) {
        handleErrorServer(res, 500, error.message);
    }
}
 

export async function deleteProveedor(req, res) {
    try {
        const { id, email } = req.query;

        const { error } = proveedorQueryValidation.validate({ id, email });

        if (error) return handleErrorClient(res, 400, error.message);

        const [proveedor, errorProveedor] = await deleteProveedorService({ id, email });

        if (errorProveedor) return handleErrorClient(res, 404, errorProveedor);

        handleSuccess(res, 200, "Proveedor eliminado", proveedor);
    } catch (error) {
        handleErrorServer(res, 500, error.message);
    }
}
