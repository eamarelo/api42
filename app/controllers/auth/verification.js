const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('./secret');
const VerifyToken = require('./verification');

const db = require('../../../db.js')
const validator = require('node-validator')
const userSchema = require('../../models/userSchema.js');

// AuthController.js
module.exports = class Verification {
  constructor (app) {
    this.app = app

    this.run()
  }

  /**
   * Middleware
   */
   middleware () {
    var token = req.headers['x-access-token'];
    if (!token)
      return res.status(403).send({ auth: false, message: 'No token provided.' });
    jwt.verify(token, config.secret, function(err, decoded) {
      if (err)
        return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
    // if everything good, save to request for use in other routes
    req.userId = decoded.id;
    next();
  });
  }

  /**
   * Run
   */
   run () {
    this.middleware()
  }
}
