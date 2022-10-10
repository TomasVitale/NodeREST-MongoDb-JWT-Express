import jwt from "jsonwebtoken";

export const requiredToken = (req,res,next) =>{
    try {
          let token = req.headers.authorization;
          if(!token) throw new Error (" No existe el token en headers ( Bearer Token ).");


        token = token.split(" ")[1];
          const {uid} = jwt.verify(token, process.env.JWT_SECRET);
          req.uid = uid;

          next();
    } catch (error) {
        console.log(error);
        res.status(401).json({error: error.message});
    }
}