"use strict";
import product from "../entity/Producto.entity.js"; 
import { AppDataSource } from "../config/configDb.js";

export async function createproductoService(dataProduct) {
    try{
        const ProductRepository = AppDataSource.getRepository(product);

        const newproduct = ProductRepository.create({
            nombre: dataProduct.nombre,
            idTipo: dataProduct.idTipo,
            cantidad: dataProduct.cantidad,
            descripcion: dataProduct.descripcion,
        });

        const Productsaved = await ProductRepository.save(newproduct);

        return [Productsaved, "Se ha creado un nuevo producto"];

    } catch(error){
        console.error("Error al crear tipo de producto",error);
    }
}

export async function getproductoService(query) {
    try {
      const { id } = query;
  
      const ProductRepository = AppDataSource.getRepository(product);
  
      const productoFound = await ProductRepository.findOne({
        where: { id: id },
      });
  
      if (!productoFound) return [null, "Producto no encontrado"];
  
      const productoData  = productoFound;
  
      return [productoData, null];
    } catch (error) {
      console.error("Error obtener producto:", error);
      return [null, "Error interno del servidor"];
    }
  }
  
  export async function getproductosService() {
    try {
      const ProductRepository = AppDataSource.getRepository(product);
  
      const products = await ProductRepository.find();
  
      if (!products|| products.length === 0) return [null, "No productos"];
  
      const productsData = products.map(({ nombre }) => nombre);
  
      return [productsData, null];
    } catch (error) {
      console.error("Error al obtener a los productos:", error);
      return [null, "Error interno del servidor"];
    }
  }
  
  export async function updateproductoService(query, body) {
    try {
      const { id } = query;
  
      const ProductRepository = AppDataSource.getRepository(product);
  
      const productFound = await ProductRepository.findOne({
        where: { id: id },
      });
  
      if (!productFound) return [null, "Producto no encontrado"];
  
      const dataProductUpdate = {
        nombre: body.nombre,
        cantidad: body.cantidad,
        idTipo: body.idTipo,
        descripcion: body.descripcion,
        updatedAt: new Date(),
      };
  
  
      await ProductRepository.update({ id: productFound.id }, dataProductUpdate);
  
      const ProductData = await ProductRepository.findOne({
        where: { id: productFound.id },
      });
  
      if (!ProductData) {
        return [null, "Producto no encontrado después de actualizar"];
      }
  
      const ProductUpdated  = ProductData;
  
      return [ProductUpdated, null];
    } catch (error) {
      console.error("Error al modificar un Producto:", error);
      return [null, "Error interno del servidor"];
    }
  }
  
  export async function deleteproductoService(query) {
    try {
      const { id } = query;
  
      const ProductRepository = AppDataSource.getRepository(product);
  
      const productFound = await ProductRepository.findOne({
        where: [{ id: id }],
      });
  
      if (!productFound) return [null, "Producto no encontrado"];
  
      const ProductDeleted = await tipoRepository.remove(productFound);
  
      const { dataProduct } = ProductDeleted;
  
      return [dataProduct, null];
    } catch (error) {
      console.error("Error al eliminar un Producto:", error);
      return [null, "Error interno del servidor"];
    }
  }