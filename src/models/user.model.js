import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const User = sequelize.define(
    "users", {
        username: {
            type: DataTypes.STRING(20),
            unique: true,
        },
        email: {
            type: DataTypes.STRING(100),
            unique: true,
        },
        password: {
            type: DataTypes.STRING(225)
        },
        role: {
            type: DataTypes.ENUM('user', 'admin'),
            defaultValue: 'user'
        }
    },
    {
        paranoid: true
    }
);

export default User;