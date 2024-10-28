"use strict";
import { Router } from "express";
import { isAdmin } from "../middlewares/authorization.middleware.js";
import {
    createAviso,
    deleteAviso,
    getAviso,
    getAvisos,
    updateAviso,
} from "../controllers/aviso.controller.js";

const router = Router();


router
  .post("/", createAviso)
  .get("/", getAvisos)
  .get("/detail/", getAviso)
  .patch("/detail/", updateAviso)
  .delete("/detail/", deleteAviso)

export default router;