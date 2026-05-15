export interface StoreInfo {
  id: number;
  name: string;
}

export interface UserInfo {
  id: number;
  name: string;
  email: string;
}

export interface ReviewItem {
  id: number;
  content: string;
  storeId: number;
  userId: number;
  store: StoreInfo;
  user: UserInfo;
}

export interface PaginationResponse {
  cursor: number | null;
}

export interface ReviewListResponse {
  data: ReviewItem[];
  pagination: PaginationResponse;
}
export const responseFromReviews = (reviews: ReviewItem[]): ReviewListResponse => {
  const lastReview = reviews[reviews.length - 1];

  return {
    data: reviews,
    pagination: {
      cursor: lastReview ? lastReview.id : null,
    },
  };
};
