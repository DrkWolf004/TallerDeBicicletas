"use strict";
import Tproducto from "../entity/TipoProducto.entity.js"; 
import { AppDataSource } from "../config/configDb.js";

export async function createTproductoService(dataTipo) {
    try{
        const tipoRepository = AppDataSource.getRepository(Tproducto);

        const existingTipo = await tipoRepository.findOne({
            where: [{ tipo: dataTipo.tipo }],
        });

        if(existingTipo != null){
            return [null, "Ya existe un este tipo de producto"];
        }

        const newTipo = tipoRepository.create({
            tipo: dataTipo.tipo
        });

        const tiposaved = await tipoRepository.save(newTipo);

        return [tiposaved, "Se ha creado un nuevo tipo de producto"];

    } catch(error){
        console.error("Error al crear tipo de producto",error);
    }
}

export async function getTproductoService(query) {
    try {
      const { id } = query;
  
      const tipoRepository = AppDataSource.getRepository(Tproducto);
  
      const TproductoFound = await tipoRepository.findOne({
        where: { id: id },
      });
  
      if (!TproductoFound) return [null, "Tipo de producto no encontrado"];
  
      const TproductoData  = TproductoFound;
  
      return [TproductoData, null];
    } catch (error) {
      console.error("Error obtener el tipo de producto:", error);
      return [null, "Error interno del servidor"];
    }
  }
  
  export async function getTproductosService() {
    try {
      const tipoRepository = AppDataSource.getRepository(Tproducto);
  
      const tipos = await tipoRepository.find();
  
      if (!tipos|| tipos.length === 0) return [null, "No hay tipos de producto"];
  
      const tiposData = tipos.map(({ tipo }) => tipo);
  
      return [tiposData, null];
    } catch (error) {
      console.error("Error al obtener a los tipos de productos:", error);
      return [null, "Error interno del servidor"];
    }
  }
  
  export async function updateTproductoService(query, body) {
    try {
      const { id } = query;
  
      const tipoRepository = AppDataSource.getRepository(Tproducto);
  
      const tipoFound = await tipoRepository.findOne({
        where: { id: id },
      });
  
      if (!tipoFound) return [null, "Tipo de producto no encontrado"];
  
      const existingTipo = await tipoRepository.findOne({
        where: { tipo: body.tipo },
      });
  
      if (existingTipo && existingTipo.id !== tipoFound.id) {
        return [null, "Ya existe un este tipo de producto"];
      }
  
      const datatipoUpdate = {
        tipo: body.tipo,
        updatedAt: new Date(),
      };
  
  
      await tipoRepository.update({ id: tipoFound.id }, datatipoUpdate);
  
      const tipoData = await tipoRepository.findOne({
        where: { id: tipoFound.id },
      });
  
      if (!tipoData) {
        return [null, "Tipo de producto no encontrado después de actualizar"];
      }
  
      const tipoUpdated  = tipoData;
  
      return [tipoUpdated, null];
    } catch (error) {
      console.error("Error al modificar un tipo de producto:", error);
      return [null, "Error interno del servidor"];
    }
  }
  
  export async function deleteTproductoService(query) {
    try {
      const { id } = query;
  
      const tipoRepository = AppDataSource.getRepository(Tproducto);
  
      const tipoFound = await tipoRepository.findOne({
        where: [{ id: id }],
      });
  
      if (!tipoFound) return [null, "Tipo de producto no encontrado"];
  
      const tipoDeleted = await tipoRepository.remove(tipoFound);
  
      const { dataTipo } = tipoDeleted;
  
      return [dataTipo, null];
    } catch (error) {
      console.error("Error al eliminar un Tipo de producto:", error);
      return [null, "Error interno del servidor"];
    }
  }