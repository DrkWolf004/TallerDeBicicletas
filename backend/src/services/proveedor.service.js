"use strict";
import Proveedor from "../entity/proveedor.entity.js";
import { AppDataSource } from "../config/configDb.js";
import { comparePassword, encryptPassword } from "../helpers/bcrypt.helper.js";

export async function getProveedorService(query) {
    try {
        const { rut, id, email } = query;
    
        const proveedorRepository = AppDataSource.getRepository(Proveedor);
    
        const proveedorFound = await proveedorRepository.findOne({
        where: [{ id: id }, { rut: rut }, { email: email }],
        });
    
        if (!proveedorFound) return [null, "Proveedor no encontrado"];
    
        const { password, ...proveedorData } = proveedorFound;
    
        return [proveedorData, null];
    } catch (error) {
        console.error("Error obtener el proveedor:", error);
        return [null, "Error interno del servidor"];
    }
}
    
export async function getProveedoresService() {
    try {
        const proveedorRepository = AppDataSource.getRepository(Proveedor);
            
        const proveedores = await proveedorRepository.find();
        
        if (!proveedores || proveedores.length === 0) return [null, "No hay proveedores"];
        
       const proveedoresData = proveedores.map(({ password, ...proveedor }) => proveedor);
            
    return [proveedoresData, null];
    } catch (error) {
        console.error("Error al obtener a los proveedores:", error);
        return [null, "Error interno del servidor"];
        }
}

export async function updateProveedorService(query, body) {
    try {
        const { id, rut, email } = query;
            
        const proveedorRepository = AppDataSource.getRepository(Proveedor);
        
        const proveedorFound = await proveedorRepository.findOne({
            where: [{ id: id }, { rut: rut }, { email: email }],
        });
        
        if (!proveedorFound) return [null, "Proveedor no encontrado"];
        
        const existingProveedor = await proveedorRepository.findOne({
                where: [{ rut: body.rut }, { email: body.email }],
        });
        
        if (existingProveedor && existingProveedor.id !== proveedorFound.id) {
           return [null, "Ya existe un proveedor con ese rut o email"];
        }
        
        const proveedorUpdated = await proveedorRepository.save({
           ...proveedorFound,
           ...body,
        });
        
        return [proveedorUpdated, null];
    } catch (error) {
        console.error("Error al actualizar al proveedor:", error);
        return [null, "Error interno del servidor"];
    }
}

export async function createProveedorService(body) {
    try {
        const proveedorRepository = AppDataSource.getRepository(Proveedor);
        const existingProveedor = await proveedorRepository.findOne({
            where: [{ rut: body.rut }, { email: body.email }],
        });
        if (existingProveedor) return [null, "Ya existe un proveedor con ese rut o email"];
        const proveedorCreated = await proveedorRepository.save({
            ...body,
            password: await encryptPassword(body.password),
        });
        return [proveedorCreated, null];
    } catch (error) {
        console.error("Error al crear el proveedor:", error);
        return [null, "Error interno del servidor"];
    }
}

export async function deleteProveedorService(query) {
    try {
        const { id, rut, email } = query;
        const proveedorRepository = AppDataSource.getRepository(Proveedor);
        const proveedorFound = await proveedorRepository.findOne({
            where: [{ id: id }, { rut: rut }, { email: email }],
        });
        if (!proveedorFound) return [null, "Proveedor no encontrado"];
        await proveedorRepository.remove(proveedorFound);
        return [proveedorFound, null];
    } catch (error) {
        console.error("Error al eliminar al proveedor:", error);
        return [null, "Error interno del servidor"];
    }
}