"use strict";
import { boolean } from "joi";
import { EntitySchema } from "typeorm";

const AvisoSchema = new EntitySchema({
    name: "Aviso",
    tableName: "avisos",
    columns: {
        id: {
            type: "int",
            primary: true,
            generated: true,
        },

        createdAt: {
            type: "timestamp with time zone",
            default: () => "CURRENT_TIMESTAMP",
            nullable: false,
            },
        
        texto: {
            type: varchar,
            length: 40,
            nullable: false,
        },

        resuelto: {
            type: boolean,
            default: false,
            nullable: false,
        }
    },

    indices: [
        {
            name: "IDX_AVISO",
            columns: ["id"],
            unique: true,
        },

        {
            name: "IDX_TEXTO",
            columns: ["texto"],
            unique: true,
        },

        {
            name: "IDX_RESUELTO",
            columns: ["resuelto"],
            unique: false,
        },
    ],
});

export default AvisoSchema;