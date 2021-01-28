import { UserRouter } from "Apps/user/userRouter";
import { UserPgGateway, UserPgGatewayImpl } from "Gateways/user/userPgGateway";
import Container from "Injection/container";
import Injector from "Injection/injectors/injector";
import { TYPES } from "Injection/types";
import { UserRepo, UserRepoImpl } from "Repositories/user/userRepo";
import { CreateUserUS, CreateUserUSImpl } from "Usecases/user/createUserUS";
import { DeleteUserUS, DeleteUserUSImpl } from "Usecases/user/deleteUserUS";
import { GetActiveUserUS, GetActiveUserUSImpl } from "Usecases/user/getActiveUserUS";
import { LoginUserImpl, LoginUserUS } from "Usecases/user/loginUserUS";
import { UpdateUserUS, UpdateUserUSImpl } from "Usecases/user/updateUserUS";
import { GetUserValidator, GetUserValidatorImpl } from "Usecases/user/validator/getUserValidator";
import { LoginUserValidator, LoginUserValidatorImpl } from "Usecases/user/validator/loginUserValidator";
import { NewUserValidator, NewUserValidatorImpl } from "Usecases/user/validator/newUserValidator";
import { UpdateUserValidator, UpdateUserValidatorImpl } from "Usecases/user/validator/updateUserValidator";
import { UserIdValidator, UserIdValidatorImpl } from "Usecases/user/validator/userIdValidator";
import { Logger } from "Utils/logger";
import { PageTokenUtils } from "Utils/pageTokenUtils";
import { PgClientProvider } from "Utils/pgClientProvider";
import { UserRoleUtils } from "Utils/userRoleUtils";

export default class UserInjector implements Injector {
  constructor(private readonly container: Container) {}

  public inject() {
    this.provideUserPgGateway();
    this.provideUserRepo();
    // Create User
    this.provideNewUserValidator();
    this.provideCreateUserUS();
    // Update User
    this.provideUpdateUserValidator();
    this.provideUserIdValidator();
    this.provideCreateUserUS();
    this.provideUpdateUserUS();
    // Login User
    this.provideLoginUserValidator();
    this.provideLoginUserUS();
    // Get User
    this.provideDeleteUserUS();
    this.provideGetUserValidator();
    this.provideGetActiveUserUS();
    this.provideUserRouter();
  }

  protected provideUserPgGateway() {
    const pgClientProvider = this.container.getNotNull<PgClientProvider>(TYPES.PgClientProvider);
    const logger = this.container.getNotNull<Logger>(TYPES.Logger);
    const userPgGateway = new UserPgGatewayImpl(pgClientProvider, logger);
    this.container.set(TYPES.UserPgGateway, userPgGateway);
  }

  protected provideUserRepo() {
    const userPgGateway = this.container.getNotNull<UserPgGateway>(TYPES.UserPgGateway);
    const userRepo = new UserRepoImpl(userPgGateway);
    this.container.set(TYPES.UserRepo, userRepo);
  }

  protected provideNewUserValidator() {
    const newUserValidator = new NewUserValidatorImpl();
    this.container.set(TYPES.NewUserValidator, newUserValidator);
  }

  protected provideUserIdValidator() {
    const userIdValidator = new UserIdValidatorImpl();
    this.container.set(TYPES.UserIdValidator, userIdValidator);
  }

  protected provideCreateUserUS() {
    const userRepo = this.container.getNotNull<UserRepo>(TYPES.UserRepo);
    const newUserValidator = this.container.getNotNull<NewUserValidator>(TYPES.NewUserValidator);
    const logger = this.container.getNotNull<Logger>(TYPES.Logger);
    const createUserUS = new CreateUserUSImpl(userRepo, newUserValidator, logger);
    this.container.set(TYPES.CreateUserUS, createUserUS);
  }
  // Login User Provide
  protected provideLoginUserValidator() {
    const loginUserValidator = new LoginUserValidatorImpl();
    this.container.set(TYPES.LoginUserValidator, loginUserValidator);
  }
  public provideLoginUserUS() {
    const userRepo = this.container.getNotNull<UserRepo>(TYPES.UserRepo);
    const loginUserValidator = this.container.getNotNull<LoginUserValidator>(TYPES.LoginUserValidator);
    const logger = this.container.getNotNull<Logger>(TYPES.Logger);
    const loginUserUS = new LoginUserImpl(userRepo, loginUserValidator, logger);
    this.container.set(TYPES.LoginUserUS, loginUserUS);
  }
  protected provideUpdateUserValidator() {
    const updateUserValidator = new UpdateUserValidatorImpl();
    this.container.set(TYPES.UpdateUserValidator, updateUserValidator);
  }
  public provideGetUserValidator() {
    const getUserValidator = new GetUserValidatorImpl();
    this.container.set(TYPES.GetUserValidator, getUserValidator);
  }

  public provideGetActiveUserUS() {
    const userRepo = this.container.getNotNull<UserRepo>(TYPES.UserRepo);
    const getUserValidator = this.container.getNotNull<GetUserValidator>(TYPES.GetUserValidator);
    const getActiveUserUS = new GetActiveUserUSImpl(userRepo, getUserValidator);
    this.container.set(TYPES.GetActiveUserUS, getActiveUserUS);
  }

  public provideUpdateUserUS() {
    const userRepo = this.container.getNotNull<UserRepo>(TYPES.UserRepo);
    const logger = this.container.getNotNull<Logger>(TYPES.Logger);
    const updateUserValidator = this.container.getNotNull<UpdateUserValidator>(TYPES.UpdateUserValidator);
    const updateUserUS = new UpdateUserUSImpl(updateUserValidator, userRepo, logger);
    this.container.set(TYPES.UpdateUserUS, updateUserUS);
  }

  public provideDeleteUserUS() {
    const userRepo = this.container.getNotNull<UserRepo>(TYPES.UserRepo);
    const userIdValidator = this.container.getNotNull<UserIdValidator>(TYPES.UserIdValidator);
    const deleteUserUS = new DeleteUserUSImpl(userIdValidator, userRepo);
    this.container.set(TYPES.DeleteUserUS, deleteUserUS);
  }

  protected provideUserRouter() {
    const createUserUS = this.container.getNotNull<CreateUserUS>(TYPES.CreateUserUS);
    const getActiveUserUS = this.container.getNotNull<GetActiveUserUS>(TYPES.GetActiveUserUS);
    const updateUserUS = this.container.getNotNull<UpdateUserUS>(TYPES.UpdateUserUS);
    const deleteUserUS = this.container.getNotNull<DeleteUserUS>(TYPES.DeleteUserUS);
    const loginUserUS = this.container.getNotNull<LoginUserUS>(TYPES.LoginUserUS);
    const pageTokenUtils = this.container.getNotNull<PageTokenUtils>(TYPES.PageTokenUtils);
    const userRoleUtils = this.container.getNotNull<UserRoleUtils>(TYPES.UserRoleUtils);
    const userRouter = new UserRouter(
      loginUserUS,
      createUserUS,
      getActiveUserUS,
      updateUserUS,
      deleteUserUS,
      pageTokenUtils,
      userRoleUtils,
    );
    this.container.set(TYPES.UserRouter, userRouter);
  }
}
