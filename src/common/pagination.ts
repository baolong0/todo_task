import Joi from "@hapi/joi";
import BadRequestError from "Errors/http/badRequestError";

export default class Pagination {
  private static SCHEMA = Joi.object({
    limit: Joi.number().integer().min(1).max(100).required(),
    offset: Joi.number().integer().min(0).max(2_000_000).required(),
  }).required();

  constructor(public readonly limit: number, public readonly offset: number) {
    Pagination.validate(this);
  }

  private static validate(obj: Pagination) {
    const { error } = Pagination.SCHEMA.validate(obj);

    if (error) {
      throw new BadRequestError(`Invalid provided pagination info: ${error.message}`);
    }
  }
}
