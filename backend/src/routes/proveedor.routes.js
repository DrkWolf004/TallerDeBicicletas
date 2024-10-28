"use strict";
import { Router } from "express";
import { authenticateJwt } from "../middlewares/authentication.middleware.js";
import { isAdmin } from "../middlewares/authorization.middleware.js";
import {
    createproveedor,
    deleteProveedor,
    getProveedor,
    getProveedores,
    updateProveedor,
} from "../controllers/proveedor.controller.js";

const router = Router();

/*router 
    .use(authenticateJwt)
    .use(isAdmin);
*/
router
    .get("/detail/", getProveedor)
    .get("/", getProveedores)
    .post("/post/", createproveedor)
    .patch("/detail/", updateProveedor)
    .delete("/detail/", deleteProveedor);

export default router;