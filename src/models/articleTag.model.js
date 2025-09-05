import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import Article from "./article.model.js";
import Tag from "./tag.model.js";

const ArticleTag = sequelize.define(
  "article_tags",
  {
    article_id: { 
        type: DataTypes.INTEGER 
    },
    tag_id: { 
        type: DataTypes.INTEGER 
    }
  }
);

Article.belongsToMany(Tag, {
    through: ArticleTag,
    as: "tags",
    foreingKey: "article_id",
    otherKey: "key_id",
    onDelete: "CASCADE"
})

Tag.belongsToMany(Article, {
    through: ArticleTag,
    foreingKey: "tag_id",
    otherKey: "article_id"
})

export default ArticleTag;