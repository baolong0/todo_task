import TaskStatus from "Common/taskStatus";

export default interface TaskModelRes {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly dueTime: string;
  readonly status: TaskStatus;
  readonly createBy: string;
}
