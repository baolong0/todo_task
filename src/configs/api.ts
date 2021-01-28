import { ApiConfig } from "Configs/appConfig";
import { env } from "Configs/components/env";
import { postgresConfig } from "Configs/components/postgres";
import { securityConfig } from "Configs/components/security";
import { serverConfig } from "Configs/components/server";

export const apiConfig: ApiConfig = new ApiConfig(env, serverConfig, postgresConfig, securityConfig);
