import Joi from "@hapi/joi";
import { ModelSchema } from "Common/modelSchema";
import ValidationErrorItem from "Errors/validationErrorItem";
import { ValidationMsgUtils } from "Utils/validationMsgUtils";
import UpdateUserViewReq from "ViewModels/user/updateUserViewReq";

export interface UpdateUserValidator {
  checkValid(updateUserViewReq: UpdateUserViewReq): ValidationErrorItem[];
}

export class UpdateUserValidatorImpl implements UpdateUserValidator {
  private static readonly SCHEMA = Joi.object({
    userId: ModelSchema.SCHEMA_ID.required().messages({
        "string.base": ValidationMsgUtils.buildStringBaseMsg("UserID"),
        "string.empty": ValidationMsgUtils.buildStringEmptyMsg("userId"),
        "string.email": ValidationMsgUtils.buildStringEmailMsg("UserID"),
        "any.required": ValidationMsgUtils.buildAnyRequiredMsg("UserID"),
    }),
    password: ModelSchema.SCHEMA_USER_PASS.required().messages({
      "string.base": ValidationMsgUtils.buildStringBaseMsg("Password"),
      "string.empty": ValidationMsgUtils.buildStringEmptyMsg("password"),
      "string.min": ValidationMsgUtils.buildStringMinMsg("Password"),
      "string.max": ValidationMsgUtils.buildStringMaxMsg("Password"),
      "any.required": ValidationMsgUtils.buildAnyRequiredMsg("Password"),
    }),
    firstName: ModelSchema.SCHEMA_FIRST_NAME.required().messages({
      "string.base": ValidationMsgUtils.buildStringBaseMsg("First name"),
      "string.empty": ValidationMsgUtils.buildStringEmptyMsg("first name"),
      "string.min": ValidationMsgUtils.buildStringMinMsg("First name"),
      "string.max": ValidationMsgUtils.buildStringMaxMsg("First name"),
      "any.required": ValidationMsgUtils.buildAnyRequiredMsg("First name"),
    }),
    lastName: ModelSchema.SCHEMA_LAST_NAME.required().messages({
      "string.base": ValidationMsgUtils.buildStringBaseMsg("Last name"),
      "string.empty": ValidationMsgUtils.buildStringEmptyMsg("last name"),
      "string.min": ValidationMsgUtils.buildStringMinMsg("Last name"),
      "string.max": ValidationMsgUtils.buildStringMaxMsg("Last name"),
      "any.required": ValidationMsgUtils.buildAnyRequiredMsg("Last name"),
    }),
  })
    .unknown(false)
    .required()
    .messages({
      "object.base": ValidationMsgUtils.buildObjectBaseMsg(),
      "object.unknown": ValidationMsgUtils.buildUnknownFieldsMsg(),
      "any.required": ValidationMsgUtils.buildAnyRequiredMsg("The request"),
    });

  public checkValid(updateUserReq: UpdateUserViewReq): ValidationErrorItem[] {
    const { error } = UpdateUserValidatorImpl.SCHEMA.validate(updateUserReq, { abortEarly: false });

    if (!error) {
      return [];
    }

    const errorItems = error.details;

    return errorItems.map((i) => ({
      type: i.type,
      path: i.path,
      message: i.message,
    }));
  }
}
