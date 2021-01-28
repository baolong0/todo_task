import { FileGateway } from "Gateways/file/fileGateway";
import FileModelReq from "Models/file/fileModelReq";
import FileModelRes from "Models/file/fileModelRes";

export interface FileRepo {
  saveFiles(fileModelReq: FileModelReq, reqId: string): Promise<FileModelRes>;
}

export class FileRepoImpl implements FileRepo {
  constructor(private readonly fileGateway: FileGateway) {}

  public async saveFiles(fileModelReq: FileModelReq, reqId: string): Promise<FileModelRes> {
    return await this.fileGateway.saveFiles(fileModelReq, reqId);
  }
}
