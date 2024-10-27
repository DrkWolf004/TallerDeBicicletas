"use strict";
import { Router } from "express";
import { authenticateJwt } from "../middlewares/authentication.middleware.js";
import { isAdmin } from "../middlewares/authorization.middleware.js";
import {
    createProveedor,
    deleteProveedor,
    getProveedor,
    getProveedores,
    updateProveedor,
} from "../controllers/proveedor.controller.js";

const router = Router();

router 
    .use(authenticateJwt)
    .use(isAdmin);

router
    .get("/", getProveedores)
    .get("/detail/", getProveedor)
    .post("/", createProveedor)
    .patch("/detail/", updateProveedor)
    .delete("/detail/", deleteProveedor);

export default router;