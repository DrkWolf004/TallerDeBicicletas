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

export const encargadoQueryValidation = Joi.object({
id_encargado: Joi.number()
.integer()
.positive()
.messages({
"number.base": "El id debe ser un número.",
"number.positive": "El id debe ser un número positivo.",
"number.integer": "El id debe ser un número entero.",
}),
rut_encargado: Joi.string()
.min(9)
.max(12)
.pattern(/^(?:(?:[1-9]\d{0}|[1-2]\d{1})(\.\d{3}){2}|[1-9]\d{6}|[1-2]\d{7}|29\.999\.999|29999999)-[\dkK]$/)
.messages({
"string.base": "El rut debe ser una cadena de texto.",
"string.min": "El rut debe tener al menos 9 caracteres.",
"string.max": "El rut debe tener 12 caracteres o menos.",
}),
email_encargado: Joi.string()
.email({ tlds: { allow: false } })
.messages({
"string.base": "El correo electrónico debe ser una cadena de texto.",
"string.email": "El correo electrónico debe ser válido.",
}),
});

export const encargadoBodyValidation = Joi.object({
nombre_completo: Joi.string()
.min(3)
.max(255)
.required()
.messages({
"string.base": "El nombre debe ser una cadena de texto.",
"string.min": "El nombre debe tener al menos 3 caracteres.",
"string.max": "El nombre debe tener 255 caracteres o menos.",
"any.required": "El nombre es obligatorio.",
}),
rut_encargado: Joi.string()
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
email_encargado: Joi.string()
.email({ tlds: { allow: false } })
.required()
.messages({
"string.base": "El correo electrónico debe ser una cadena de texto.",
"string.email": "El correo electrónico debe ser válido.",
"any.required": "El correo electrónico es obligatorio.",
}),
})
    .or(
        "id_encargado",
        "rut_encargado",
        "email_encargado"
        )
    .unknown(false)
    .messages({
        "object.unknown": "No se permiten propiedades adicionales.",
        "object.missing":
        "Debes proporcionar al menos un parámetro: id_encargado, email_encargado o rut_encargado.",
        });



