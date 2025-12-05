import express, { Request, Response,   } from "express";
import { pool } from "../../config/db";
import { useControllers } from "./user.controler";
import auth from "../../middlewere/auth";

const router = express.Router();

router.post("/", useControllers.createUser);

router.get("/", auth('admin','user'), useControllers.getUser)

router.get("/:id", auth('admin', 'user'), useControllers.getSingleUser)

router.put("/:id", useControllers.UpdateUser)

router.delete("/:id", useControllers.deleteUser)

export const userRoutes = router;