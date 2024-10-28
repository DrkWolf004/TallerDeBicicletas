"use strict";
import Joi from "joi";

export const AvisoQueryValidation = Joi.object({
    id: Joi.number()
    .integer()
    .positive()
    .messages({
        "number.base": "El id debe ser un numero",
        "number.integer": "El id debe ser entero",
        "number.positive": "El id debe ser positivo",
    }),
})

.or("id")
.unknown(false)
.messages({
    "object.unknown": "No se permiten propiedades adicionales.",
    "object.missing": "Debes proporcionar al menos un parametro: id",
});

export const TextoBodyValidation = Joi.object({
    texto: Joi.string()
    .min(5)
    .max(40)
    .pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)
    .messages({
        "string.empty": "El texto no puede estar vacio",
        "string.base": "El texto debe ser un string",
        "string.min": "El texto debe tener al menos 5 caracteres",
        "string.max": "El texto no puede tener mas de 40 caracteres",
    })
})   

.or("texto")
.unknown(false)
.messages({
    "object.unknown": "No se permiten propiedades adicionales",
    "object.missing": "Debes proporcionar al menos un campo: texto",
});
