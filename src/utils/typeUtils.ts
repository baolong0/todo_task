import { toNumber } from "lodash";

export interface TypeUtils {
  toBoolean(booleanStr: string | boolean | undefined): boolean | undefined;
  toNumber(integerStr: string): number;
}

export class TypeUtilsImpl implements TypeUtils {
  public toBoolean(booleanStr: string | boolean | undefined): boolean | undefined {
    if (booleanStr === undefined) {
      return undefined;
    }

    if (typeof booleanStr === "boolean") {
      return booleanStr;
    }

    if (booleanStr === "true") {
      return true;
    }

    if (booleanStr === "false") {
      return false;
    }

    throw new Error(`Cannot convert to boolean: ${booleanStr}, type: ${typeof booleanStr}`);
  }

  public toNumber(integerStr: string): number {
    return toNumber(integerStr);
  }
}
