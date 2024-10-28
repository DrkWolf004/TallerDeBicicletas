"use strict";
import { Router } from "express";
import userRoutes from "./user.routes.js";
import authRoutes from "./auth.routes.js";
import mecanicoRoutes from "./mecanico.routes.js";
import proveedorRoutes from "./proveedor.routes.js";

const router = Router();

router
    .use("/auth", authRoutes)
    .use("/user", userRoutes)
    .use("/mecanico", mecanicoRoutes)
    .use("/proveedor", proveedorRoutes);

export default router;