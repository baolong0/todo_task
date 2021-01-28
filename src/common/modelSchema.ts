import Joi from "@hapi/joi";

export class ModelSchema {
  public static readonly SCHEMA_ID = Joi.string().uuid();
  public static readonly SCHEMA_DATE = Joi.date();
  public static readonly SCHEMA_DATE_ISO = Joi.date().iso();
  public static readonly SCHEMA_BOOLEAN = Joi.boolean();
  public static readonly SCHEMA_KEYWORD = Joi.string().min(3).max(20);

  public static readonly SCHEMA_EMAIL = Joi.string().email().max(100);

  public static readonly SCHEMA_FIRST_NAME = Joi.string().min(1).max(30);
  public static readonly SCHEMA_LAST_NAME = Joi.string().min(1).max(30);
  public static readonly SCHEMA_USER_PASS = Joi.string().min(8).max(50);
  // TASK SCHEMA
  public static readonly SCHEMA_TASK_NAME = Joi.string().min(1).max(100);
  public static readonly SCHEMA_TASK_DESCRIPTION = Joi.string().min(1).max(1000);
  public static readonly SCHEMA_TASK_TAG_NAME_ARR = Joi.array().min(0).max(50).items(Joi.string().min(1).max(50));
  public static readonly SCHEMA_TASK_DUE_TIME = Joi.date().greater("now");
  public static readonly SCHEMA_TASK_ATTACHMENTS= Joi.array().min(0).max(50);
  public static readonly SCHEMA_TASK_ATTACHMENTS_NAME = Joi.string().min(1).max(100);
  public static readonly SCHEMA_TASK_ATTACHMENTS_PATH = Joi.string();
}
