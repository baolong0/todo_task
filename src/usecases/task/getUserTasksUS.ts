import UserNotFoundExistError from "Errors/user/userNotFoundError";
import { TaskRepo } from "Repositories/task/taskRepo";
import { UserRepo } from "Repositories/user/userRepo";
import TasksListViewRes from "ViewModels/task/tasksListViewRes";

export interface GetUserTasksUS {
  execute(userId: string, reqId: string): Promise<TasksListViewRes[]>;
}

export class GetUserTasksUSImp implements GetUserTasksUS {
  constructor(private readonly taskRepo: TaskRepo, private readonly userRepo: UserRepo) {}

  public async execute(userId: string, reqId: string): Promise<TasksListViewRes[]> {
    const user = await this.userRepo.getActiveUserById(userId, reqId);
    if (!user) {
      throw new UserNotFoundExistError();
    }

    const tasksModelRes = await this.taskRepo.getTasksByUserId(userId, reqId);

    return <TasksListViewRes[]>tasksModelRes;
  }
}
