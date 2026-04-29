import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { listStoreReviews } from "../services/store.service.js";

export const handleListStoreReviews = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const storeId = parseInt(req.params.storeId as string, 10);

    const reviews = await listStoreReviews(storeId);

    res.status(StatusCodes.OK).json(reviews);
  } catch (err) {
    next(err);
  }
};
