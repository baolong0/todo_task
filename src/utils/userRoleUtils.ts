import UserRole from "Common/userRole";

export interface UserRoleUtils {
  parseUserRole(userRole: string): UserRole;
}

export class UserRoleUtilsImpl implements UserRoleUtils {
  public parseUserRole(userRoleStr: string): UserRole {
    switch (userRoleStr) {
      case UserRole.ADMIN: {
        return UserRole.ADMIN;
      }
      case UserRole.USER: {
        return UserRole.USER;
      }
      case UserRole.ANONYMOUS: {
        return UserRole.ANONYMOUS;
      }
      default: {
        return UserRole.ANONYMOUS;
      }
    }
  }
}
