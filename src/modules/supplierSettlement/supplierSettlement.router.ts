import { Router } from "express";
import auth from "../../middleware/auth";
import { USER_ROLE } from "../user/user.constant";
import supplierSettlementController from "./supplierSettlement.controller";

const router = Router();

router.get("/all", supplierSettlementController.getAllSupplierSettlements);
router.get(
  "/supplier",
  auth(USER_ROLE.SUPPLIER),
  supplierSettlementController.getSupplierSettlement,
);

const supplierSettlementRouter = router;
export default supplierSettlementRouter;
