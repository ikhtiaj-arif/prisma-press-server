import httpStatus from "http-status";
import { Request, Response, NextFunction } from "express";

export const globalErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
    success: false,
    statusCode: httpStatus.INTERNAL_SERVER_ERROR,
    message: err.message,
    error: err,
  });
}