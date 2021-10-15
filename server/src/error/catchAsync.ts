import { Request, Response, NextFunction } from "express";

export const catchAsync =
  (
    asyncFunction: (
      req: Request,
      res: Response,
      next?: NextFunction
    ) => any
  ) =>
  (req: Request, res: Response, next: NextFunction) => {
    asyncFunction(req, res, next).catch((error: any) => {
      next(error);
    });
  };
