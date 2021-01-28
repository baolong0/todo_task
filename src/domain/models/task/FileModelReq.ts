import { File } from "formidable";

export default interface FileModelReq {
  readonly attachmentName: string;
  readonly file: File;
}
