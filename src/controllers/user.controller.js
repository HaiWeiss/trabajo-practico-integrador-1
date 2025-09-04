import { body, matchedData } from "express-validator";
import User from "../models/user.model.js";

export const createUser = async (req, res) => {
    try {
        const { username, email, password, role } = req.body;
        
        console.log({ username, email, password, role });

        const userCreated = await User.create({ username, email, password, role });
        return res.status(201).json({
            message: "Usuario creado",
            user: userCreated,
        })
    } catch (error) {
        return res.status(500).json({
            error: error.message,
        })
    }
}

export const getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        return res.json(users);

    } catch (error) {

        return res.status(500).json({ error: error.message });

    }
};

export const getUserByID = async (req, res) => {
    try {
        const { id } = req.params.id;

        const user = await User.findByPk(id);

        return res.json(user);

    } catch (error) {

        return res.status(500).json({ error: error.message });

    }
}

export const updateUser = async (req, res) => {
    try {
        const data = matchedData(req, { locations: body });

        if (Object.keys(data) === 0) {
            return res.status(400).json({
                message: "Debes enviar almenos un campo para validar",
            })
        }

        const [updated] = await User.update(data, {
            where: { id: req.params.id },
        })

        return res.status(200).json({
            message: "Usuario actualizado con exito"
        })
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params.id;

        const user = User.findByPk(id);

        // Fue un placer trabajar contigo gir, autodestuyete
        await user.destroy(); // Alfiiiinn *explota*

        return res.status(200).json({
            message: "El usuario fue eliminado correctamente",
        })
    } catch (error) {
        return res.status(500).json({
            error: error.message,
        })
    }
}