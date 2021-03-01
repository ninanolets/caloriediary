import HttpError from "./HttpError.js";

export default function handleError(res, error) {
    if (error instanceof HttpError) {
        res.status(error.statusCode).send(error.message);
    } else {
        res.status(500).send(error.message);
    }
}
