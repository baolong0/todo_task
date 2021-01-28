import Joi from "@hapi/joi";
import { SecurityConfig } from "Configs/appConfig";

const envVarsSchema = Joi.object({
  INTERNAL_API_KEY: Joi.string().min(40).max(100).required(),
})
  .unknown()
  .required();

const { error, value: envVars } = envVarsSchema.validate(process.env);

if (error) {
  throw new Error(`Config validate error: ${error.message}`);
}

export const securityConfig: SecurityConfig = {
  internalApiKey: envVars.INTERNAL_API_KEY as string,
};
