import User from "../models/user.model.js";
import Profile from "../models/profile.model.js";
import Article from "../models/article.model.js";

export const getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll({
            where: { deleted_at: null },
            include: [Profile]
        });
        return res.json(users);
    } catch (error) {
        return res.status(500).json({ 
            error: error.message 
        });
    }
};

export const getUserByID = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findOne({
            where: { id, deleted_at: null },
            include: [Profile, Article]
        });
        return res.json(user);
    } catch (error) {
        return res.status(500).json({ 
            error: error.message 
        });
    }
};

export const updateUser = async (req, res) => {
    try {
        await User.update(req.body, { 
            where: { id: req.params.id, deleted_at: null } 
        });
        return res.status(200).json({ 
            message: "Usuario actualizado con éxito" 
        });
    } catch (error) {
        return res.status(500).json({ 
            error: error.message 
        });
    }
};

export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ 
        message: "Usuario no encontrado" 
    });

    await user.destroy();
    return res.status(200).json({ 
        message: "Usuario eliminado lógicamente" 
    });
  } catch (error) {
    return res.status(500).json({ 
        error: error.message 
    });
  }
};

