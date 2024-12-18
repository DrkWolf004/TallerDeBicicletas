"use strict";
import Mecanico from "../entity/mecanico.entity.js";
import { AppDataSource } from "../config/configDb.js";
import { comparePassword, encryptPassword } from "../helpers/bcrypt.helper.js";

export async function createMecanicoService(body) {
    try {
        const mecanicoRepository = AppDataSource.getRepository(Mecanico);
        const existingMecanico = await mecanicoRepository.findOne({
            where: [{ rut: body.rut }, { email: body.email }],
        });
        if (existingMecanico) return [null, "Ya existe un mecanico con ese rut o email"];
        const mecanico = await mecanicoRepository.save(body);
        return [mecanico, null];
    } catch (error) {
        console.error("Error al crear al mecanico:", error);
        return [null, "Error interno del servidor"];
    }
}
export async function getMecanicoService({ id, rut, email }) {
    try {
        const mecanicoRepository = AppDataSource.getRepository(Mecanico);
        const query = {};

        if (id) query.id = id;
        if (rut) query.rut = rut;
        if (email) query.email = email;

        const mecanicoFound = await mecanicoRepository.findOne({ where: query });
        if (!mecanicoFound) return [null, "Mecanico no encontrado"];

        const mecanicoData = { ...mecanicoFound };
        delete mecanicoData.password;

        return [mecanicoData, null];
    } catch (error) {
        console.error("Error al obtener el mecanico:", error);
        return [null, "Error interno del servidor"];
    }
}

export async function getMecanicosService() {
    try {
        const mecanicoRepository = AppDataSource.getRepository(Mecanico);
        const mecanicos = await mecanicoRepository.find();
        if (!mecanicos || mecanicos.length === 0) return [null, "No hay mecanicos"];
        const mecanicosData = mecanicos.map(({ password, ...mecanico }) => mecanico);
        return [mecanicosData, null];
    } catch (error) {
        console.error("Error al obtener a los mecanicos:", error);
        return [null, "Error interno del servidor"];
    }
}

export async function updateMecanicoService(query, body) {
    try {
        const { id, rut, email } = query;
        const mecanicoRepository = AppDataSource.getRepository(Mecanico);
        const mecanicoFound = await mecanicoRepository.findOne({
            where: [{ id: id }, { rut: rut }, { email: email }],
        });
        if (!mecanicoFound) return [null, "Mecanico no encontrado"];
        const existingMecanico = await mecanicoRepository.findOne({
            where: [{ rut: body.rut }, { email: body.email }],
        });
        if (existingMecanico && existingMecanico.id !== mecanicoFound.id) {
            return [null, "Ya existe un mecanico con ese rut o email"];
        }
        const mecanicoUpdated = await mecanicoRepository.save({
            ...mecanicoFound,
            ...body,
        });
        return [mecanicoUpdated, null];
    } catch (error) {
        console.error("Error al actualizar al mecanico:", error);
        return [null, "Error interno del servidor"];
    }
}



export async function deleteMecanicoService(query) {
    try {
        const { id, rut, email } = query;
        const mecanicoRepository = AppDataSource.getRepository(Mecanico);
        const whereConditions = {};
        if (id) whereConditions.id = id;
        if (rut) whereConditions.rut = rut;
        if (email) whereConditions.email = email;

        const mecanicoFound = await mecanicoRepository.findOne({ where: whereConditions });

        if (!mecanicoFound) return [null, "Mecanico no encontrado"];

        await mecanicoRepository.remove(mecanicoFound);
        return [mecanicoFound, null];
    } catch (error) {
        console.error("Error al eliminar al mecanico:", error);
        return [null, "Error interno del servidor"];
    }
}