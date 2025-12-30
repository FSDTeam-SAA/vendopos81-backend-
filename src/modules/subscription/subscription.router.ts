import { Router } from "express";
import subscriptionController from "./subscription.controller";
import auth from "../../middleware/auth";
import { USER_ROLE } from "../user/user.constant";


const router = Router();

router.post("/create", subscriptionController.createSubscription);


// Protected: Only Admin can access these
router.get(
    "/get-all-subscription",
    auth(USER_ROLE.ADMIN),
    subscriptionController.getAllSubscription
);

router.post(
    "/send-bulk",
    auth(USER_ROLE.ADMIN),
    subscriptionController.sendBulkEmail
);

router.post(
    "/send-one/:id",
    auth(USER_ROLE.ADMIN),
    subscriptionController.sendIndividualEmail
);

router.delete(
    "/delete-subscription/:id",
    auth(USER_ROLE.ADMIN),
    subscriptionController.deleteSubcription
);

const subscriptionRouter = router;
export default subscriptionRouter;

