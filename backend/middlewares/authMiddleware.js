export const isAuthenticated = (req, res, next) => {
  if (req.headers.authorization) {
    next();
  } else {
    res.status(401).json("Usuário não autenticado.");
  }
};
