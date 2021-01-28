import DatabaseErrorCode from "Common/databaseErrorCode";
import EmailAlreadyExistError from "Errors/user/emailAlreadyExistsError";
import LoginUserModelReq from "Models/user/loginUserModelReq";
import NewUserModelReq from "Models/user/newUserModelReq";
import UpdateUserModelReq from "Models/user/updateUserModelReq";
import UserModelRes from "Models/user/userModelRes";
import * as sql from "Sql/user";
import { Logger } from "Utils/logger";
import { DbClient, PgClientProvider } from "Utils/pgClientProvider";

export interface UserPgGateway {
  createUser(newUserReq: NewUserModelReq, reqId: string): Promise<string>;
  loginUser(loginUserReq: LoginUserModelReq, reqId: string): Promise<UserModelRes | null>;
  getUserById(userId: string, requestId: string): Promise<UserModelRes | null>;
  updateUser(updateUserReq: UpdateUserModelReq, reqId: string): Promise<boolean>;
  deleteUser(userId: string, reqId: string): Promise<boolean>;
}

export class UserPgGatewayImpl implements UserPgGateway {
  private readonly dbClient: DbClient;

  constructor(pgClientProvider: PgClientProvider, private readonly logger: Logger) {
    this.dbClient = pgClientProvider.db();
  }

  public async createUser(newUserReq: NewUserModelReq, reqId: string): Promise<string> {
    try {
      const result = await this.dbClient.one(sql.create_user, {
        firstName: newUserReq.firstName,
        lastName: newUserReq.lastName,
        email: newUserReq.email,
        password: newUserReq.password,
        role: newUserReq.role,
        isDeleted: newUserReq.isDeleted,
      });

      return result.id;
    } catch (error) {
      if (error && error.code === DatabaseErrorCode.UNIQUE_VIOLATION) {
        throw new EmailAlreadyExistError();
      }

      this.logger.traceE(reqId, "Creating user in db error", { req: newUserReq }, error);
      throw error;
    }
  }

  public async getUserById(userId: string, reqId: string): Promise<UserModelRes | null> {
    try {
      return this.dbClient.oneOrNone(sql.get_user_by_id, {
        userId,
      });
    } catch (error) {
      this.logger.traceE(reqId, "Get user by id in db error", { req: { userId } }, error);
      throw error;
    }
  }
  public async loginUser(loginUserReq: LoginUserModelReq, reqId: string): Promise<UserModelRes | null> {
    try {
      const result = await this.dbClient.oneOrNone(sql.login_user_check, {
        email: loginUserReq.email,
      });
      return result;
    } catch (error) {
      this.logger.traceE(reqId, "Login user in db error", { req: loginUserReq }, error);
      throw error;
    }
  }

  public async updateUser(updateUserReq: UpdateUserModelReq, reqId: string): Promise<boolean> {
    try {
      const userId = await this.dbClient.one(sql.update_user, {
        userId: updateUserReq.userId,
        firstName: updateUserReq.firstName,
        lastName: updateUserReq.lastName,
        password: updateUserReq.password,
      });

      return userId !== null;
    } catch (error) {
      this.logger.traceE(reqId, "Update user in db error", { req: updateUserReq }, error);
      throw error;
    }
  }

  public async deleteUser(userId: string, reqId: string): Promise<boolean> {
    try {
      return await this.dbClient.one(sql.remove_user, {
        userId,
      });
    } catch (error) {
      this.logger.traceE(reqId, "Remove user in db error", { userId }, error);
      throw error;
    }
  }
}
