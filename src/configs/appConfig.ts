export class ApiConfig {
  private environment: string;
  private serverConf: ServerConfig | undefined = undefined;
  private pgConf: PostgresConfig | undefined = undefined;
  private securityConf: SecurityConfig | undefined = undefined;

  constructor(env: string, serverConfig: ServerConfig, postgresConfig: PostgresConfig, securityConfig: SecurityConfig) {
    this.environment = env;
    this.serverConf = serverConfig;
    this.pgConf = postgresConfig;
    this.securityConf = securityConfig;
  }

  get env(): string {
    return this.environment;
  }

  get serverConfig(): ServerConfig {
    if (!this.serverConf) {
      throw new Error(`Server config wasn't set yet`);
    }

    return this.serverConf;
  }

  get postgresConfig(): PostgresConfig {
    if (!this.pgConf) {
      throw new Error(`Postgres config wasn't set yet`);
    }

    return this.pgConf;
  }

  get securityConfig(): SecurityConfig {
    if (!this.securityConf) {
      throw new Error(`Security config wasn't set yet`);
    }

    return this.securityConf;
  }
}

export interface ServerConfig {
  readonly port: number;
}

export interface PostgresConfig {
  readonly host: string;
  readonly port: number;
  readonly user: string;
  readonly password: string;
  readonly database: string;
}

export interface SecurityConfig {
  readonly internalApiKey: string;
}
