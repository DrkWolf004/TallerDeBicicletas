"use strict";
import {
    createEncargoService,
    deleteEncargoService,
    getEncargoService,
    getEncargosService,
    updateEncargoService,
} from "../services/encargo.service.js";
import {
    encargoBodyValidation,
    encargoPatchValidation,
    encargoQueryValidation,
} from "../validations/encargo.validation.js";
import{
    handleErrorClient,
    handleErrorServer,
    handleSuccess,
} from "../handlers/responseHandlers.js";

export const createEncargo = async (req, res) => {
    const [result, message] = await createEncargoService(req.body);
    if (result) {
        return res.status(201).json({ status: "success", message, details: result });
    } else {
        return res.status(404).json({ status: "Client error", message, details: {} });
    }
};

export async function getEncargo(req, res) {
    try {
        const { id } = req.params; 
        const { error } = encargoQueryValidation.validate({ id });

        if (error) return handleErrorClient(res, 400, error.message);

        const [encargo, errorEncargo] = await getEncargoService({ id });

        if (errorEncargo) return handleErrorClient(res, 404, errorEncargo);

        handleSuccess(res, 200, "Encargo encontrado", encargo);
    } catch (error) {
        handleErrorServer(res, 500, error.message);
    }
}

export async function getEncargos(req, res) {
    try {
        const [encargos, errorEncargos] = await getEncargosService();

        if (errorEncargos) return handleErrorClient(res, 404, errorEncargos);

        encargos.length === 0
            ? handleSuccess(res, 204)
            : handleSuccess(res, 200, "Encargos encontrados", encargos);
    } catch (error) {
        handleErrorServer(res, 500, error.message);
    }
}

export async function updateEncargo(req, res) {
    try {
        const { id } = req.query;
        const { body } = req;

        const { error: queryError } = encargoQueryValidation.validate({ id });
        if (queryError) return handleErrorClient(res, 400, queryError.message);


        const { error: bodyError } = encargoPatchValidation.validate(body);
        if (bodyError) return handleErrorClient(res, 400, bodyError.message);

        const [encargo, errorEncargo] = await updateEncargoService({ id }, body);
        if (errorEncargo) return handleErrorClient(res, 404, errorEncargo);

        handleSuccess(res, 200, "Encargo actualizado", encargo);
    } catch (error) {
        handleErrorServer(res, 500, error.message);
    }
}

export async function deleteEncargo(req, res) {
    try {
        const { id } = req.params; 

        const { error } = encargoQueryValidation.validate({ id });

        if (error) return handleErrorClient(res, 400, error.message);

        const [encargo, errorEncargo] = await deleteEncargoService({ id });

        if (errorEncargo) return handleErrorClient(res, 404, errorEncargo);

        handleSuccess(res, 200, "Encargo eliminado", encargo);
    } catch (error) {
        handleErrorServer(res, 500, error.message);
    }
}