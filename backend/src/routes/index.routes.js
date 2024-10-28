"use strict";
import { Router } from "express";
import userRoutes from "./user.routes.js";
import authRoutes from "./auth.routes.js";

import avisoRoutes from "./aviso.routes.js";

const router = Router();

router
    .use("/auth", authRoutes)
    .use("/user", userRoutes)

    .use("/avisos", avisoRoutes)



export default router;