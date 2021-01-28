import UserRole from "Common/userRole";

export default interface UserModelRes {
  readonly id: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly email: string;
  readonly password: string;
  readonly role: UserRole;
  readonly isDeleted: boolean;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly deletedAt?: string;
}
