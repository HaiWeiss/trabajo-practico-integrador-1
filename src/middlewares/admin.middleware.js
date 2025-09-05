export const adminMiddleware = (req, res, next) => {
  const user = req.user;

  if (!user) {
    return res.status(401).json({ msg: "No autenticado" });
  }

  if (user.role !== "admin") {
    return res.status(403).json({ msg: "Acceso denegado: requiere rol admin" });
  }

  next();
};
