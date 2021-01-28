import Joi from "@hapi/joi";
import { ModelSchema } from "Common/modelSchema";
import ValidationErrorItem from "Errors/validationErrorItem";
import { ValidationMsgUtils } from "Utils/validationMsgUtils";

export interface DeleteAttachmentValidator {
  checkValid(userId: string, taskId: string, attachmentId: string): ValidationErrorItem[];
}

export class DeleteAttachmentValidatorImpl implements DeleteAttachmentValidator {
  private static readonly SCHEMA = Joi.object({
    userId: ModelSchema.SCHEMA_ID.required().messages({
      "string.base": ValidationMsgUtils.buildStringBaseMsg("UserID"),
      "string.empty": ValidationMsgUtils.buildStringEmptyMsg("userId"),
      "any.required": ValidationMsgUtils.buildAnyRequiredMsg("UserID"),
    }),
    taskId: ModelSchema.SCHEMA_ID.required().messages({
      "string.base": ValidationMsgUtils.buildStringBaseMsg("TaskId"),
      "string.empty": ValidationMsgUtils.buildStringEmptyMsg("TaskId"),
      "any.required": ValidationMsgUtils.buildAnyRequiredMsg("TaskId"),
    }),
    attachmentId: ModelSchema.SCHEMA_ID.required().messages({
      "string.base": ValidationMsgUtils.buildStringBaseMsg("AttachmentId"),
      "string.empty": ValidationMsgUtils.buildStringEmptyMsg("AttachmentId"),
      "any.required": ValidationMsgUtils.buildAnyRequiredMsg("AttachmentId"),
    }),
  })
    .unknown(false)
    .required()
    .messages({
      "object.base": ValidationMsgUtils.buildObjectBaseMsg(),
      "object.unknown": ValidationMsgUtils.buildUnknownFieldsMsg(),
      "any.required": ValidationMsgUtils.buildAnyRequiredMsg("The request"),
    });

  public checkValid(userId: string, taskId: string, attachmentId: string): ValidationErrorItem[] {
    const { error } = DeleteAttachmentValidatorImpl.SCHEMA.validate(
      { userId, taskId, attachmentId },
      {
        abortEarly: false,
      },
    );

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
