import { Link } from "../models/Link.js";
import { nanoid } from "nanoid"


export const getLinks = async(req,res) => {
    try {

        const links = await Link.find({uid: req.uid});

        return res.json({links})

    } catch (error) {

            console.log(error);

            return res.status(500).json("Error del Servidor.");
    }
};

export const createLink = async(req,res) => {
    try {
        const {longLink} = req.body;

        const link = new Link({longLink, nanoLink: nanoid(6), uid: req.uid});
        const newLink = await link.save();

        console.log({newLink});


    } catch (error) {
        console.log(error);
    }
};

export const getLinkById = async(req,res) => {
    try {
        const link = await Link.findById({uid: req.uid})

        return res.status(201).json({link})

    } catch (error) {
        console.log(error);
        return res.status(500).json("Error del servidor.")
    }
}

export const deleteLink = async(req,res) => {
    try {
        await Link.findByIdAndDelete({uid: req.uid})

        return res.status(200).json("Link eliminado correctamente.")
    } catch (error) {
        console.log(error);
        return res.status(500).json("Error del servidor.")
    }
}

export const editLink = async(req,res) =>  {
    try {
        
        
    } catch (error) {
        console.log(error)
    }
}