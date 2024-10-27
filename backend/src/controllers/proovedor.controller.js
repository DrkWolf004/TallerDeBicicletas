"user strict";
import {
    createProovedor,
    deleteProovedor,
    getProovedor,
    getProovedores,
    updateProovedor,
} from "../controllers/proovedor.controller.js";
import{
    proovedorBodyValidation,
    proovedorQueryValidation,
}from "../validations/proovedor.validation.js";
import{
    handleErrorClient,
    handleErrorServer,
    handleSuccess,
}from "../handlers/responseHandlers.js";
import { userBodyValidation } from "../validations/user.validation.js";

export async function getProovedor(req, res) {
    try {
        const { rut, id, email, telefono, direccion } = req.query;

        const { error } = proovedorQueryValidation.validate({ rut, id, email, telefono, direccion });

        if (error) return handleErrorClient(res, 400, error.message);

        const [proovedor, errorProovedor] = await getProovedorService({ rut, id, email });

        if (errorProovedor) return handleErrorClient(res, 404, errorProovedor);

        handleSuccess(res, 200, "Proovedor encontrado", proovedor);
    } catch (error) {
        handleErrorServer(res, 500, error.message);
    }
}

export async function getProovedores(req, res) {
    try {
        const [proovedores, errorProovedores] = await getProovedoresService();

        if (errorProovedores) return handleErrorClient(res, 404, errorProovedores);

        proovedores.length === 0
            ? handleSuccess(res, 204)
            : handleSuccess(res, 200, "Proovedores encontrados", proovedores);
    } catch (error) {
        handleErrorServer(
            res,
            500,
            error.message,
        );
    }
}

export async function updateProovedor(req, res) {
    try {
        const { rut, id, email } = req.query;
        const { body } = req;

        const { error: queryError } = proovedorQueryValidation.validate({
            rut,
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
       const { error: bodyError } = proovedorBodyValidation.validate(body);

        if (bodyError)
            return handleErrorClient(
            res,
            400,
            "Error de validación en la consulta",
            bodyError.message,
        );

        const [proovedor, errorProovedor] = await updateProovedorService({ rut, id, email }, body);

        if (errorProovedor)
            return handleErrorClient(
            res,
            404,
            "Error de validación en la consulta",
            errorProovedor
        );
        handleSuccess(res, 200, "Proovedor actualizado", proovedor);
    } catch (error) {
        handleErrorServer(res, 500, error.message);
    }
}

export async function deleteProovedor(req, res) {
    try {
        const { rut, id, email } = req.query;

        const { error } = proovedorQueryValidation.validate({ rut, id, email });

        if (error) return handleErrorClient(res, 400, error.message);

        const [proovedor, errorProovedor] = await deleteProovedorService({ rut, id, email });

        if (errorProovedor) return handleErrorClient(res, 404, errorProovedor);

        handleSuccess(res, 200, "Proovedor eliminado", proovedor);
    } catch (error) {
        handleErrorServer(res, 500, error.message);
    }
}