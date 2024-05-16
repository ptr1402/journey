import express from "express";
import {
  createProduct,
  deleteProduct,
  getProductById,
  getProducts,
  updateProduct,
} from "../../controller";

export const productRouter = express.Router();

productRouter.route("/").get(getProducts).post(createProduct);

productRouter
  .route("/:productId")
  .get(getProductById)
  .patch(updateProduct)
  .delete(deleteProduct);
