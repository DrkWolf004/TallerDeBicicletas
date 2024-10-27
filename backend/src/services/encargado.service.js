"use strict";
import Encargado from "../entity/encargado.entity";
import { AppDataSource } from "../config/configDb";
import { comparePassword, encryptPassword } from "../helpers/bcrypt.helper";

export async function getEncargadoService(query) {
    try {
        const { rut, id, email } = query;

        const encargadoRepository = AppDataSource.getRepository(Encargado);

        const encargadoFound = await encargadoRepository.findOne({
            where: [{ id: id }, { rut: rut }, { email: email }],
        });

        if (!encargadoFound) return [null, "Encargado no encontrado"];

        const { password, ...encargadoData } = encargadoFound;

        return [encargadoData, null];
        } catch (error) {
            console.error("Error obtener el encargado:", error);
            return [null, "Error interno del servidor"];
            }
        }
        
    export async function getEncargadosService() {
        try {
            const encargadoRepository = AppDataSource.getRepository(Encargado);
            
            const encargados = await encargadoRepository.find();
        
            if (!encargados || encargados.length === 0) return [null, "No hay encargados"];
        
            const encargadosData = encargados.map(({ password, ...encargado }) => encargado);
            
            return [encargadosData, null];
        } catch (error) {
            console.error("Error al obtener a los encargados:", error);
            return [null, "Error interno del servidor"];
            }
    }

    export async function updateEncargadoService(query, body) {
        try {
            const { id, rut, email } = query;
            
            const encargadoRepository = AppDataSource.getRepository(Encargado);
        
            const encargadoFound = await encargadoRepository.findOne({
                where: [{ id: id }, { rut: rut }, { email: email }],
            });
        
            if (!encargadoFound) return [null, "Encargado no encontrado"];
        
            const existingEncargado = await encargadoRepository.findOne({
                    where: [{ rut: body.rut }, { email: body.email }],
            });
        
           if (existingEncargado && existingEncargado.id !== encargadoFound.id) {
                return [null, "Ya existe un encargado con ese rut o email"];
            }
        
            const updatedEncargado = await encargadoRepository.save({
                ...encargadoFound,
                ...body,
            });
        
            const { password, ...encargadoData } = updatedEncargado;
        
            return [encargadoData, null];
        } catch (error) {
            console.error("Error al actualizar al encargado:", error);
            return [null, "Error interno del servidor"];
        }
    }

    export async function deleteEncargadoService(query) {
        try {
            const { id, rut, email } = query;
            
            const encargadoRepository = AppDataSource.getRepository(Encargado);
        
            const encargadoFound = await encargadoRepository.findOne({
                where: [{ id: id }, { rut: rut }, { email: email }],
            });
        
            if (!encargadoFound) return [null, "Encargado no encontrado"];
        
            await encargadoRepository.remove(encargadoFound);
        
            return [encargadoFound, null];
        } catch (error) {
            console.error("Error al eliminar al encargado:", error);
            return [null, "Error interno del servidor"];
        }
    }