"user strict";
import { Router } from "express";
import { authenticateJwt } from "../middlewares/authentication.middleware.js";
import { isAdmin } from "../middlewares/authorization.middleware.js";


import {
    createEncargado,
    deleteEncargado,
    getEncargado,
    getEncargados,
    updateEncargado,
}from "../controllers/encargado.controller.js";

const router = Router();

router
    .use(authenticateJwt)
    .use(isAdmin);

router
    .get("/", getEncargados)
    .get("/detail/", getEncargado)
    .post("/", createEncargado)
    .patch("/detail/", updateEncargado)
    .delete("/detail/", deleteEncargado);

export default router;