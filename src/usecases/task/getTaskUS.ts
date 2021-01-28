import { TaskRepo } from "Repositories/task/taskRepo";
import TaskViewRes from "ViewModels/task/taskViewRes";

export interface GetTaskUS {
  execute(taskId: string, reqId: string): Promise<TaskViewRes | null>;
}

export class GetTaskUSImp implements GetTaskUS {
  constructor(private readonly taskRepo: TaskRepo) {}

  public async execute(taskId: string, reqId: string): Promise<TaskViewRes | null> {
    const taskModelRes = await this.taskRepo.getDetailTask(taskId, reqId);

    return taskModelRes as TaskViewRes;
  }
}
