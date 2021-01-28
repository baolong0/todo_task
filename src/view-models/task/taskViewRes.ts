import TagViewRes from "ViewModels/task/tagViewRes";
import AttachmentViewRes from "ViewModels/task/attachmentViewRes";
import ActivityViewRes from "ViewModels/task/activityViewRes";
import TaskStatus from "Common/taskStatus";

export default interface TaskModelRes {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly dueTime: string;
  readonly status: TaskStatus;
  readonly tagsList: TagViewRes[];
  readonly activitiesList: ActivityViewRes[];
  readonly attachmentsList: AttachmentViewRes[];
}
