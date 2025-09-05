import Tag from "../models/tag.model.js";
import Article from "../models/article.model.js";

export const createTag = async (req, res) => {
    try {
        const tag = await Tag.create(req.body);
        return res.status(201).json({ message: "Etiqueta creada", tag });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

export const getAllTags = async (req, res) => {
    try {
        const tags = await Tag.findAll();
        return res.json(tags);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

export const getTagByID = async (req, res) => {
    try {
        const { id } = req.params;
        const tag = await Tag.findByPk(id, {
            include: [Article]
        });
        return res.json(tag);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

export const updateTag = async (req, res) => {
    try {
        await Tag.update(req.body, { where: { id: req.params.id } });
        return res.status(200).json({ message: "Etiqueta actualizada con éxito" });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

export const deleteTag = async (req, res) => {
    try {
        const tag = await Tag.findByPk(req.params.id);
        if (!tag) return res.status(404).json({ message: "Etiqueta no encontrada" });

        await tag.destroy();
        return res.status(200).json({ message: "Etiqueta eliminada correctamente" });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};
