export default interface UpdateUserViewReq {
  readonly userId: string;
  readonly email: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly updatedAt: string
}
