import { Request, Response, ErrorRequestHandler, NextFunction } from "express";

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
