import ArticleTag from "../models/articleTag.model.js";

export const createArticleTag = async (req, res) => {
    try {
        const articleTag = await ArticleTag.create(req.body);

        return res.status(201).json({
            message: "Etiqueta agregada al artículo",
            articleTag,
        });

    } catch (error) {
        return res.status(500).json({
            error: error.message
        });
    }
};

export const deleteArticleTag = async (req, res) => {
    try {
        const { articleTagId } = req.params;
        const articleTag = await ArticleTag.findByPk(articleTagId);

        if (!articleTag) return res.status(404).json({
            message: "Relación no encontrada"
        });

        await articleTag.destroy();
        return res.status(200).json({
            message: "Etiqueta se quito del articulo"
        });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};
