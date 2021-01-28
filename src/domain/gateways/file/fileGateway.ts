import fs from "fs";
import FileModelReq from "Models/file/fileModelReq";
import FileModelRes from "Models/file/fileModelRes";
import path from "path";
import { Logger } from "Utils/logger";

export interface FileGateway {
  saveFiles(fileModelReq: FileModelReq, reqId: string): Promise<FileModelRes>;
}

export class FileGatewayImpl implements FileGateway {
  constructor(private readonly logger: Logger) {}

  public async saveFiles(fileModelReq: FileModelReq, reqId: string): Promise<FileModelRes> {
    try {
      const savePath = `${__dirname}/file`;
      await this.ensureDirectoryExistence(savePath);
      const fileUpload = fileModelReq.file;
      const fileName = fileUpload.name;
      const filePathSrc = fileUpload.path;
      const filePathDst = `${savePath}/${fileName}`;
      await fs.promises.copyFile(filePathSrc, filePathDst);
      const fileModelRes = new FileModelRes(filePathDst);
      return fileModelRes;
    } catch (error) {
      this.logger.traceE(reqId, "Error: Cannot save file!", { fileModelReq }, error);
      throw error;
    }
  }

  private async ensureDirectoryExistence(filePath: string): Promise<void> {
    if (!fs.existsSync(filePath)) {
      fs.mkdirSync(filePath);
    }
  }
}
