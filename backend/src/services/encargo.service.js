"use strict";
import Encargo from "../entity/encargo.entity.js";
import Mecanico from "../entity/mecanico.entity.js";
import { AppDataSource } from "../config/configDb.js";


export async function createEncargoService(dataEncargo) {
    try {
        const encargoRepository = AppDataSource.getRepository(Encargo);
        const mecanicoRepository = AppDataSource.getRepository(Mecanico);


        const mecanico = await mecanicoRepository.findOne({
            where: { nombreCompleto: dataEncargo.mecanicoAsignado, disponibilidad: true },
        });

        if (!mecanico) {
            return [null, "El mecánico no está disponible o no existe"];
        }


        const newEncargo = encargoRepository.create({
            nombreCliente: dataEncargo.nombreCliente,
            telCliente: dataEncargo.telCliente,
            tarea: dataEncargo.tarea,
            detalle: dataEncargo.detalle,
            mecanicoAsignado: dataEncargo.mecanicoAsignado,
            horas: dataEncargo.horas,
            estado: "pendiente"
        });

        const encargoSaved = await encargoRepository.save(newEncargo);
        console.log(mecanico)
        mecanico.disponibilidad = false;
        await mecanicoRepository.save(mecanico);
        console.log(mecanico)
        return [encargoSaved, "Se ha creado un nuevo encargo"];
    } catch (error) {
        console.error("Error al crear el encargo:", error);
        return [null, "Error interno del servidor"];
    }
}

export async function getEncargoService({ id }) {
    try {
        const encargoRepository = AppDataSource.getRepository(Encargo);
        const encargoFound = await encargoRepository.findOne({
            where: { id: id },
        });

        if (!encargoFound) return [null, "Encargo no encontrado"];

        return [encargoFound, null]; // Aquí deberías retornar el encargo encontrado
    } catch (error) {
        console.error("Error al obtener el encargo:", error);
        return [null, "Error interno del servidor"];
    }
}

export async function getEncargosService() {
    try {
        const encargoRepository = AppDataSource.getRepository(Encargo);

        const encargos = await encargoRepository.find();

        if (!encargos || encargos.length === 0) return [null, "No hay encargos"];

        return [encargos, null];
    } catch (error) {
        console.error("Error al obtener los encargos:", error);
        return [null, "Error interno del servidor"];
    }
}

export async function updateEncargoService(query, body) {
    try {
        const { id } = query;
        const encargoRepository = AppDataSource.getRepository(Encargo);

        const encargoFound = await encargoRepository.findOne({
            where: { id: id },
        });

        if (!encargoFound) return [null, "Encargo no encontrado"];

        const encargoUpdateData = {
            tarea: body.tarea,
            horas: body.horas,
            estado: body.estado,
            updatedAt: new Date(),
        };

        await encargoRepository.update({ id: encargoFound.id }, encargoUpdateData);

        const encargoUpdated = await encargoRepository.findOne({
            where: { id: encargoFound.id },
        });

        if (!encargoUpdated) {
            return [null, "Encargo no encontrado después de actualizar"];
        }

        return [encargoUpdated, null];
    } catch (error) {
        console.error("Error al actualizar el encargo:", error);
        return [null, "Error interno del servidor"];
    }
}

export async function deleteEncargoService(query) {
    try {
        const { id } = query;
        const encargoRepository = AppDataSource.getRepository(Encargo);
        const mecanicoRepository = AppDataSource.getRepository(Mecanico);

        const encargoFound = await encargoRepository.findOne({
            where: { id: id },
        });

        if (!encargoFound) return [null, "Encargo no encontrado"];

        const encargoDeleted = await encargoRepository.remove(encargoFound);

       


        const mecanico = await mecanicoRepository.findOne({
            where: { nombreCompleto: encargoFound.mecanicoAsignado }
        });


        
        if (mecanico) {
            mecanico.disponibilidad = true;
            await mecanicoRepository.save(mecanico);
        }

        return [encargoDeleted, null];
    } catch (error) {
        console.error("Error al eliminar el encargo:", error);
        return [null, "Error interno del servidor"];
    }
}
