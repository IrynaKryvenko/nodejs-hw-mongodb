import Joi from "joi";

export const registerUserSchema = Joi.object({
    name: Joi.string().min(3).max(20).required().messages({
        'string.base': 'Username should be a string',
        'string.min': 'Username should have at least {#limit} characters',
        'string.max': 'Username should have at most {#limit} characters',
        'any.required': 'Username is required',
    }),
    email: Joi.string().email().min(3).max(50).required().messages({
        'string.base': 'Email should be a string',
        'string.email': 'Please enter a valid email address',
        'string.min': 'Email should have at least {#limit} characters',
        'string.max': 'Email should have at most {#limit} characters',
        'any.required': 'Email is required',
    }),
    password: Joi.string().min(8).max(50).required().messages({
        'string.base': 'Password should be a string',
        'string.min': 'Password should have at least {#limit} characters',
        'string.max': 'Password should have at most {#limit} characters',
        'any.required': 'Password is required',
    }),
});

export const loginUserSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
});