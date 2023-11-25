
export class CustomError extends Error {
  constructor(
    public readonly message: string,
    public readonly statusCode: number = 400,
  ) {
    super(message);
  }

  static badRequest(message: string) {
    return new CustomError(message, 400);
  }

  static unauthorized(message: string) {
    return new CustomError(message, 401);
  }

  static forbidden(message: string) {
    return new CustomError(message, 403);
  }

  static notFound(message: string) {
    return new CustomError(message, 404);
  }
  
  static conflict(message: string) {
    return new CustomError(message, 409);
  }

  static internalServer(message: string = 'Internal server error') {
    return new CustomError(message, 500);
  }
}

