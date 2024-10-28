"use strict";
import Joi from "joi";

const domainEmailValidator = (value, helper) => {
  if (!value.endsWith("@gmail.cl")) {
    return helper.message(
      "El correo electrónico debe ser del dominio @gmail.cl"
    );
  }
  return value;
};

export const proveedorQueryValidation = Joi.object({
  id: Joi.number()
    .integer()
    .positive()
    .messages({
      "number.base": "El id debe ser un número.",
      "number.positive": "El id debe ser un número positivo.",
      "number.integer": "El id debe ser un número entero.",
    }),
    nombre: Joi.string()
    .min(3)
    .max(255)
    .messages({
      "string.base": "El nombre debe ser una cadena de texto.",
      "string.min": "El nombre debe tener al menos 3 caracteres.",
      "string.max": "El nombre debe tener 255 caracteres o menos.",
    }),
  
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .messages({
      "string.base": "El correo electrónico debe ser una cadena de texto.",
      "string.email": "El correo electrónico debe ser válido.",
    }),
  telefono: Joi.string()
    .min(9)
    .max(12)
    .messages({
      "string.base": "El teléfono debe ser una cadena de texto.",
      "string.min": "El teléfono debe tener al menos 9 caracteres.",
      "string.max": "El teléfono debe tener 12 caracteres o menos.",
    }),
  direccion: Joi.string()
    .min(3)
    .max(255)
    .messages({
      "string.base": "La dirección debe ser una cadena de texto.",
      "string.min": "La dirección debe tener al menos 3 caracteres.",
      "string.max": "La dirección debe tener 255 caracteres o menos.",
    }),
});

export const proveedorBodyValidation = Joi.object({
    nombre: Joi.string()
        .min(3)
        .max(255)
        .required()
        .messages({
        "string.base": "El nombre debe ser una cadena de texto.",
        "string.min": "El nombre debe tener al menos 3 caracteres.",
        "string.max": "El nombre debe tener 255 caracteres o menos.",
        "any.required": "El nombre es obligatorio.",
        }),
        email: Joi.string()
        .min(15)
        .max(35)
        .email()
        .messages({
        "string.empty": "El correo electrónico no puede estar vacío.",
        "string.base": "El correo electrónico debe ser de tipo string.",
        "string.email": "El correo electrónico debe finalizar en @gmail.cl.",
        "string.min":
        "El correo electrónico debe tener como mínimo 15 caracteres.",
        "string.max":
        "El correo electrónico debe tener como máximo 35 caracteres.",
        })
        .custom(domainEmailValidator, "Validación dominio email"),
        telefono: Joi.string()
        .min(9)
        .max(12)
        .required()
        .messages({
        "string.base": "El teléfono debe ser una cadena de texto.",
        "string.min": "El teléfono debe tener al menos 9 caracteres.",
        "string.max": "El teléfono debe tener 12 caracteres o menos.",
        "any.required": "El teléfono es obligatorio.",
        }),
    direccion: Joi.string()
        .min(3)
        .max(255)
        .required()
        .messages({
        "string.base": "La dirección debe ser una cadena de texto.",
        "string.min": "La dirección debe tener al menos 3 caracteres.",
        "string.max": "La dirección debe tener 255 caracteres o menos.",
        "any.required": "La dirección es obligatoria.",
        })
      })
        .or(
          "nombre",
          "email",
          "telefono",
          "direccion",
        )
        .unknown(false)
        .messages({
          "object.unknown": "No se permiten propiedades adicionales.",
          "object.missing":
          "Debes proporcionar al menos un campo: nombreCompleto, email, password, newPassword, rut o rol.",
        });
  


    
