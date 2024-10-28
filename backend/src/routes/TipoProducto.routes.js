"use strict";
import { Router } from "express";
import { isAdmin } from "../middlewares/authorization.middleware.js";
import {
    deleteTipo,
    getTipo,
    getTipos,
    postTipo,
    updateTipo
} from "../controllers/TipoProducto.controller.js";

const router = Router();



router
  .get("/", getTipos)
  .get("/detail/", getTipo)
  .patch("/detail/", updateTipo)
  .delete("/detail/", deleteTipo)
  .post("/post/", postTipo);

export default router;