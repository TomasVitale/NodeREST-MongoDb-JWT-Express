import { Router } from "express";
import { requiredToken } from "../middlewares/requiredToken";
import { getLinks, createLink } from "../controllers/link.controller.js";
const router = Router();

//GET     /api/v1/links        trae todos los links
//GET     /api/v1/links/:id    trae 1 link
//POST    /api/v1/links        crea un link
//PATCH   /api/v1/links/:id    actualiza el link.  
//DELETE  /api/v1/links/:id    remueve el link

router.get("/", requiredToken, getLinks);
router.get("/:id", requiredToken, getLinkById);
router.post("/", requiredToken, createLink);
router.put(":id", editLink);
router.delete("/:id", requiredToken, deleteLink);



export default router;