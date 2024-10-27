"use strict";
import { EntitySchema } from "typeorm";

const EncargadoSchema = new EntitySchema({
    name: "Encargado",
    tableName: "encargados",
    columns: {
        id: {
        type: "int",
        primary: true,
        generated: true,
        },
        nombreCompleto: {
        type: "varchar",
        length: 255,
        nullable: false,
        },
        rut: {
        type: "varchar",
        length: 12,
        nullable: false,
        unique: true,
        },
        email: {
        type: "varchar",
        length: 255,
        nullable: false,
        unique: true,
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
        name: "IDX_ENCARGADO",
        columns: ["id"],
        unique: true,
        },
        {
        name: "IDX_ENCARGADO_RUT",
        columns: ["rut"],
        unique: true,
        },
    ],
    });
    export default EncargadoSchema;