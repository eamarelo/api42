// Core
const db = require('../../../db.js')
const mock = require('../../models/get-user.js')
const validator = require('node-validator')
const userSchema = require('../../models/userSchema.js');

const check = validator.isObject()
.withRequired('name', validator.isString())
.withOptional('age', validator.isNumber())
.withOptional('gender', validator.isString({ regex: /^male|femal$/ }))


module.exports = class Create {
  constructor (app) {
    this.app = app

    this.run()
  }

  /**
   * Middleware
   */
   middleware () {
    this.app.post('/user/create', validator.express(check), (req, res) => {
      try {
        var user = new userSchema({ name: req.body.name, age: req.body.age, gender: req.body.gender });
        user.save(function (err) {
          if (err) return handleError(err);
          // saved!
          });

        res.status(200).json(user || {})
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
