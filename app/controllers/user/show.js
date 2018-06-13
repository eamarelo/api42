// Core
const mock = require('../../models/get-user.js')
const userSchema = require('../../models/userSchema.js');
const db = require('../../../db.js')

module.exports = class Show {
  constructor (app) {
    this.app = app

    this.run()
  }

  /**
   * Middleware
   */
   middleware () {
    this.app.get('/user/show/:id', (req, res) => {
      try {
        userSchema();
        userSchema.findOne({_id: req.params.id}, function (err, user) { 
          if (err) {
            res.status(404).json({
              code: 404,
              message: 'User not found'
            })
          }
          else{
            res.status(200).json(user)
          }
        });
      } catch (e) {
        console.error(`[ERROR] user/show/:id -> ${e}`)
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
