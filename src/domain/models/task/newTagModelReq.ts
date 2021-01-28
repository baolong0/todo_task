export default class NewTagModelReq {
  constructor(
    public readonly name: string,
    public readonly createBy: string,
    public readonly isDeleted: boolean = false,
  ) {}
}
