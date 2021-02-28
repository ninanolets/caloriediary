export default class HttpError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.name = this.constructor.name; // this.constructor.name gives back the class name
        this.statusCode = statusCode;
    }
}
