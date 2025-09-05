import jwt from "jsonwebtoken";

export const generateToken = (user) => {
  try {
    const payload = {
      id: user.id,
      role: user.role,
      name: user.person?.name,
      lastname: user.person?.lastname,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    return token;
  } catch (error) {
    throw new Error("Error al generar el token");
  }
};

export const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    throw new Error("Token inválido o expirado");
  }
};
