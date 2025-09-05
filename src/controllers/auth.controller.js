import User from "../models/user.model.js";
import Profile from "../models/profile.model.js";
import { hashPassword, comparePassword } from "../helpers/bcrypt.helper.js";
import { generateToken, verifyToken } from "../helpers/jwt.helper.js";

export const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const exists = await User.findOne({ where: { email } });
        if (exists) return res.status(400).json({
            message: "El email ya está registrado"
        });

        const hashed = await hashPassword(password);

        const user = await User.create({
            username, email, password: hashed
        });
        await Profile.create({
            user_id: user.id
        });

        return res.status(201).json({
            message: "Usuario registrado con éxito", user
        });
    } catch (error) {
        return res.status(500).json({
            error: error.message
        });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({
            where: { email }
        });
        if (!user) return res.status(400).json({
            message: "Credenciales inválidas"
        });

        const match = await comparePassword(password, user.password);
        if (!match) return res.status(400).json({
            message: "Credenciales inválidas"
        });

        const token = generateToken(user);

        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 1000 * 60 * 60, // 1h
        });

        return res.json({
            message: "Login exitoso"
        });
    } catch (error) {
        return res.status(500).json({
            error: error.message
        });
    }
};

export const getProfile = async (req, res) => {
    try {
        const token = req.cookies.token;
        if (!token) return res.status(401).json({
            message: "No autenticado"
        });

        const decoded = verifyToken(token);

        const profile = await Profile.findOne({
            where: { user_id: decoded.id }
        });
        if (!profile) return res.status(404).json({
            message: "Perfil no encontrado"
        });

        return res.json(profile);
    } catch (error) {
        return res.status(401).json({
            error: error.message
        });
    }
};

export const updateProfile = async (req, res) => {
    try {
        const token = req.cookies.token;
        if (!token) return res.status(401).json({
            message: "No autenticado"
        });

        const decoded = verifyToken(token);

        await Profile.update(req.body, {
            where: { user_id: decoded.id }
        });

        return res.json({
            message: "Perfil actualizado con éxito"
        });
    } catch (error) {
        return res.status(401).json({
            error: error.message
        });
    }
};

export const logout = (req, res) => {
    res.clearCookie("token", {
        httpOnly: true
    });
    return res.json({
        message: "Logout exitoso"
    });
};
