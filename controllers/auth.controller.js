import { User } from "../models/User.js";


export const login = async (req,res)=>{
    res.json({ok: true})
};


export const register = async (req, res) => {
    try {
        const { email, password } = req.body;

        let user = await User.findOne({ email });
        if (user) throw new Error("Email ya registrado");

        user = new User({ email, password });
        await user.save();

        // Generar token
        // const { token, expiresIn } = generateToken(user.id);
        // generateRefreshToken(user.id, res);
        return res.json({ ok: true });
    } catch (error) {
        console.log(error);
        return res.status(403).json({ error: error.message });
    }
};