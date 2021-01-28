import UserRole from "Common/userRole";

export default interface UserClaims {
  readonly userId: string;
  readonly role: UserRole;
}
