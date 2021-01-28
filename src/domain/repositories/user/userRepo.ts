import { UserPgGateway } from "Gateways/user/userPgGateway";
import NewUserModelReq from "Models/user/newUserModelReq";
import UpdateUserModelReq from "Models/user/updateUserModelReq";
import LoginUserModelReq from "Models/user/loginUserModelReq";
import UserModelRes from "Models/user/userModelRes";

export interface UserRepo {
  createUser(newUserReq: NewUserModelReq, reqId: string): Promise<string>;
  updateUser(updateUserReq: UpdateUserModelReq, reqId: string): Promise<boolean>;
  loginUser(loginUserReq: LoginUserModelReq, reqId: string): Promise<UserModelRes | null>;
  deleteUser(userId: string, reqId: string): Promise<boolean>;
  getUserById(userId: string, reqId: string): Promise<UserModelRes | null>;
  getActiveUserById(userId: string, reqId: string): Promise<UserModelRes | null>;
  getInactiveUserById(userId: string, reqId: string): Promise<UserModelRes | null>;
}

export class UserRepoImpl implements UserRepo {
  constructor(private readonly userPgGateway: UserPgGateway) {}

  public async createUser(newUserReq: NewUserModelReq, reqId: string): Promise<string> {
    return await this.userPgGateway.createUser(newUserReq, reqId);
  }
  public async updateUser(updateUserReq: UpdateUserModelReq, reqId: string): Promise<boolean> {
    return await this.userPgGateway.updateUser(updateUserReq, reqId);
  }
  public async loginUser(loginUserReq: LoginUserModelReq, reqId: string): Promise<UserModelRes | null> {
    return await this.userPgGateway.loginUser(loginUserReq, reqId);
  }

  public async deleteUser(userId: string, reqId: string): Promise<boolean> {
    return await this.userPgGateway.deleteUser(userId, reqId);
  }

  public async getUserById(userId: string, reqId: string): Promise<UserModelRes | null> {
    return this.userPgGateway.getUserById(userId, reqId);
  }

  public async getActiveUserById(userId: string, reqId: string): Promise<UserModelRes | null> {
    const user = await this.userPgGateway.getUserById(userId, reqId);
    return user && !user.isDeleted ? user : null;
  }

  public async getInactiveUserById(userId: string, reqId: string): Promise<UserModelRes | null> {
    const user = await this.userPgGateway.getUserById(userId, reqId);
    return user && user.isDeleted ? user : null;
  }
}
