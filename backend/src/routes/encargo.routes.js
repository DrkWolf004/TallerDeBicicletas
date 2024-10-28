"use strict";
import { Router } from "express";
import { authenticateJwt } from "../middlewares/authentication.middleware.js";
import { isAdmin } from "../middlewares/authorization.middleware.js";
import {
    createEncargo,
    deleteEncargo,
    getEncargo,
    getEncargos,
    updateEncargo,
} from "../controllers/encargo.controller.js";

const router = Router();

router
    .use(authenticateJwt)
    .use(isAdmin);

router
    .post("/", createEncargo)
    .delete("/:id", deleteEncargo)
    .get("/:id", getEncargo) 
    .get("/", getEncargos)
    .patch("/:id", updateEncargo);

export default router;