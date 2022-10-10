import { User } from "../models/User.js";
import jwt from "jsonwebtoken";
import { generateRefreshToken, generateToken } from "../utils/tokenManager.js";


export const login = async (req,res)=>{
    try {
        const { email, password } = req.body;

        let user = await User.findOne({ email });

        if(!user) return res.status(403).json({ error: "No existe el usuario." });

        const respuestaPassword = await user.comparePassword(password);

        if(!respuestaPassword) return res.status(403).json({ error: "Credenciales incorrectas" });

        //Generar Token con JWT
        //queda almacenado en memoria.
        const {token, expiresIn} = generateToken(user.id);

        // genera refresh token en una cookie.
        generateRefreshToken(user.id, res);

        return res.json({token, expiresIn});

    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Error de servidor." });
    }
    
};


export const register = async (req, res) => {
    try {
        const { email, password } = req.body;

        let user = await User.findOne({ email });
        if (user) throw new Error("Email ya registrado");

        user = new User({ email, password });
        await user.save();

        const { token, expiresIn } = generateToken(user.id);
        generateRefreshToken(user.id, res);

        return res.status(201).json({ token, expiresIn });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ error: error.message });
    }
    
};

export const userInfo =  async (req,res) => {
 
    try {
        let user = await User.findById(req.uid).lean();
        res.json({email: user.email, uid: user.id});

    } catch (error) {
        console.log(error);
    }
};

export const refreshToken = (req,res) => {
  
    try {
        const refreshTokenCookie = req.cookies.refreshToken;
        if(!token) throw new Error("No Existe el token");

        const {uid} = jwt.verify(refreshTokenCookie, process.env.JWT_REFRESH);

        const {token, expiresIn} = generateToken(uid);
        return res.json({token, expiresIn});
        
    } 
    catch (error) {
        console.log(error)
        return res.status(401);
    }
}

export const logOut = (req,res) => {
    res.clearCookie("refreshToken")
    res.json({ok: true})
}