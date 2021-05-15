var express = require("express");
var jwt = require("jsonwebtoken");
const User = require("../core/User/user");
var router = express.Router();
var config = require("../config/config");

router.get("/", (req, res, next) => {
  if (req.cookies.JWT) {
    var token = jwt.verify(
      req.cookies.JWT,
      config.SECRET,
      function (err, decoded) {
        if (err) {
          return res.status(401).send({ status: "Invalid Token" });
        } else {
          return res.status(200).send({
            decoded,
          });
        }
      }
    );
  }
  return res.status(401).send({ status: "No Token" });
});

//authentication
router.post("/login", async (req, res, next) => {
  const queryResult = await User.getUserAuth(req.body.user, req.body.password);
  const user = queryResult[0];
  console.log(queryResult[0]);
  if (user) {
    var token = jwt.sign(
      { id: user.id, name: user.name, role: user.role, email: user.email },
      config.SECRET,
      {
        ...(user.role_id !== 1 && { expiresIn: 6000 }), // expires in 1 hour if is not ADMIN
      }
    );

    res.cookie("JWT", token, {
      maxAge: 86400000,
      httpOnly: true,
    });

    res.status(200).send({ accessToken: token, auth: true });
  } else {
    res.status(401).send("Wrong credentials");
  }
});

module.exports = router;
