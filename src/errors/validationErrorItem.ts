export default interface ValidationErrorItem {
  readonly message: string;
  readonly path: (string | number)[];
  readonly type: string;
}
