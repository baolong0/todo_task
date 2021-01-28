import TagModelRes from "Models/task/tagModelRes";
import TaskStatus from "Common/taskStatus";

export default interface TasksListModelRes {
  readonly id: string;
  readonly name: string;
  readonly dueTime: string;
  readonly status: TaskStatus;
  readonly tagsList: TagModelRes[];
}