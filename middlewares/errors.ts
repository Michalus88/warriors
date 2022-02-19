import {
  Request,
  Response,
  ErrorRequestHandler,
  NextFunction,
  RequestHandler,
} from "express";

export class ValidateError extends Error {}
export class NoFoundError extends Error {}

export function errorHandler(
  err: ErrorRequestHandler,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error(err);
  const message =
    err instanceof ValidateError ? err.message : "Proszę spróbować później...";
  const code = err instanceof ValidateError ? 400 : 500;

  if (err instanceof NoFoundError) {
    res.status(404);
    res.render("error", { message: err.message });
    return;
  }

  res.status(code);
  res.render("error", { message });
}

type Cb = (req: Request, res: Response, next: NextFunction) => Promise<void>;

export function catchAsync(fn: Cb): RequestHandler {
  return (req, res, next) => {
    fn(req, res, next).catch((err: Error) => next(err));
  };
}
