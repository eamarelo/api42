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
    this.app.post('/auth/login', (req, res) => {
      try {
        userSchema.findOne({ email: req.body.email }, function (err, userSchema) {
          if (err){
           console.log(err) /*return res.status(500).send('Error on the server.')*/;
         }
         if (!userSchema) return res.status(404).send('No user found.');
         var passwordIsValid = bcrypt.compareSync(req.body.password, userSchema.password);
         if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });
         var token = jwt.sign({ id: userSchema._id }, config.secret, {
          expiresIn: 864000 // expires in 240 hours
        });
         res.status(200).send({ auth: true, token: token });
       });

      } catch (e) {
        console.log(e)
        console.error(`[ERROR] user/create -> ${e}`)
        res.status(400).json({
          'code': 400,
          'message': 'Bad request'
        })
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
