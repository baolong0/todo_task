import fs from "fs";
import path from "path";
import FileModelReq from "Models/task/FileModelReq";
import FileModelRes from "Models/task/FileModelRes";
import { Logger } from "Utils/logger";

export interface TaskFileGateway {
  saveFiles(filesModelReq: FileModelReq[], reqId: string): Promise<FileModelRes[]>;
}

export class TaskFileGatewayImpl implements TaskFileGateway {
  constructor(private readonly logger: Logger) {}

  public async saveFiles(filesModelReq: FileModelReq[], reqId: string): Promise<FileModelRes[]> {
    const savePath = `${__dirname}/../media/task/attachment`;
    await this.ensureDirectoryExistence(savePath);
    const filesModelRes: FileModelRes[] = [];
    try {
      for (const fileModelReq of filesModelReq) {
        const fileName = fileModelReq.file.name;
        const filePathSrc = fileModelReq.file.path;
        const filePathDst = `${savePath}/${fileName}`;
        await fs.promises.copyFile(filePathSrc, filePathDst);
        filesModelRes.push({
          attachmentName: fileModelReq.attachmentName,
          path: filePathDst,
        });
      }
      return filesModelRes;
    } catch (error) {
      this.logger.traceE(reqId, "Error: Cannot save file!", { filesModelReq }, error);
      throw error;
    }
  }

  private async ensureDirectoryExistence(filePath: string): Promise<void> {
    const dirname = path.dirname(filePath);
    if (!fs.existsSync(dirname)) {
      fs.mkdirSync(dirname);
    }
  }
}
