const { v4: uuidv4 } = require("uuid");
const User = require("../models/user.models.js");
const { setUser } = require("../services/auth.js");

async function userSignup(req, res) {
  const { name, email, password } = req.body;
  await User.create({
    name,
    email,
    password,
  });
  return res.redirect("/");
}

async function userLogin(req, res) {
  const { email, password } = req.body;
  const user = await User.findOne({ email, password });

  if (!user) {
    return res.render("login", {
      error: "Invalid Username or Password",
    });
  }

  // for Stateful Authentication
  // const sessionId = uuidv4();
  // setUser(sessionId, user);
  // res.cookie("uid", sessionId);
  // return res.redirect("/");

  // for Stateless Authentication
  const token = setUser(user);
  res.cookie("uid", token);
  return res.redirect("/");
}

// Authentication through headers
// async function userLogin(req, res) {
//   const { email, password } = req.body;
//   const user = await User.findOne({ email, password });

//   if (!user) {
//     return res.render("login", {
//       error: "Invalid Username or Password",
//     });
//   }

//   const token = setUser(user);
//   return res.json({ token });
// }

module.exports = {
  userSignup,
  userLogin,
};
