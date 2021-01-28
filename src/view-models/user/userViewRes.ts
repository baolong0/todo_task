import UserRole from "Common/userRole";

export default interface UserViewRes {
  readonly id: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly email: string;
  readonly role: UserRole;
  readonly createdAt: string;
  readonly updatedAt: string;
}
