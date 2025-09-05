import Article from "../models/article.model.js";
import User from "../models/user.model.js";
import Tag from "../models/tag.model.js";

export const createArticle = async (req, res) => {
    try {
        const article = await Article.create(req.body);
        return res.status(201).json({ 
            message: "Artículo creado", article 
        });
    } catch (error) {
        return res.status(500).json({ 
            error: error.message 
        });
    }
};

export const getAllArticles = async (req, res) => {
    try {
        const articles = await Article.findAll({
            where: { deleted_at: null, published: true },
            include: [User, Tag]
        });
        return res.json(articles);
    } catch (error) {
        return res.status(500).json({ 
            error: error.message 
        });
    }
};

export const getArticleByID = async (req, res) => {
    try {
        const { id } = req.params;
        const article = await Article.findOne({
            where: { id, deleted_at: null, published: true },
            include: [User, Tag]
        });
        return res.json(article);
    } catch (error) {
        return res.status(500).json({ 
            error: error.message 
        });
    }
};

export const getMyArticles = async (req, res) => {
  try {
    const userId = req.user.id;
    const articles = await Article.findAll({ where: { user_id: userId } });
    return res.json(articles);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getMyArticleByID = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    const article = await Article.findOne({
      where: {
        id,
        user_id: userId
      }
    });

    if (!article) {
      return res.status(404).json({ msg: "Artículo no encontrado o no pertenece al usuario" });
    }

    return res.json(article);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const updateArticle = async (req, res) => {
    try {
        const [updated] = await Article.update(req.body, {
            where: { id: req.params.id, deleted_at: null }
        });
        return res.status(200).json({ 
            message: "Articulo actualizado con exito" 
        });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

export const deleteArticle = async (req, res) => {
  try {
    const article = await Article.findByPk(req.params.id);
    if (!article) return res.status(404).json({ 
        message: "Artículo no encontrado" 
    });

    await article.destroy();
    return res.status(200).json({ 
        message: "Artículo eliminado lógicamente" 
    });

  } catch (error) {

    return res.status(500).json({ error: error.message });

  }
};

