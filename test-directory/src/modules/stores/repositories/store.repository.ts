import { prisma } from "../../../db.config.js";

export const getAllStoreReviews = async (storeId: number) => {
  const reviews = await prisma.userStoreReview.findMany({
    select: {
      id: true,
      content: true,
      storeId: true,
      userId: true,
      store: true,
      user: true,
    },
    where: {
      storeId,
    },
    orderBy: {
      id: "asc",
    },
  });

  return reviews;
};
