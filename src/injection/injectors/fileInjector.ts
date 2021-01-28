import { FileRouter } from "Apps/file/fileRouter";
import { FileGateway, FileGatewayImpl } from "Gateways/file/fileGateway";
import Container from "Injection/container";
import Injector from "Injection/injectors/injector";
import { TYPES } from "Injection/types";
import { FileRepo, FileRepoImpl } from "Repositories/file/fileRepo";
import { UploadFileUS, UploadFileUSImpl } from "Usecases/file/uploadFileUs";
import { Logger } from "Utils/logger";
import { PageTokenUtils } from "Utils/pageTokenUtils";
import { UserRoleUtils } from "Utils/userRoleUtils";

export default class FileInjector implements Injector {
  constructor(private readonly container: Container) {}

  public inject() {
    this.provideFileGateway();
    this.provideFileRepo();
    this.provideUploadFileUS();
    this.provideFileRouter();
  }

  protected provideFileGateway() {
    const logger = this.container.getNotNull<Logger>(TYPES.Logger);
    const fileGateway = new FileGatewayImpl(logger);
    this.container.set(TYPES.FileGateway, fileGateway);
  }

  protected provideFileRepo() {
    const fileGateway = this.container.getNotNull<FileGateway>(TYPES.FileGateway);
    const fileRepo = new FileRepoImpl(fileGateway);
    this.container.set(TYPES.FileRepo, fileRepo);
  }
  protected provideUploadFileUS() {
    const fileRepo = this.container.getNotNull<FileRepo>(TYPES.FileRepo);
    const uploadFileUSImpl = new UploadFileUSImpl(fileRepo);
    this.container.set(TYPES.UploadFileUSImpl, uploadFileUSImpl);
  }
  protected provideFileRouter() {
    const uploadFileUS = this.container.getNotNull<UploadFileUSImpl>(TYPES.UploadFileUSImpl);
    const pageTokenUtils = this.container.getNotNull<PageTokenUtils>(TYPES.PageTokenUtils);
    const userRoleUtils = this.container.getNotNull<UserRoleUtils>(TYPES.UserRoleUtils);
    const fileRouter = new FileRouter(uploadFileUS, pageTokenUtils, userRoleUtils);
    this.container.set(TYPES.FileRouter, fileRouter);
  }
}
