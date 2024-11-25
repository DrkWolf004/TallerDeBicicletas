"use strict";
import { Router } from "express";
import { isAdmin, isBodeguero } from "../middlewares/authorization.middleware.js";
import {
    deleteProduct,
    getProduct,
    getProducts,
    postProduct,
    updateProduct
} from "../controllers/Producto.controller.js";

const router = Router();

router
  .use(isAdmin)
  .use(isBodeguero);

router
  .get("/", getProducts)
  .get("/detail/", getProduct)
  .patch("/detail/", updateProduct)
  .delete("/detail/", deleteProduct)
  .post("/post/", postProduct);

export default router;