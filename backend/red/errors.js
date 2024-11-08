export class clientError extends Error {
  constructor(message, status = 400) {
    super(message);
    this.statusCode = status;
  }
}
