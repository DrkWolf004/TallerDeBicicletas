"use strict";
import { Router } from "express";
import userRoutes from "./user.routes.js";
import authRoutes from "./auth.routes.js";

import mecanicoRoutes from "./mecanico.routes.js";
import proveedorRoutes from "./proveedor.routes.js";
import avisoRoutes from "./aviso.routes.js";
import TipoProductoRoutes from "./TipoProducto.routes.js";


const router = Router();

router
    .use("/auth", authRoutes)
    .use("/user", userRoutes)
    .use("/avisos", avisoRoutes)
    .use("/mecanico", mecanicoRoutes)
    .use("/proveedor", proveedorRoutes)

    .use("/TipoProducto",TipoProductoRoutes);



export default router;