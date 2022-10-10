import jwt from "jsonwebtoken";

export const generateToken = (uid) => {
    const expiresIn = 60 * 15;
    const token = jwt.sign({ uid }, process.env.JWT_SECRET, { expiresIn });
    return { token, expiresIn };
};

export const generateRefreshToken = (uid, res) => {
    const expiresIn = 1000 * 60 * 60 * 24 * 30;
    const refreshToken = jwt.sign({ uid }, process.env.JWT_REFRESH, { expiresIn })
    res.cookie("refreshToken", refreshToken, {
        // httpOnly prohibe que el token sea accesible por medio del navegador.    
            httpOnly: true,
        //secure habilita tambien por https, por eso mientras este en modo desarrollo da falso y cuando pase a prod. se habilita.
            secure: !(process.env.MODO === "developer"),
            expires: new Date (Date.now() + expiresIn * 1000)
        });
}