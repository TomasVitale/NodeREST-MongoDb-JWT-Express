import { validationResult } from "express-validator";
import { body } from "express-validator";

export const validationResultExpress = (req,res, next) => {

    const errors = validationResult(req)
    
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

    next();
};

export const bodyLoginValidator = [
    body("email","Formato incorrecto")
    .trim()
    .isEmail()
    .normalizeEmail(),
    body("password","Formato de Contraseña incorrecto")
    .trim()
    .isLength({min: 6})   
    , validationResultExpress
];

export const bodyRegisterValidator = [
    body("email", "Ingrese un email válido")
        .trim()
        .isEmail()
        .normalizeEmail(),
    body("password", "Contraseña mínimo 6 carácteres")
        .trim()
        .isLength({ min: 6 })
        .custom((value, { req }) => {
            if (value !== req.body.repassword) {
                throw new Error("No coinciden las contraseñas");
            }
            return value;
        }),
        validationResultExpress
]
