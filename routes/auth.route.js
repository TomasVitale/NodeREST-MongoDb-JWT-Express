import express from "express";
import {login, register, victorieta} from "../controllers/auth.controller.js";
import { validationResultExpress } from "../middlewares/validationResultExpress.js";
import { body } from "express-validator";

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


export default router;