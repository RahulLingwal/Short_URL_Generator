const { getUser } = require("../services/auth.js");

function requireAuth(req, res, next) {
  const userUid = req.cookies?.uid;
  if (!useUid) return res.redirect("/user/login");

  const user = getUser(userUid);
  if (!user) return res.redirect("/user/login");

  req.user = user;
  next();
}

function checkAuth(req, res, next) {
  const userUid = req.cookies?.uid;

  const user = getUser(userUid);

  req.user = user;
  next();
}

module.exports = {
  requireAuth,
  checkAuth,
};
