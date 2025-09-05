import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Tag = sequelize.define(
    "tags",
    {
        name: { 
            type: DataTypes.STRING(30), 
            unique: true 
        }
    }
);

export default Tag;