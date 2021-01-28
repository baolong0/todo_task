import Joi from "@hapi/joi";
import { PostgresConfig } from "Configs/appConfig";

const envVarsSchema = Joi.object({
  PSQL_HOST: Joi.string().required(),
  PSQL_PORT: Joi.number().required(),
  PSQL_USER: Joi.string().required(),
  PSQL_PASSWORD: Joi.string().required(),
  PSQL_DATABASE: Joi.string().required(),
})
  .unknown()
  .required();

const { error, value: envVars } = envVarsSchema.validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

export const postgresConfig: PostgresConfig = {
  host: envVars.PSQL_HOST as string,
  port: Number(envVars.PSQL_PORT as string),
  user: envVars.PSQL_USER as string,
  password: envVars.PSQL_PASSWORD as string,
  database: envVars.PSQL_DATABASE as string,
};
