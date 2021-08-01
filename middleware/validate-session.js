require('dotenv').config()
const jwt = require('jsonwebtoken');
const { UserModel } = require('../models');

//! Refactored Module Code Removing "Bearer"
const validateSession = (req, res, next) => {
    const token = req.headers.authorization;
    if (req.method === "OPTIONS") {
      return next();
    } else if (!token) {
      return res.status(403).send({ auth: false, message: "No token provided" });
    } else {
      jwt.verify(token, process.env.JWT_SECRET, (err, decodeToken) => {
        if (!err && decodeToken) {
          UserModel.findOne({
            where: {
              id: decodeToken.id,
            },
          })
            .then((user) => {
              if (!user) throw err;
              req.user = user;
              return next();
            })
            .catch((err) => next(err));
        } else {
          req.errors = err;
          return res.status(500).send("Not Authorized");
        }
      });
    }
  };

module.exports = validateSession;