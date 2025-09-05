import { verifyToken } from "../helpers/jwt.helper.js";

export const isAuthenticated = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ message: "No autenticado" });

    try {
        req.user = verifyToken(token);
        next();
    } catch (err) {
        return res.status(401).json({ message: err.message });
    }
};
