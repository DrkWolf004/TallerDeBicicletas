"use strict";
import Proveedor from "../entity/proveedor.entity.js";
import { AppDataSource } from "../config/configDb.js";
import { comparePassword, encryptPassword } from "../helpers/bcrypt.helper.js";

export async function createProveedorService(dataProveedor) {
    try{
        const proveedorRepository = AppDataSource.getRepository(Proveedor);

        const existingNombre = await proveedorRepository.findOne({
            where: [{ nombre: dataProveedor.nombre }],
        });

        if(existingNombre != null){
            return [null, "Ya existe este proveedor"];
        }

        const newProveedor = proveedorRepository.create({
            nombre: dataProveedor.nombre,
            email: dataProveedor.email,
            telefono: dataProveedor.telefono,
            direccion: dataProveedor.direccion,
        });

        const proveedorsaved = await proveedorRepository.save(newProveedor);

        return [proveedorsaved, "Se ha creado un nuevo proveedor"];

    } catch(error){
        console.error("Error al crear el proveedor",error);
    }
}


export async function getProveedorService(query) {
    try {
        const { id, email } = query;
    
        const proveedorRepository = AppDataSource.getRepository(Proveedor);
    
        const proveedorFound = await proveedorRepository.findOne({
        where: [{ id: id }, { email: email }],
        });
    
        if (!proveedorFound) return [null, "Proveedor no encontrado"];
    
        const proveedorData  = proveedorFound;
    
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
        const { id, email } = query;
            
        const proveedorRepository = AppDataSource.getRepository(Proveedor);
        
        const proveedorFound = await proveedorRepository.findOne({
            where: [{ id: id }, { email: email }],
        });
        
        if (!proveedorFound) return [null, "Proveedor no encontrado"];
        
        const existingProveedor = await proveedorRepository.findOne({
                where: [, { email: body.email }],
        });
        
        if (existingProveedor && existingProveedor.id !== proveedorFound.id) {
           return [null, "Ya existe un proveedor con ese email"];
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

export async function deleteProveedorService(query) {
    try {
        const { id, email } = query;
        const proveedorRepository = AppDataSource.getRepository(Proveedor);
        const proveedorFound = await proveedorRepository.findOne({
            where: [{ id: id }, { email: email }],
        });
        if (!proveedorFound) return [null, "Proveedor no encontrado"];
        await proveedorRepository.remove(proveedorFound);
        return [proveedorFound, null];
    } catch (error) {
        console.error("Error al eliminar al proveedor:", error);
        return [null, "Error interno del servidor"];
    }
}