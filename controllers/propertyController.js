const router = require("express").Router();
const { UserModel } = require('../models');
const { UniqueConstraintError } = require('sequelize/lib/errors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
// const validateSession = require('../middleware/validate-session');
// const validateRole = require('../middleware/validate-role');

module.exports = router;
