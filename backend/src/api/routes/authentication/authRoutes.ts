import express from "express";
import { login, logout, refresh } from "../../controller/index";

export const authRouter = express.Router();

authRouter.post("/login", login);
authRouter.get("/refresh", refresh);
authRouter.post("/logout", logout);
