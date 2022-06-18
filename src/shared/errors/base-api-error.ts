import { HttpException } from '@nestjs/common';

export class BaseApiError extends HttpException {
  public details: string | Record<string, any>;

  constructor(
    message: string,
    status: number,
    details?: string | Record<string, any>,
  ) {
    // Calling parent constructor of base Error class.
    super(message, status);
    this.name = BaseApiError.name;
    this.details = details;
  }
}
