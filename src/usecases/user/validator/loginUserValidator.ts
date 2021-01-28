import Joi from "@hapi/joi";
import { ModelSchema } from "Common/modelSchema";
import ValidationErrorItem from "Errors/validationErrorItem";
import { ValidationMsgUtils } from "Utils/validationMsgUtils";
import LoginUserViewReq from "ViewModels/user/loginUserViewReq";

export interface LoginUserValidator {
  checkValid(loginUserReq: LoginUserViewReq): ValidationErrorItem[];
}

export class LoginUserValidatorImpl implements LoginUserValidator {
  private static readonly SCHEMA = Joi.object({
    email: ModelSchema.SCHEMA_EMAIL.required().messages({
      "string.base": ValidationMsgUtils.buildStringBaseMsg("Email"),
      "string.empty": ValidationMsgUtils.buildStringEmptyMsg("email"),
      "string.email": ValidationMsgUtils.buildStringEmailMsg("Email"),
      "any.required": ValidationMsgUtils.buildAnyRequiredMsg("Email"),
    }),
    password: ModelSchema.SCHEMA_USER_PASS.required().messages({
      "string.base": ValidationMsgUtils.buildStringBaseMsg("Password"),
      "string.empty": ValidationMsgUtils.buildStringEmptyMsg("password"),
      "string.min": ValidationMsgUtils.buildStringMinMsg("Password"),
      "string.max": ValidationMsgUtils.buildStringMaxMsg("Password"),
      "any.required": ValidationMsgUtils.buildAnyRequiredMsg("Password"),
    }),
  })
    .unknown(false)
    .required()
    .messages({
      "object.base": ValidationMsgUtils.buildObjectBaseMsg(),
      "object.unknown": ValidationMsgUtils.buildUnknownFieldsMsg(),
      "any.required": ValidationMsgUtils.buildAnyRequiredMsg("The request"),
    });

  public checkValid(loginUserReq: LoginUserViewReq): ValidationErrorItem[] {
    const { error } = LoginUserValidatorImpl.SCHEMA.validate(loginUserReq, { abortEarly: false });

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
