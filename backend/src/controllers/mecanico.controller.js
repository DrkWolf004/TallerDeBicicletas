"use strict";
import{
    createMecanicoService,
    deleteMecanicoService,
    getMecanicoService,
    getMecanicosService,
    updateMecanicoService,
} from "../services/mecanico.service.js";
import{
    mecanicoBodyValidation,
    mecanicoQueryValidation,
} from "../validations/mecanico.validation.js";
import{
    handleErrorClient,
    handleErrorServer,
    handleSuccess,
} from "../handlers/responseHandlers.js";


export async function getMecanico(req, res) {
    try {
        const { id } = req.params;
        const { error } = mecanicoQueryValidation.validate({ id });

        if (error) return handleErrorClient(res, 400, error.message);

        const [mecanico, errorMecanico] = await getMecanicoService({ id });

        if (errorMecanico) return handleErrorClient(res, 404, errorMecanico);

        handleSuccess(res, 200, "Mecanico encontrado", mecanico);
    } catch (error) {
        handleErrorServer(res, 500, error.message);
    }
}

export async function getMecanicos(req, res) {
    try {
        const [mecanicos, errorMecanicos] = await getMecanicosService();

        if (errorMecanicos) return handleErrorClient(res, 404, errorMecanicos);

        mecanicos.length === 0
            ? handleSuccess(res, 204)
            : handleSuccess(res, 200, "Mecanicos encontrados", mecanicos);
    } catch (error) {
        handleErrorServer(
            res,
            500,
            error.message,
        );
    }
}

export async function updateMecanico(req, res) {
    try {
        const { rut, id, email } = req.query;
        const { body } = req;

        const { error: queryError } = mecanicoQueryValidation.validate({
            rut,
            id,
            email,
        });

        if (queryError) return handleErrorClient(res, 400, queryError.message);

        const { error: bodyError } = mecanicoBodyValidation.validate(body);

        if (bodyError) return handleErrorClient(res, 400, bodyError.message);

        const [mecanico, errorMecanico] = await updateMecanicoService({ rut, id, email , ...body });

        if (errorMecanico) return handleErrorClient(res, 404, errorMecanico);

        handleSuccess(res, 200, "Mecanico actualizado", mecanico);
    } catch (error) {
        handleErrorServer(res, 500, error.message);
    }
}

export async function createMecanico(req, res) {
    try {
        const { body } = req;

        const { error } = mecanicoBodyValidation.validate(body);

        if (error) return handleErrorClient(res, 400, error.message);

        const [mecanico, errorMecanico] = await createMecanicoService(body);

        if (errorMecanico) return handleErrorClient(res, 404, errorMecanico);

        handleSuccess(res, 201, "Mecanico creado", mecanico);
    } catch (error) {
        handleErrorServer(res, 500, error.message);
    }
}

export async function deleteMecanico(req, res) {
    try {
        const { rut, id, email } = req.query;

        const { error } = mecanicoQueryValidation.validate({ rut, id, email });

        if (error) return handleErrorClient(res, 400, error.message);

        const [mecanico, errorMecanico] = await deleteMecanicoService({ rut, id, email });

        if (errorMecanico) return handleErrorClient(res, 404, errorMecanico);

        handleSuccess(res, 200, "Mecanico eliminado", mecanico);
    } catch (error) {
        handleErrorServer(res, 500, error.message);
    }
}