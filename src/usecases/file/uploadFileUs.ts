import { FileRepo } from "Repositories/file/fileRepo";
import FileViewReq from "ViewModels/file/fileViewReq";
import FileViewRes from "ViewModels/file/fileViewRes";
export interface UploadFileUS {
  execute(uploadFileViewReq: FileViewReq, reqId: string): Promise<FileViewRes>;
}

export class UploadFileUSImpl implements UploadFileUS {
  constructor(private readonly fileRepo: FileRepo) {}

  public async execute(uploadFileViewReq: FileViewReq, reqId: string): Promise<FileViewRes> {
    const filesViewRes = await this.fileRepo.saveFiles(uploadFileViewReq, reqId);
    return filesViewRes;
  }
}
