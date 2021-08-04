module.exports = function admin(req, res, next) {
  //401 unauthorized
  //403 forbidden
  if (!req.user.isAdmin) return res.status(403).send("access denied");
  next();
};
