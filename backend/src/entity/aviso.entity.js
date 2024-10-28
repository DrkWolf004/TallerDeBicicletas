"use strict";
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
        
        texto: {
            type: "varchar",
            length: 40,
            nullable: false,
        },

        resuelto: {
            type: "boolean",
            default: false,
            nullable: false,
        },
        createdAt: {
            type: "timestamp with time zone",
            default: () => "CURRENT_TIMESTAMP",
            nullable: false,
        }
    },

    indices: [
        {
            name: "IDX_AVISO",
            columns: ["id"],
            unique: true,
        },
    ]
});

export default AvisoSchema;