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
    taskName: ModelSchema.SCHEMA_TASK_NAME.required().messages({
      "string.base": ValidationMsgUtils.buildStringBaseMsg("Task name"),
      "string.empty": ValidationMsgUtils.buildStringEmptyMsg("Task name"),
      "string.min": ValidationMsgUtils.buildStringMinMsg("Task name"),
      "string.max": ValidationMsgUtils.buildStringMaxMsg("Task name"),
      "any.required": ValidationMsgUtils.buildAnyRequiredMsg("Task name"),
    }),
    description: ModelSchema.SCHEMA_TASK_DESCRIPTION.required().messages({
      "string.base": ValidationMsgUtils.buildStringBaseMsg("Description"),
      "string.empty": ValidationMsgUtils.buildStringEmptyMsg("Description"),
      "string.min": ValidationMsgUtils.buildStringMinMsg("Description"),
      "string.max": ValidationMsgUtils.buildStringMaxMsg("Description"),
      "any.required": ValidationMsgUtils.buildAnyRequiredMsg("Description"),
    }),
    dueTime: ModelSchema.SCHEMA_TASK_DUE_TIME.required().messages({
      "string.base": ValidationMsgUtils.buildStringBaseMsg("Due Time"),
      "string.empty": ValidationMsgUtils.buildStringEmptyMsg("Due Time"),
      "any.required": ValidationMsgUtils.buildAnyRequiredMsg("Due Time"),
    }),
    createBy: ModelSchema.SCHEMA_ID.required().messages({
      "string.base": ValidationMsgUtils.buildStringBaseMsg("UserID"),
      "string.empty": ValidationMsgUtils.buildStringEmptyMsg("userId"),
      "string.email": ValidationMsgUtils.buildStringEmailMsg("UserID"),
      "any.required": ValidationMsgUtils.buildAnyRequiredMsg("UserID"),
    }),
    tags: ModelSchema.SCHEMA_TASK_TAG_NAME_ARR.messages({
      "string.base": ValidationMsgUtils.buildStringBaseMsg("Tag name"),
      "string.empty": ValidationMsgUtils.buildStringEmptyMsg("Tag name"),
      "string.min": ValidationMsgUtils.buildStringMinMsg("Tag name"),
      "string.max": ValidationMsgUtils.buildStringMaxMsg("Tag name"),
      "any.required": ValidationMsgUtils.buildAnyRequiredMsg("Tag name"),
    }),
    attachments: ModelSchema.SCHEMA_TASK_ATTACHMENTS.items({
      name: ModelSchema.SCHEMA_TASK_ATTACHMENTS_NAME.required().messages({
        "string.base": ValidationMsgUtils.buildStringBaseMsg("Attachments name"),
        "string.empty": ValidationMsgUtils.buildStringEmptyMsg("Attachments name"),
        "string.min": ValidationMsgUtils.buildStringMinMsg("Attachments name"),
        "string.max": ValidationMsgUtils.buildStringMaxMsg("Attachments name"),
        "any.required": ValidationMsgUtils.buildAnyRequiredMsg("Attachments name"),
      }),
      path: ModelSchema.SCHEMA_TASK_ATTACHMENTS_PATH.required().messages({
        "string.base": ValidationMsgUtils.buildStringBaseMsg("Attachments path"),
        "string.empty": ValidationMsgUtils.buildStringEmptyMsg("Attachments path"),
      }),
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
