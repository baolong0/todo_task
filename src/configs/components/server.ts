import Joi from "@hapi/joi";
import { ServerConfig } from "Configs/appConfig";

const envVarsSchema = Joi.object({
  SERVER_PORT: Joi.number().required(),
})
  .unknown()
  .required();

const { error, value: envVars } = envVarsSchema.validate(process.env);

if (error) {
  throw new Error(`Config validate error: ${error.message}`);
}

export const serverConfig: ServerConfig = {
  port: Number(envVars.SERVER_PORT as string),
};
