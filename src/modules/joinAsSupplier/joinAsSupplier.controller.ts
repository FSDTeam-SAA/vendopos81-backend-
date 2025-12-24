import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import joinAsSupplierService from "./joinAsSupplier.service";

const joinAsSupplier = catchAsync(async (req, res) => {
  const files = req.files as Express.Multer.File[];
  const { email } = req.user;
  const result = await joinAsSupplierService.joinAsSupplier(email, req.body, files);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Successfully joined as supplier",
    data: result,
  });
});

const joinAsSupplierController = {
  joinAsSupplier,
};

export default joinAsSupplierController;
