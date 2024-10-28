"use strict";
import { EntitySchema } from "typeorm";

const TproductoSchema = new EntitySchema({
    name: "Tproducto",
    tableName: "Tipo_Producto",

    columns: {
        id: {
            type: "int",
            primary: true,
            generated: true,
        },
        tipo: {
            type: "varchar",
            length: 12,
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
          name: "IDX_Tproducto",
          columns: ["id"],
          unique: true,
        },
        {
          name: "IDX_TipoProducto",
          columns: ["tipo"],
          unique: true,
        },
    ],
});

export default TproductoSchema;
