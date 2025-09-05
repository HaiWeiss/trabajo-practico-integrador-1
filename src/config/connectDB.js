import sequelize from "./database.js";

const connectDB = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        console.log("Se conecto a la base de datos");
    } catch(e) {
        console.error(e);
    }
}

export default connectDB;