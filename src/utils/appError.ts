export default class AppError extends Error {
  public readonly message: string
  public readonly statusCode: number

  constructor(message: string, code: number = 500) {
    super(message)
    this.message = message
    this.statusCode = code
  }

  public static badRequest(message: string) {
    throw new AppError(message, 400)
  }

  public static unauthorized(message: string) {
    throw new AppError(message, 401)
  }

  public static forbidden(message: string) {
    throw new AppError(message, 403)
  }

  public static notFound(message: string) {
    throw new AppError(message, 404)
  }

  public static internal (message: string) {
    throw new AppError(message, 500)
  }
}