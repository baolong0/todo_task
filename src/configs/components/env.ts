import Joi from "@hapi/joi";

const envVarsSchema = Joi.object({
  NODE_ENV: Joi.string(),
})
  .unknown()
  .required();

const { error, value: envVars } = envVarsSchema.validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

export const env: string = envVars.NODE_ENV as string;
