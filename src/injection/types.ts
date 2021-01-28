import { symbol } from "@hapi/joi";

const TYPES = {
  // Config
  PostgresConfig: Symbol.for("PostgresConfig"),
  ServerConfig: Symbol.for("ServerConfig"),
  NodeEnv: Symbol.for("NodeEnv"),
  SecurityConfig: Symbol.for("SecurityConfig"),

  // Utilities
  Logger: Symbol.for("Logger"),
  PgClientProvider: Symbol.for("PgClientProvider"),
  UserRoleUtils: Symbol.for("UserRoleUtils"),
  DateTimeUtils: Symbol.for("DateTimeUtils"),
  TypeUtils: Symbol.for("TypeUtils"),
  PageTokenUtils: Symbol.for("PageTokenUtils"),

  // User
  UserPgGateway: Symbol.for("UserPgGateway"),
  UserRepo: Symbol.for("UserRepo"),
  NewUserValidator: Symbol.for("NewUserValidator"),
  UpdateUserValidator: Symbol.for("UpdateUserValidator"),
  UserIdValidator: Symbol.for("UserIdValidator"),
  CreateUserUS: Symbol.for("CreateUserUS"),
  UpdateUserUS: Symbol.for("UpdateUserUS"),
  DeleteUserUS: Symbol.for("DeleteUserUS"),
  GetUserValidator: Symbol.for("GetUserValidator"),
  LoginUserValidator: Symbol.for("LoginUserValidator"),
  LoginUserUS: Symbol.for("LoginUserUS"),
  GetActiveUserUS: Symbol.for("GetActiveUserUS"),
  UserRouter: Symbol.for("UserRouter"),

  // Task
  TaskPgGateway: Symbol.for("TaskPgGateway"),
  TaskFileGateway: Symbol.for("TaskFileGateway"),
  TaskRepo: Symbol.for("TaskRepo"),
  GetUserTasksUS: Symbol.for("GetUserTasksUS"),
  GetTaskUS: Symbol.for("GetTaskUS"),
  AddAttachmentsUS: Symbol.for("AddAttachmentsUS"),
  TaskRouter: Symbol.for("TaskRouter"),
  CreateTaskUS: Symbol.for("CreateTaskUS"),
  NewTaskValidator: Symbol.for("NewTaskValidator"),
  // File
  UPloadFileUS: Symbol.for("UPloadFileUS"),
  FileGateway: Symbol.for("FileGateway"),
  FileRepo: Symbol.for("FileRepo"),
  UploadFileUSImpl: Symbol.for("UploadFileUSImpl"),
  FileRouter: Symbol.for("FileRouter"),
  DeleteAttachemntValidator: Symbol.for("DeleteAttachemntValidator"),
  DeleteAttachemntUS: Symbol.for("DeleteAttachemntUS"),
};

export { TYPES };
