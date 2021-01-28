import path from "path";
import { IQueryFileOptions, QueryFile } from "pg-promise";

export class DbUtils {
  public static loadQueryFile(file: string): SqlFile {
    const fullPath: string = path.join(`${__dirname}/sql`, file); // generating relative path;

    const options: IQueryFileOptions = {
      minify: true,
      compress: true,
    };

    const qf: QueryFile = new QueryFile(fullPath, options);

    if (qf.error) {
      throw qf.error;
    }

    return qf;
  }
}

export type SqlFile = QueryFile;
