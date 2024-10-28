"use strict";
import { Router } from "express";
import { authenticateJwt } from "../middlewares/authentication.middleware.js";
import { isAdmin } from "../middlewares/authorization.middleware.js";
import {
    createMecanico,
    deleteMecanico,
    getMecanico,
    getMecanicos,
    updateMecanico,
} from "../controllers/mecanico.controller.js";

const router = Router();

router
    .use(authenticateJwt)
    .use(isAdmin);

router
    .get("/", getMecanicos)
    .get("/detail/", getMecanico)
    .post("/", createMecanico)
    .patch("/detail/", updateMecanico)
    .delete("/detail/", deleteMecanico);

export default router;