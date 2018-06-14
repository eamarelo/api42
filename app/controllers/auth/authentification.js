// AuthController.js
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('./secret');
const VerifyToken = require('./verification');

const db = require('../../../db.js')
const validator = require('node-validator')
const userSchema = require('../../models/userSchema.js');

module.exports = class Authentification {
  constructor (app) {
    this.app = app

    this.run()
  }

  /**
   * Middleware
   */
   middleware () {
    this.app.post('/auth/register', (req, res) => {
      try {
        var hashedPassword = bcrypt.hashSync(req.body.password, 8);

        var user = new userSchema({   
         name : req.body.name,
         email : req.body.email,
         password : hashedPassword
       });

        user.save(function (err, data) {
          if (err) return handleError(err);
          // saved!
          else{
            res.status(200).json({ auth: true, token: token, id : data._id} || {})
          }
        });
        var token = jwt.sign({ id: user._id }, config.secret, {
              expiresIn: 86400 // expires in 24 hours
        });
      } catch (e) {
        console.log(e)
        console.error(`[ERROR] user/create -> ${e}`)
        res.status(400).json({"code":400,"message":"Bad request"})
      }
    })
  }

  /**
   * Run
   */
   run () {
    this.middleware()
  }
}
