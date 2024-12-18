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

export const mecanicoQueryValidation = Joi.object({
    id: Joi.number()
        .integer()
        .positive()
        .messages({
            "number.base": "El id debe ser un número.",
            "number.positive": "El id debe ser un número positivo.",
            "number.integer": "El id debe ser un número entero.",
        }),
    rut: Joi.string()
        .min(9)
        .max(12)
        .pattern(/^(?:(?:[1-9]\d{0}|[1-2]\d{1})(\.\d{3}){2}|[1-9]\d{6}|[1-2]\d{7}|29\.999\.999|29999999)-[\dkK]$/)
        .messages({
            "string.base": "El rut debe ser una cadena de texto.",
            "string.min": "El rut debe tener al menos 9 caracteres.",
            "string.max": "El rut debe tener 12 caracteres o menos.",
        }),
    email: Joi.string()
        .email({ tlds: { allow: false } })
        .custom(domainEmailValidator)
        .messages({
            "string.base": "El correo electrónico debe ser una cadena de texto.",
            "string.email": "El correo electrónico debe ser válido.",
        }),
});

export const mecanicoBodyValidation = Joi.object({
    nombreCompleto: Joi.string()
        .min(3)
        .max(255)
        .required()
        .messages({
            "string.base": "El nombre debe ser una cadena de texto.",
            "string.min": "El nombre debe tener al menos 3 caracteres.",
            "string.max": "El nombre debe tener 255 caracteres o menos.",
            "any.required": "El nombre es obligatorio.",
        }),
    rut: Joi.string()
        .min(9)
        .max(12)
        .required()
        .pattern(/^(?:(?:[1-9]\d{0}|[1-2]\d{1})(\.\d{3}){2}|[1-9]\d{6}|[1-2]\d{7}|29\.999\.999|29999999)-[\dkK]$/)
        .messages({
            "string.base": "El rut debe ser una cadena de texto.",
            "string.min": "El rut debe tener al menos 9 caracteres.",
            "string.max": "El rut debe tener 12 caracteres o menos.",
            "any.required": "El rut es obligatorio.",
        }),
    email: Joi.string()
        .email({ tlds: { allow: false } })
        .required()
        .custom(domainEmailValidator)
        .messages({
            "string.base": "El correo electrónico debe ser una cadena de texto.",
            "string.email": "El correo electrónico debe ser válido.",
            "any.required": "El correo electrónico es obligatorio.",
        }),
    telefono: Joi.string()
        .min(8)
        .max(12)
        .required()
        .messages({
            "string.base": "El teléfono debe ser una cadena de texto.",
            "string.min": "El teléfono debe tener al menos 8 caracteres.",
            "string.max": "El teléfono debe tener 12 caracteres o menos.",
            "any.required": "El teléfono es obligatorio.",
        }),
    disponibilidad: Joi.boolean()
        .required()
        .messages({
            "boolean.base": "El valor debe ser un booleano.",
            "any.required": "La disponibilidad es obligatoria.",
        }),
    horas: Joi.number()
        .integer()
        .min(0)
        .required()
        .messages({
            "number.base": "Las horas deben ser un número.",
            "number.integer": "Las horas deben ser un número entero.",
            "number.min": "Las horas no pueden ser negativas.",
            "any.required": "Las horas son obligatorias.",
        }),
});
