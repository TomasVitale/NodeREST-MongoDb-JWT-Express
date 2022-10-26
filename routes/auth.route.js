import express from "express";
import {login, register, userInfo, refreshToken, logOut} from "../controllers/auth.controller.js";
import { requiredToken } from "../middlewares/requiredToken.js";
import { requiredRefreshToken } from "../middlewares/requiredRefreshToken.js";
import { bodyLoginValidator, bodyRegisterValidator } from "../middlewares/validatorManager.js";

const router = express.Router();

router.post("/register", bodyRegisterValidator, register);

router.post("/login", bodyLoginValidator, login);

//Ruta protegida de ejemplo.
router.get("/userInfo", requiredToken, userInfo);

//Ruta con el refreshToken
router.get("/refreshToken", requiredRefreshToken ,refreshToken);

// Cierre de sesion.
router.get("/logOut", logOut);


export default router;