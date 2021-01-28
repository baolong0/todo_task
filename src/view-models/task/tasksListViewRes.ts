import TagViewRes from "ViewModels/task/tagViewRes";
import TaskStatus from "Common/taskStatus";

export default interface TasksListViewRes {
  readonly id: string;
  readonly name: string;
  readonly dueTime: string;
  readonly status: TaskStatus;
  readonly tagsList: TagViewRes[];
}
