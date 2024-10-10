import { Request, Response, NextFunction } from "express";

interface CustomError extends Error {
  status?: number;
  details?: any;
}

const errorHandler = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(`[Error] ${err.name}: ${err.message}`);

  const statusCode = err.status || 500;
  const response = {
    error: {
      message: err.message || "Internal Server Error",
      ...(process.env.NODE_ENV === "development" && { details: err.details }),
    },
  };

  res.status(statusCode).json(response);
};

export default errorHandler;
