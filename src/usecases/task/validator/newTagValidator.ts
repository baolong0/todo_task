import Joi from "@hapi/joi";
import { ModelSchema } from "Common/modelSchema";
import ValidationErrorItem from "Errors/validationErrorItem";
import { ValidationMsgUtils } from "Utils/validationMsgUtils";
import NewTaskViewReq from "ViewModels/task/newTaskViewReq";

export interface NewTaskValidator {
  checkValid(newTaskReq: NewTaskViewReq): ValidationErrorItem[];
}

export class NewTaskValidatorImpl implements NewTaskValidator {
  private static readonly SCHEMA = Joi.object({
    tagName: ModelSchema.SCHEMA_TASK_NAME.required().messages({
      "string.base": ValidationMsgUtils.buildStringBaseMsg("Task name"),
      "string.empty": ValidationMsgUtils.buildStringEmptyMsg("Task name"),
      "string.min": ValidationMsgUtils.buildStringMinMsg("Task name"),
      "string.max": ValidationMsgUtils.buildStringMaxMsg("Task name"),
      "any.required": ValidationMsgUtils.buildAnyRequiredMsg("Task name"),
    }),
    createBy: ModelSchema.SCHEMA_ID.required().messages({
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

  public checkValid(newTaskReq: NewTaskViewReq): ValidationErrorItem[] {
    const { error } = NewTaskValidatorImpl.SCHEMA.validate(newTaskReq, { abortEarly: false });

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
