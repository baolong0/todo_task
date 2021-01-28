export default class UpdateUserModelReq {
  constructor(
    public readonly userId: string,
    public readonly firstName: string,
    public readonly lastName: string,
    public readonly password: string,
  ) {}
}
