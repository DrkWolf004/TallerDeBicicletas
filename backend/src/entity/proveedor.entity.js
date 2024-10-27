"use strict";
import { EntitySchema } from "typeorm";

const ProveedorSchema = new EntitySchema({
    name: "Proveedor",
    tableName: "proveedores",
    columns: {
        id: {
        type: "int",
        primary: true,
        generated: true,
        },
        nombre: {
        type: "varchar",
        length: 255,
        nullable: false,
        },
        email: {
        type: "varchar",
        length: 255,
        nullable: false,
        unique: true,
        },
        telefono: {
        type: "varchar",
        length: 12,
        nullable: false,
        },
        direccion: {
        type: "varchar",
        length: 255,
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
    indices: [
        {
        name: "IDX_PROVEEDOR",
        columns: ["id"],
        unique: true,
        },
        {
        name: "IDX_PROVEEDOR_EMAIL",
        columns: ["email"],
        unique: true,
        },
        {
        name: "IDX_PROVEEDOR_TELEFONO",
        columns: ["telefono"],
        unique: true,
        },
     
    ],
    });


export default ProveedorSchema;