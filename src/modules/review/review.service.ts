import AppError from "../../errors/AppError";
import Order from "../order/order.model";
import Product from "../product/product.model";
import { User } from "../user/user.model";
import { IReview } from "./review.interface";
import Review from "./review.model";

const createReview = async (payload: IReview, email: string) => {
  const user = await User.findOne({ email });
  if (!user) throw new AppError("Your account does not exist", 404);

  const order = await Order.findOne({
    userId: user._id,
    _id: payload.orderId,
  });

  if (!order) {
    throw new AppError("Order not found", 404);
  }

  if (order!.orderStatus !== "delivered") {
    throw new AppError("You can only review delivered orders", 400);
  }

  const existing = await Review.findOne({
    productId: payload.productId,
    orderId: payload.orderId,
    userId: user._id,
  });

  if (existing)
    throw new AppError("You have already reviewed this product", 400);

  const result = await Review.create({
    ...payload,
    userId: user._id,
  });

  return result;
};

const getAllReviews = async () => {
  const result = await Review.find();
  return result;
};

const updateReviewStatus = async (id: string, status: string) => {
  const review = await Review.findById(id);
  if (!review) throw new AppError("Review not found", 404);

  // Update review status
  const result = await Review.findByIdAndUpdate(id, { status }, { new: true });

  // Only update rating if review is approved
  if (status === "approved") {
    const product = await Product.findById(review.productId);

    if (product) {
      const newTotalRatings = product.totalRatings + 1;
      const newAverageRating =
        (product.averageRating * product.totalRatings + review.rating) /
        newTotalRatings;

      await Product.findByIdAndUpdate(
        review.productId,
        {
          totalRatings: newTotalRatings,
          averageRating: newAverageRating,
        },
        { new: true }
      );
    }
  }

  return result;
};

const reviewService = {
  createReview,
  getAllReviews,
  updateReviewStatus,
};

export default reviewService;
