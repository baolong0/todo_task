export default class Constant {
  public static readonly EPOCH_TIME = "1970-01-01T00:00:00.000Z";
  public static readonly POGIS_SRID_WGS84 = 4326;

  public static readonly SQL_SORTBY_DESC = "DESC";
  public static readonly SQL_SORTBY_ASC = "ASC";

  public static readonly LENGTH_REQUEST_ID = 20;
  public static readonly LENGTH_INVITATION_CODE = 10;

  // 2 days (2 x 24 hrs x 60 mins x 60 seconds x 1000 milliseconds)
  public static readonly INVITATION_EXPIRATION_DURATION_IN_MILLIS = 2 * 24 * 60 * 60 * 1000;

  // 10 mins (30 mins x 60 seconds)
  public static readonly PRESIGN_POST_URL_DURATION_IN_MILLIS = 10 * 60;

  // 100kb
  public static readonly MIN_LICENSE_PLATE_PHOTO_SIZE = 100 * 1024;
  // 30Mb
  public static readonly MAX_LICENSE_PLATE_PHOTO_SIZE = 30 * 1024 * 1024;

  // If a customer's coordination within this radius compare to the store coordination
  // then that customer is valid to be received the e-ticket
  public static readonly RADIUS_IN_METER_TO_RELEASE_TICKET = 50;
}
