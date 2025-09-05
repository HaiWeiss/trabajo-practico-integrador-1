import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import User from "./user.model.js";

const Profile = sequelize.define(
    "profiles",
    {
        user_id: {
            type: DataTypes.INTEGER,
            unique: true
        },
        first_name: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        last_name: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        biography: {
            type: DataTypes.STRING,
            allowNull: true
        },
        avatar_url: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        birth_date: {
            type: DataTypes.DATE,
            allowNull: true

        }
    }
);

User.belongsTo(Profile, {
    foreignKey: "user_id",
    as: "profile"
})
Profile.belongsTo(User, { 
    foreignKey: "user_id", 
    as: "author" 
});

export default Profile;