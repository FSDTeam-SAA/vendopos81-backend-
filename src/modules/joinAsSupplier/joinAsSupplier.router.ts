import { Router } from "express";
import auth from "../../middleware/auth";
import validateRequest from "../../middleware/validateRequest";
import { USER_ROLE } from "../user/user.constant";
import joinAsSupplierController from "./joinAsSupplier.controller";
import joinAsSupplierValidationSchema from "./joinAsSupplier.validation";

const router = Router();

router.post(
  "/join",
  auth(USER_ROLE.CUSTOMER),
  validateRequest(joinAsSupplierValidationSchema.joinAsSupplierValidation),
  joinAsSupplierController.joinAsSupplier
);

const joinAsSupplierRouter = router;
export default joinAsSupplierRouter;
