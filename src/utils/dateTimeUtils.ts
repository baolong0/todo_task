import Constant from "Common/constant";
import dayjs from "dayjs";

export interface DateTimeUtils {
  getEpochTime(): string;
  buildDateFromAndTo(dateFrom: string, dateTo: string): [string?, string?];
  isExpired(expiredAt: string): boolean;
  buildExpiresTime(durationInSecond: number): Date;
}

export class DateTimeUtilsImpl implements DateTimeUtils {
  public getEpochTime(): string {
    return Constant.EPOCH_TIME;
  }

  public buildDateFromAndTo(dateFrom: string, dateTo: string): [string?, string?] {
    let finalDateFrom: string | undefined;
    let finalDateTo: string | undefined;
    const now = new Date().toISOString();
    const lowestTime = this.getEpochTime();

    if (dateFrom && dateTo) {
      finalDateFrom = dateFrom;
      finalDateTo = dateTo;
    } else if (dateFrom && !dateTo) {
      finalDateFrom = dateFrom;
      finalDateTo = now;
    } else if (dateTo && !dateFrom) {
      finalDateFrom = lowestTime;
      finalDateTo = dateTo;
    } else {
      finalDateFrom = undefined;
      finalDateTo = undefined;
    }

    return [finalDateFrom, finalDateTo];
  }

  public isExpired(expiredAt: string): boolean {
    const now = dayjs();
    const expiredAtComparable = dayjs(expiredAt);

    return expiredAtComparable.isBefore(now);
  }
  public buildExpiresTime(durationInSecond: number): Date {
    return dayjs().add(durationInSecond, "second").toDate();
  }
}
