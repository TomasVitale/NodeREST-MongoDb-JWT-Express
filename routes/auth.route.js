import express from "express";
import { login, register } from "../controllers/auth.controller.js";
import { body } from "express-validator";
import { validationResultExpress } from "../middlewares/validationResultExpress.js";


const router = express.Router()

router.post('/login',[
    body('email','Formato incorrecto')
    .trim()
    .isEmail()
    .normalizeEmail(),

    body('password','Formato de Contraseña incorrecto')
    .trim()
    .isLength({min: 6})   
], 
validationResultExpress,
login
);

router.post('/register',[
    body('email','Formato incorrecto')
    .trim()
    .isEmail()
    .normalizeEmail(),
    
    body('password','Formato de Contraseña incorrecto')
    .trim()
    .isLength({min: 6})   
] ,
validationResultExpress,
register
);


export default router;