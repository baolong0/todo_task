import Pagination from "Common/pagination";
import BadRequestError from "Errors/http/badRequestError";
import { split, toNumber } from "lodash";

export interface PageTokenUtils {
  buildNextPageToken(pageInfo: Pagination, numberOfCurrentResult: number): string | undefined;
  buildPrevPageToken(pageInfo: Pagination): string | undefined;
  buildPageToken(pageInfo: Pagination): string;
  getPageInfo(pageToken: string, limit?: number): Pagination;
}

export class PageTokenUtilsImpl implements PageTokenUtils {
  public buildNextPageToken(pageInfo: Pagination, numberOfCurrentResult: number): string | undefined {
    if (numberOfCurrentResult < pageInfo.limit) {
      return undefined;
    }

    const newPageInfo = new Pagination(pageInfo.limit, pageInfo.offset + pageInfo.limit);

    return this.buildPageToken(newPageInfo);
  }

  public buildPrevPageToken(pageInfo: Pagination): string | undefined {
    if (pageInfo.offset === 0) {
      return undefined;
    }

    const newPageOffset = pageInfo.offset < pageInfo.limit ? 0 : pageInfo.offset - pageInfo.limit;
    const newPageInfo = new Pagination(pageInfo.limit, newPageOffset);

    return this.buildPageToken(newPageInfo);
  }

  public buildPageToken(pageInfo: Pagination): string {
    return Buffer.from(`${pageInfo.limit},${pageInfo.offset}`).toString("base64");
  }

  public getPageInfo(pageToken: string, limit: number): Pagination {
    try {
      if (pageToken === undefined || pageToken === null) {
        const newLimit = limit === undefined ? 50 : toNumber(limit);
        return new Pagination(newLimit, 0);
      }

      const pageInfo = split(Buffer.from(pageToken, "base64").toString("ascii"), ",");

      return new Pagination(limit ? toNumber(limit) : toNumber(pageInfo[0]), toNumber(pageInfo[1]));
    } catch (error) {
      throw new BadRequestError(`Invalid provided pageToken: ${pageToken}`);
    }
  }
}
