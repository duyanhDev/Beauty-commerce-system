import Joi, * as joi from 'joi';

export const validationSchema = joi.object({
  PORT: Joi.number().required(),
  DB_PORT: Joi.number().required(),
  MYSQL_PUBLIC_URL: Joi.string().required(),
});
