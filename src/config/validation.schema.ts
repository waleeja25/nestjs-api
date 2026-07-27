import * as joi from 'joi';

export default joi.object({
  PORT: joi.number().default(3000),
  DB_HOST: joi.string().required(),
  DB_PORT: joi.number().required(),
  DB_USERNAME: joi.string().required(),
  DB_PASSWORD: joi.string().allow('').required(),
  DB_DATABASE: joi.string().required(),
});
