export const isAuthenticated = (req, res, next) => {
  if (req.headers.authorization && req.headers.authorization !== "null") {
    next();
  } else {
    res.status(401).json("Usuário não autenticado.");
  }
};
