export default interface NewtaskViewReq {
  readonly taskName: string;
  readonly description: string;
  readonly dueTime: string;
  readonly createBy: string;
  readonly tags: string[];
  readonly attachments: string[];
}
