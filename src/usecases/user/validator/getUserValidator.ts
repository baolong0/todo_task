import Joi from "@hapi/joi";
import { ModelSchema } from "Common/modelSchema";
import ValidationErrorItem from "Errors/validationErrorItem";
import { ValidationMsgUtils } from "Utils/validationMsgUtils";
import GetUserViewReq from "ViewModels/user/getUserViewReq";

export interface GetUserValidator {
  checkValid(getUserReq: GetUserViewReq): ValidationErrorItem[];
}

export class GetUserValidatorImpl implements GetUserValidator {
  private static readonly SCHEMA = Joi.object({
    userId: ModelSchema.SCHEMA_ID.required().messages({
      "string.base": ValidationMsgUtils.buildStringBaseMsg("UserID"),
      "string.empty": ValidationMsgUtils.buildStringEmptyMsg("userId"),
      "string.email": ValidationMsgUtils.buildStringEmailMsg("UserID"),
      "any.required": ValidationMsgUtils.buildAnyRequiredMsg("UserID"),
    }),
  })
    .unknown(false)
    .required()
    .messages({
      "object.base": ValidationMsgUtils.buildObjectBaseMsg(),
      "object.unknown": ValidationMsgUtils.buildUnknownFieldsMsg(),
      "any.required": ValidationMsgUtils.buildAnyRequiredMsg("The request"),
    });

  public checkValid(getUserReq: GetUserViewReq): ValidationErrorItem[] {
    const { error } = GetUserValidatorImpl.SCHEMA.validate(getUserReq, { abortEarly: false });

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
