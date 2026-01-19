import { Router } from "express";
import auth from "../../middleware/auth";
import { USER_ROLE } from "../user/user.constant";
import reviewController from "./review.controller";

const router = Router();

router.post(
  "/add-review",
  auth(USER_ROLE.CUSTOMER),
  reviewController.createReview,
);

router.get("/all", reviewController.getAllReviews);
router.get("/:id", auth(USER_ROLE.ADMIN), reviewController.getSingleReview);

router.get("/review-by-product/:id", reviewController.getReviewByProduct);

router.put(
  "/update/:id",
  auth(USER_ROLE.ADMIN),
  reviewController.updateReviewStatus,
);

router.delete(
  "/delete/:id",
  auth(USER_ROLE.ADMIN),
  reviewController.deleteReview,
);

const reviewRouter = router;
export default reviewRouter;
