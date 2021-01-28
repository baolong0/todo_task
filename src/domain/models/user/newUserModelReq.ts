import UserRole from "Common/userRole";

export default class NewUserModelReq {
  constructor(
    public readonly email: string,
    public readonly password: string,
    public readonly role: UserRole,
    public readonly firstName: string,
    public readonly lastName: string,
    public readonly isDeleted: boolean = false,
  ) {}
}
