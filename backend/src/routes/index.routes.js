"use strict";
import { Router } from "express";
import userRoutes from "./user.routes.js";
import authRoutes from "./auth.routes.js";
import TipoProductoRoutes from "./TipoProducto.routes.js";
import ProductRoutes from "./Producto.routes.js";

const router = Router();

router
    .use("/auth", authRoutes)
    .use("/user", userRoutes)
    .use("/TipoProducto",TipoProductoRoutes)
    .use("/Producto",ProductRoutes);

export default router;