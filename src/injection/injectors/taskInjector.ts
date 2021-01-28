import { TaskRouter } from "Apps/task/taskRouter";
import { TaskFileGateway, TaskFileGatewayImpl } from "Gateways/task/taskFileGateway";
import { TaskPgGateway, TaskPgGatewayImpl } from "Gateways/task/taskPgGateway";
import Container from "Injection/container";
import Injector from "Injection/injectors/injector";
import { TYPES } from "Injection/types";
import { TaskRepo, TaskRepoImpl } from "Repositories/task/taskRepo";
import { UserRepo } from "Repositories/user/userRepo";
import { AddAttachmentsUS, AddAttachmentsUSImpl } from "Usecases/task/addAttachmentsUS";
import { CreateTaskUS, CreateTaskUSImpl } from "Usecases/task/createTaskUS";
import { DeleteAttachmentUS, DeleteAttachmentUSImpl } from "Usecases/task/deleteUserUS";
import { GetTaskUS, GetTaskUSImp } from "Usecases/task/getTaskUS";
import { GetUserTasksUS, GetUserTasksUSImp } from "Usecases/task/getUserTasksUS";
import { DeleteAttachmentValidatorImpl } from "Usecases/task/validator/deleteAttachmentValidator";
import { NewTaskValidator, NewTaskValidatorImpl } from "Usecases/task/validator/newTaskValidator";
import { Logger } from "Utils/logger";
import { PageTokenUtils } from "Utils/pageTokenUtils";
import { PgClientProvider } from "Utils/pgClientProvider";
import { UserRoleUtils } from "Utils/userRoleUtils";

export default class TaskInjector implements Injector {
  constructor(private readonly container: Container) {}

  public inject() {
    this.provideTaskPgGateway();
    this.provideTaskFileGateway();
    this.provideTaskRepo();
    this.provideGetUserTaskUS();
    this.provideGetTaskUS();
    // Create Task
    this.provideNewTaskValidator();
    this.provideCreateTaskUS();
    this.provideAddAttachmentsUS();
    this.provideDeleteAttachemntValidator();
    this.provideDeleteAttachemntUS();
    this.provideTaskRouter();
  }

  protected provideTaskPgGateway() {
    const pgClientProvider = this.container.getNotNull<PgClientProvider>(TYPES.PgClientProvider);
    const logger = this.container.getNotNull<Logger>(TYPES.Logger);
    const taskPgGateway = new TaskPgGatewayImpl(pgClientProvider, logger);
    this.container.set(TYPES.TaskPgGateway, taskPgGateway);
  }

  protected provideTaskFileGateway() {
    const logger = this.container.getNotNull<Logger>(TYPES.Logger);
    const taskFileGateway = new TaskFileGatewayImpl(logger);
    this.container.set(TYPES.TaskFileGateway, taskFileGateway);
  }

  protected provideTaskRepo() {
    const taskPgGateway = this.container.getNotNull<TaskPgGateway>(TYPES.TaskPgGateway);
    const taskFileGateway = this.container.getNotNull<TaskFileGateway>(TYPES.TaskFileGateway);
    const taskRepo = new TaskRepoImpl(taskPgGateway, taskFileGateway);
    this.container.set(TYPES.TaskRepo, taskRepo);
  }
  protected provideGetUserTaskUS() {
    const taskRepo = this.container.getNotNull<TaskRepo>(TYPES.TaskRepo);
    const userRepo = this.container.getNotNull<UserRepo>(TYPES.UserRepo);
    const getUserTaskUSImp = new GetUserTasksUSImp(taskRepo, userRepo);
    this.container.set(TYPES.GetUserTasksUS, getUserTaskUSImp);
  }

  protected provideGetTaskUS() {
    const taskRepo = this.container.getNotNull<TaskRepo>(TYPES.TaskRepo);
    const getTaskUSImpl = new GetTaskUSImp(taskRepo);
    this.container.set(TYPES.GetTaskUS, getTaskUSImpl);
  }

  protected provideAddAttachmentsUS() {
    const taskRepo = this.container.getNotNull<TaskRepo>(TYPES.TaskRepo);
    const addAttachmentsUSImpl = new AddAttachmentsUSImpl(taskRepo);
    this.container.set(TYPES.AddAttachmentsUS, addAttachmentsUSImpl);
  }
  // Create Task provide
  protected provideCreateTaskUS() {
    const userRepo = this.container.getNotNull<UserRepo>(TYPES.UserRepo);
    const taskRepo = this.container.getNotNull<TaskRepo>(TYPES.TaskRepo);
    const newTaskValidator = this.container.getNotNull<NewTaskValidator>(TYPES.NewTaskValidator);
    const logger = this.container.getNotNull<Logger>(TYPES.Logger);
    const createTaskUS = new CreateTaskUSImpl(userRepo, taskRepo, newTaskValidator, logger);
    this.container.set(TYPES.CreateTaskUS, createTaskUS);
  }

  protected provideNewTaskValidator() {
    const newtaskValidator = new NewTaskValidatorImpl();
    this.container.set(TYPES.NewTaskValidator, newtaskValidator);
  }
  protected provideDeleteAttachemntValidator() {
    const deleteAttachemntValidator = new DeleteAttachmentValidatorImpl();
    this.container.set(TYPES.DeleteAttachemntValidator, deleteAttachemntValidator);
  }
  protected provideDeleteAttachemntUS() {
    const deleteAttachemntValidator = this.container.getNotNull<DeleteAttachmentValidatorImpl>(TYPES.DeleteAttachemntValidator);
    const userRepo = this.container.getNotNull<UserRepo>(TYPES.UserRepo);
    const taskRepo = this.container.getNotNull<TaskRepo>(TYPES.TaskRepo);
    const deleteAttachmentsUS = new DeleteAttachmentUSImpl(deleteAttachemntValidator,userRepo,taskRepo)
    this.container.set(TYPES.DeleteAttachemntUS,deleteAttachmentsUS)
  }
  protected provideTaskRouter() {
    const getUserTaskUS = this.container.getNotNull<GetUserTasksUS>(TYPES.GetUserTasksUS);
    const getTaskUS = this.container.getNotNull<GetTaskUS>(TYPES.GetTaskUS);
    const addAttachmentsUS = this.container.getNotNull<AddAttachmentsUS>(TYPES.AddAttachmentsUS);
    const pageTokenUtils = this.container.getNotNull<PageTokenUtils>(TYPES.PageTokenUtils);
    const userRoleUtils = this.container.getNotNull<UserRoleUtils>(TYPES.UserRoleUtils);
    const createTaskUS = this.container.getNotNull<CreateTaskUS>(TYPES.CreateTaskUS);
    const deleteAttachmentsUS = this.container.getNotNull<DeleteAttachmentUS>(TYPES.DeleteAttachemntUS)
    const taskRouter = new TaskRouter(
      createTaskUS,
      getUserTaskUS,
      getTaskUS,
      addAttachmentsUS,
      deleteAttachmentsUS,
      pageTokenUtils,
      userRoleUtils,
    );
    this.container.set(TYPES.TaskRouter, taskRouter);
  }
}
