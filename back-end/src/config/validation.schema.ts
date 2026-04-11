import Joi, * as joi from 'joi';

export const validationSchema = joi.object({
  PORT: Joi.number().required(),
  DB_PORT: Joi.number().required(),
  DB_HOST: Joi.string().required(),
  DB_USERNAME: Joi.string().required(),
  DB_PASSWORD: Joi.string().allow('').optional(),
  DB_NAME: Joi.string().required(),
  CLOUDINARY_NAME: Joi.string().required(),
  CLOUDINARY_API_KEY: Joi.number().required(),
  CLOUDINARY_API_SECRET: Joi.string().required(),
});
