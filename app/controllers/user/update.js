// Core
const mock = require('../../models/get-user.js')
const userSchema = require('../../models/userSchema.js');

module.exports = class Update {
  constructor (app) {
    this.app = app

    this.run()
  }

  /**
   * Middleware
   */
   middleware () {
    this.app.put('/user/update/:id', (req, res) => {
      try {
        userSchema();
        if (!req.params || !req.params.id.length) {
          res.status(404).json({
            code: 404,
            message: 'Not Found'
          })
        }
        userSchema.findOne({_id: req.params.id}, function (err, user) { 
            if(err) return err;
        });
        userSchema.update({_id: req.params.id}, req.body, function (err, user){
          res.status(200).json(user || {})
        });
      } catch (e) {
        console.log(e)
        console.error(`[ERROR] user/update/:id -> ${e}`)
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
