import express from "express";
import {login, register, userInfo, refreshToken, logOut} from "../controllers/auth.controller.js";
import { validationResultExpress } from "../middlewares/validationResultExpress.js";
import { body } from "express-validator";
import { requiredToken } from "../middlewares/requiredToken.js";
import { generateRefreshToken } from "../utils/tokenManager.js";

const router = express.Router();

router.post(
    "/register",
    [
        body("email", "Ingrese un email válido")
            .trim()
            .isEmail()
            .normalizeEmail(),
        body("password", "Contraseña mínimo 6 carácteres")
            .trim()
            .isLength({ min: 6 })
    ],
    validationResultExpress,
    register
);

router.post("/login",
[
    body("email","Formato incorrecto")
    .trim()
    .isEmail()
    .normalizeEmail(),
    body("password","Formato de Contraseña incorrecto")
    .trim()
    .isLength({min: 6})   
] ,
validationResultExpress,
login
);

//Ruta protegida de ejemplo.
router.get("/userInfo", requiredToken, userInfo);

//Ruta con el refreshToken
router.get("/refreshToken", refreshToken);

// Cierre de sesion.
router.get("/logOut", logOut);


export default router;