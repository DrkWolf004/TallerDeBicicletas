"use strict";
import Joi from "joi";

export const AvisoQueryValidation = Joi.object({
    id: Joi.number()
      .integer()
      .positive()
      .messages({
        "number.base": "El id debe ser un número.",
        "number.integer": "El id debe ser un número entero.",
        "number.positive": "El id debe ser un número positivo.",
      }),
  })
    .or("id")
    .unknown(false)
    .messages({
      "object.unknown": "No se permiten propiedades adicionales.",
      "object.missing":
        "Debes proporcionar al menos un parámetro: id",
    });

export const TextoBodyValidation = Joi.object({
    texto: Joi.string()
    .min(4)
    .max(40)
    .pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)
    .messages({
      "string.empty": "El texto de product no puede estar vacío.",
      "string.base": "El texto de product debe ser un string.",
      "string.min":
        "El texto de product debe tener como mínimo 4 caracteres.",
      "string.max":
        "El texto de product debe tener como máximo 12 caracteres.",
    })
})   

.or(
    "texto"
)
.unknown(false)
.messages({
    "object.unknown": "No se permiten propiedades adicionales.",
    "object.missing":
      "Debes proporcionar al menos un campo: Texto.",
});