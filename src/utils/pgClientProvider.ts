import promise from "bluebird";
import { PostgresConfig } from "Configs/appConfig";
import pgPromise, { IDatabase, IInitOptions, IMain } from "pg-promise";
import { Logger } from "Utils/logger";

export type DbClient = IDatabase<any>;

export interface PgClientProvider {
  db(): DbClient;
}

export class PgClientProviderImpl implements PgClientProvider {
  private readonly pgClient: IDatabase<any>;

  constructor(postgresConfig: PostgresConfig, env: string, private readonly logger: Logger) {
    // pg-promise initialization options:
    const initOptions: IInitOptions<any> = {
      promiseLib: promise,
      query: (e) => {
        this.logger.info(e.query);
      },
    };

    // Initializing the library:
    const pgp: IMain = pgPromise(initOptions);

    // Creating the database instance with extensions:
    this.pgClient = pgp({
      host: postgresConfig.host,
      port: postgresConfig.port,
      database: postgresConfig.database,
      user: postgresConfig.user,
      password: postgresConfig.password,
    });
  }

  public db(): DbClient {
    return this.pgClient;
  }
}
