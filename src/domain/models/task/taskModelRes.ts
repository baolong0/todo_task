import TagModelRes from "Models/task/tagModelRes";
import AttachmentModelRes from "Models/task/attachmentModelRes";
import ActivityModelRes from "Models/task/activityModelRes";
import TaskStatus from "Common/taskStatus";

export default interface TaskModelRes {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly dueTime: string;
  readonly status: TaskStatus;
  readonly tagsList: TagModelRes[];
  readonly activitiesList: ActivityModelRes[];
  readonly attachmentsList: AttachmentModelRes[];
}