export default class StringUtils {
  private static readonly ALLOWED_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  public static genRandomAlphabetStr(length: number): string {
    return [...Array(length)].reduce(
      (a) => a + StringUtils.ALLOWED_CHARS[~~(Math.random() * StringUtils.ALLOWED_CHARS.length)],
      "",
    );
  }
}
