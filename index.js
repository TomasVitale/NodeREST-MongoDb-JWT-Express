import express from "express";
import authRouter from "./routes/auth.route.js";
import cookieParser from "cookie-parser";
import "dotenv/config";
import "./database/connectdb.js";



const app = express();
app.use(express.json());
app.use(cookieParser());
app.use('/api/v1', authRouter);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`El servidor esta corriendo en el puerto ${PORT}`));