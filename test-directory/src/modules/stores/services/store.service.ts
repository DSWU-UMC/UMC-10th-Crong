import { responseFromReviews, ReviewListResponse } from "../dtos/store.dto.js";
import { getAllStoreReviews } from "../repositories/store.repository.js";

export const listStoreReviews = async (storeId: number): Promise<ReviewListResponse> => {
  const reviews = await getAllStoreReviews(storeId);
  return responseFromReviews(reviews);
};
