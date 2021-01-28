import { apiConfig } from "Configs/api";
import { PostgresConfig } from "Configs/appConfig";
import DependencyNotFoundError from "Errors/dependencyNotFoundError";
import Container from "Injection/container";
import TaskInjector from "Injection/injectors/taskInjector";
import UserInjector from "Injection/injectors/userInjector";
import { TYPES } from "Injection/types";
import { DateTimeUtilsImpl } from "Utils/dateTimeUtils";
import { Logger, PinoLogger } from "Utils/logger";
import { PageTokenUtilsImpl } from "Utils/pageTokenUtils";
import { PgClientProviderImpl } from "Utils/pgClientProvider";
import { TypeUtilsImpl } from "Utils/typeUtils";
import { UserRoleUtilsImpl } from "Utils/userRoleUtils";
import FileInjector from "Injection/injectors/fileInjector";

export default class AppContainer implements Container {
  public static getInstance(): AppContainer {
    if (!AppContainer.instance) {
      AppContainer.instance = new AppContainer();
    }

    return AppContainer.instance;
  }

  private static instance: AppContainer;
  private readonly instanceMap: Map<symbol, any>;

  constructor() {
    this.instanceMap = new Map();
  }

  public inject() {
    // Configs
    this.provideNodeEnvironment();
    this.provideServerConfig();
    this.providePostgresConfig();
    this.provideSecurityConfig();

    // Utilities
    this.provideLogger();
    this.providePgProvider();
    this.provideUserRoleUtils();
    this.provideDateTimeUtils();
    this.provideTypeUtils();
    this.providePageTokenUtils();

    // User
    const userInjector = new UserInjector(this);
    userInjector.inject();

    // Task
    const taskInjector = new TaskInjector(this);
    taskInjector.inject();
    // File
    const fileInjector = new FileInjector(this);
    fileInjector.inject();
  }

  protected provideNodeEnvironment() {
    this.set(TYPES.NodeEnv, apiConfig.env);
  }

  protected provideServerConfig() {
    this.set(TYPES.ServerConfig, apiConfig.serverConfig);
  }

  protected providePostgresConfig() {
    this.set(TYPES.PostgresConfig, apiConfig.postgresConfig);
  }

  protected provideSecurityConfig() {
    this.set(TYPES.SecurityConfig, apiConfig.securityConfig);
  }

  protected provideLogger() {
    const env = this.getNotNull<string>(TYPES.NodeEnv);
    const logger = new PinoLogger(env);
    this.set(TYPES.Logger, logger);
  }

  protected providePgProvider() {
    const pgConfig = this.getNotNull<PostgresConfig>(TYPES.PostgresConfig);
    const env = this.getNotNull<string>(TYPES.NodeEnv);
    const logger = this.getNotNull<Logger>(TYPES.Logger);
    const pgClientProvider = new PgClientProviderImpl(pgConfig, env, logger);
    this.set(TYPES.PgClientProvider, pgClientProvider);
  }

  protected provideUserRoleUtils() {
    const userRoleUtils = new UserRoleUtilsImpl();
    this.set(TYPES.UserRoleUtils, userRoleUtils);
  }

  protected provideDateTimeUtils() {
    const dateTimeUtils = new DateTimeUtilsImpl();
    this.set(TYPES.DateTimeUtils, dateTimeUtils);
  }

  protected provideTypeUtils() {
    const typeUtils = new TypeUtilsImpl();
    this.set(TYPES.TypeUtils, typeUtils);
  }

  protected providePageTokenUtils() {
    const pageTokenUtils = new PageTokenUtilsImpl();
    this.set(TYPES.PageTokenUtils, pageTokenUtils);
  }

  public set(type: symbol, instance: any): void {
    this.instanceMap.set(type, instance);
  }

  public get<T>(type: symbol): T | null {
    return this.instanceMap.get(type);
  }

  public getNotNull<T>(type: symbol): T {
    const instance = this.instanceMap.get(type);

    if (instance) {
      return instance;
    }

    throw new DependencyNotFoundError(`The dependency ${type.toString} is not found`);
  }
}
