"use strict";
import { EntitySchema } from "typeorm";

const productoSchema = new EntitySchema({
    name: "Tproducto",
    tableName: "Tipo_Producto",

    columns: {
        id: {
            type: "int",
            primary: true,
            generated: true,
        },
        nombre: {
            type: "varchar",
            length: 20,
            nullable: false,
            unique: false,
        },
        idTipo:{
            type: "int",
            nullable: false,
            
        },
        cantidad: {
            type: "int",
        },
        descripcion: {
            type: "varchar",
            nullable: false,
        },
        createdAt: {
            type: "timestamp with time zone",
            default: () => "CURRENT_TIMESTAMP",
            nullable: false,
        },
        updatedAt: {
            type: "timestamp with time zone",
            default: () => "CURRENT_TIMESTAMP",
            onUpdate: "CURRENT_TIMESTAMP",
            nullable: false,
        },
    },
    relations: {
        tipo: {
            target: "Tipo", // Nombre de la entidad relacionada
            type: "many-to-one", // Relación muchos a uno
            joinColumn: { name: "idTipo" }, // Nombre de la columna en esta tabla
            onDelete: "CASCADE", // Comportamiento al eliminar
            onUpdate: "CASCADE", // Comportamiento al actualizar
        },
    },
    indices: [
        {
          name: "IDX_producto",
          columns: ["id"],
          unique: true,
        },
    ],
});

export default productoSchema;
