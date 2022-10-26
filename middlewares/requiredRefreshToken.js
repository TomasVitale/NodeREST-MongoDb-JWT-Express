import jwt from "jsonwebtoken";

export const requiredRefreshToken = (req,res,next) => {
    try {
        const refreshTokenCookie = req.cookies.refreshToken;
        if(!refreshTokenCookie) throw new Error("No Existe el token");

        const {uid} = jwt.verify(refreshTokenCookie, process.env.JWT_REFRESH);

        req.uid = uid;

        next(); 
    } catch (error) {
        res.status(401).json();
    }
}