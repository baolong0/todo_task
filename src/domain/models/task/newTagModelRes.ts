export default interface NewTagModelReq {
  readonly id: string;
  readonly name: string;
  readonly createBy: string;
  readonly isDeleted: boolean;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly deletedAt?: string;
}
