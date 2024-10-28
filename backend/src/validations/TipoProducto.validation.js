"use strict";
import Joi from "joi";

export const TipoQueryValidation = Joi.object({
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

export const TipoBodyValidation = Joi.object({
  tipo: Joi.string()
    .min(4)
    .max(12)
    .pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)
    .messages({
      "string.empty": "El tipo de product no puede estar vacío.",
      "string.base": "El tipo de product debe ser de tipo string.",
      "string.min":
        "El tipo de product debe tener como mínimo 15 caracteres.",
      "string.max":
        "El tipo de product debe tener como máximo 35 caracteres.",
    })

})
  .or(
    "tipo"
  )
  .unknown(false)
  .messages({
    "object.unknown": "No se permiten propiedades adicionales.",
    "object.missing":
      "Debes proporcionar al menos un campo: tipo.",
  });
