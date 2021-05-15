var jwt = require("jsonwebtoken");
var config = require("../config/config");

function verifyJWT(req, res, next) {
  const authHeader = req.headers.authorization;
  let token = null;
  if (authHeader) {
    token = authHeader.split(" ")[1];
  }
  if (!token)
    return res.status(401).send({ auth: false, message: "No token provided." });

  jwt.verify(token, config.SECRET, function (err, decoded) {
    if (err)
      return res
        .status(500)
        .send({ auth: false, message: "Failed to authenticate token." });

    // if it's ok, save user id on req to use later
    //console.log(decoded);
    req.userId = decoded.id;
    next();
  });
}

module.exports.verifyJWT = verifyJWT;
