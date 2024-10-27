"use strict";
import { EntitySchema } from "typeorm";

const MecanicoSchema = new EntitySchema({
    name: "Mecanico",
    tableName: "mecanicos",
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
        disponibilidad: {
        type: "boolean",
        nullable: false,
        },
        telefono: {
        type: "varchar",
        length: 12,
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
        name: "IDX_MECANICO",
        columns: ["id"],
        unique: true,
        },
        {
        name: "IDX_MECANICO_RUT",
        columns: ["rut"],
        unique: true,
    },
    {
        name: "IDX_MECANICO_EMAIL",
        columns: ["email"],
        unique: true,
    },
    {
        name: "IDX_MECANICO_TELEFONO",
        columns: ["telefono"],
        unique: true,
    },
    ],
});

export default MecanicoSchema;