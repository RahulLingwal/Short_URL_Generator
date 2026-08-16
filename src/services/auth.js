// Stateful Authentication
// const sessionIdToMapUser = new Map();

// function setUser(id, user) {
//   sessionIdToMapUser.set(id, user);
// }

// function getUser(id) {
//   return sessionIdToMapUser.get(id);
// }

// StateLess Authentication with JWT
const jwt = require("jsonwebtoken");
const secret = "@rahul200";

function setUser(user) {
  return jwt.sign(
    //payload
    {
      _id: user._id,
      email: user.email,
    },
    secret, //secret
  );
}

function getUser(token) {
  if (!token) return null;
  try {
    return jwt.verify(token, secret);
  } catch (error) {
    console.log("Error occur : ", error);
    return null;
  }
}

module.exports = {
  setUser,
  getUser,
};
