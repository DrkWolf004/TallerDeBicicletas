"use strict";
import Joi from "joi";

export const ProductQueryValidation = Joi.object({
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

export const ProductBodyValidation = Joi.object({
    cantidad: Joi.number()
    .integer()
    .positive()
    .messages({
      "number.base": "La cantidad debe ser un número.",
      "number.integer": "La cantidad  debe ser un número entero.",
      "number.positive": "La cantidad  debe ser un número positivo.",
    }),
})
  .or("cantidad")
  .unknown(false)
  .messages({
    "object.unknown": "No se permiten propiedades adicionales.",
    "object.missing":
      "Debes proporcionar al menos un parámetro: cantidad",
  });
