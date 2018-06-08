// Core
const mock = require('../../models/get-user.js')
const userSchema = require('../../models/userSchema.js');

module.exports = class Destroy {
  constructor (app) {
    this.app = app

    this.run()
  }

  /**
   * Middleware
   */
  middleware () {
    this.app.delete('/user/destroy/:id', (req, res) => {
      try {
        userSchema();
        if (!req.params || !req.params.id.length) {
          res.status(404).json({
            code: 404,
            message: 'Not Found'
          })
        }
        userSchema.deleteOne({_id: req.params.id}, function (err, user) { 
          console.log(err)        
          res.status(200).json(user || {})
        });

      } catch (e) {
        console.error(`[ERROR] user/destroy/:id -> ${e}`)
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
