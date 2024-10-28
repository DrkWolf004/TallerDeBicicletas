"use strict";
import { Router } from "express";
import userRoutes from "./user.routes.js";
import authRoutes from "./auth.routes.js";

import mecanicoRoutes from "./mecanico.routes.js";
import proveedorRoutes from "./proveedor.routes.js";

import TipoProductoRoutes from "./TipoProducto.routes.js";
import avisoRoutes from "./aviso.routes.js";

const router = Router();

router
    .use("/auth", authRoutes)
    .use("/user", userRoutes)

    .use("/mecanico", mecanicoRoutes)
    .use("/proveedor", proveedorRoutes)
    .use("/avisos", avisoRoutes)

    .use("/TipoProducto", TipoProductoRoutes);


export default router;