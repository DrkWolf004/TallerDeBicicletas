"use strict";
import Aviso from "../entity/aviso.entity.js";
import { AppDataSource } from "../config/configDb.js";

export async function createAvisoService(dataAviso) {
    try {
        const avisoRepository = AppDataSource.getRepository(Aviso);
        /*
        const existingAviso = await avisoRepository.findOne({
            where: [{ aviso: dataAviso.aviso }],
        });

        if(existingAviso != null){
            return[null, "Ya existe este aviso"];
        }
        */
        const newAviso = avisoRepository.create({
            texto: dataAviso.texto,
            resuelto: false
        });

        const avisosaved = await avisoRepository.save(newAviso);

        return[avisosaved, "Nuevo aviso creado"];

    } catch (error) {
        console.log("Error al crear el aviso");
    }
}

export async function getAvisoService(query) {
    try {
        const { id } = query;

        const avisoRepository = AppDataSource.getRepository(Aviso);

        const avisoFound = await avisoRepository.findOne({
            where: { id: id },
        });

        if(!avisoFound) return [null, "No se encontró el aviso"];

        const avisoData = avisoFound;

        return [avisoData, null];

    } catch (error) {
        console.error("Error al obtener el aviso", error);
        return [null, "Error en el servidor"];
    }
}

export async function getAvisosService() {
    try {
        const avisoRepository = AppDataSource.getRepository(Aviso);

        const avisos = await avisoRepository.find();

        if(!avisos || avisos.length === 0) return [null, "No hay avisos"];

        const avisosData = avisos.map(({ aviso }) => aviso);

        return [avisosData, null];

    } catch (error) {
        console.error("Error al obtener los avisos");
        return [null, "Error en el servidor"];
    }
}

export async function updateAvisoService(query, body){
    try {
        const { id } = query;
  
      const avisoRepository = AppDataSource.getRepository(Aviso);
  
      const avisoFound = await avisoRepository.findOne({
        where: { id: id },
      });
  
      if (!avisoFound) return [null, "Aviso no encontrado"];
  
      const existingAviso = await avisoRepository.findOne({
        where: { Aviso: body.Aviso },
      });
  
      if (existingAviso && existingAviso.id !== avisoFound.id) {
        return [null, "Ya existe este aviso"];
      }
  
      const dataAvisoUpdate = {
        aviso: body.aviso,
        updatedAt: new Date(),
      };
  
  
      await avisoRepository.update({ id: avisoFound.id }, dataAvisoUpdate);
  
      const avisoData = await avisoRepository.findOne({
        where: { id: avisoFound.id },
      });
  
      if (!avisoData) {
        return [null, "Aviso no encontrado después de actualizar"];
      }
  
      const avisoUpdated  = avisoData;
  
      return [avisoUpdated, null];
    } catch (error) {
        console.error("Error al actualizar el aviso", error);
        return [null, "Error interno del servidor"];
    }
}

export async function deleteAvisoService(query) {
    try {
        const { id } = query;
  
        const avisoRepository = AppDataSource.getRepository(Aviso);
    
        const avisoFound = await avisoRepository.findOne({
          where: [{ id: id }],
        });
    
        if (!avisoFound) return [null, "Aviso no encontrado"];
    
        const avisoDeleted = await avisoRepository.remove(avisoFound);
    
        const { dataAviso } = avisoDeleted;

        return [dataAviso,null];
    } catch (error) {
        console.error("Error al eliminar el aviso", error);
        return [null, "Error interno del servidor"];
    }
}