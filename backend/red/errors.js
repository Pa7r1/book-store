export class ErrorDelCliente extends Error {
  constructor(message, status = 400) {
    super(message);
    this.statusCode = status;
  }
}
