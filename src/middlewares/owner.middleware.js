import Article from "../models/article.model.js";

export const ownerMiddleware = async (req, res, next) => {
  try {
    const user = req.user;
    const { id } = req.params;

    const article = await Article.findByPk(id);

    if (!article) {
      return res.status(404).json({ 
        msg: "Artículo no encontrado" 
    });
    }

    if (user.role !== "admin" && article.user_id !== user.id) {
      return res.status(403).json({ 
        msg: "No tiene permisos sobre este recurso" 
    });
    }

    req.article = article;
    next();
  } catch (error) {
    return res.status(500).json({ 
        msg: "Error en ownerMiddleware", error: error.message 
    });
  }
};
