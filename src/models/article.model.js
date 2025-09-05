import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import User from "./user.model.js";

const Article = sequelize.define(
    "articles",
    {
        title: {
            type: DataTypes.STRING(200),
            allowNull: false
        },
        content: {
            type: DataTypes.STRING(),
            allowNull: false
        },
        excerpt: {
            type: DataTypes.STRING(500),
            allowNull: true
        },
        status: {
            type: DataTypes.ENUM('published', 'archived'), 
            defaultValue: 'published'
        },
        user_id: {
            type: DataTypes.INTEGER
        }
    }
);

Article.belongsTo(User, { 
    foreignKey: "user_id", 
    as: "author",
    onDelete: "CASCADE"
});

export default Article;