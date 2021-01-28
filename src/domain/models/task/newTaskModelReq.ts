import TaskStatus from "Common/taskStatus";

export default class NewTaskModelReq {
  constructor(
    public readonly name: string,
    public readonly description: string,
    public readonly dueTime: string,
    public readonly tags: string[],
    public readonly attachments: any[],
    public readonly createBy: string,
    public readonly status: TaskStatus,
    public readonly isDeleted: boolean = false,
  ) {}
}
